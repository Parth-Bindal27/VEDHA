import numpy as np
from typing import Dict, List
from app.schemas import Transaction

class FeatureExtractor:
    def __init__(self, window_size: float = 100.0):
        self.window_size = window_size
        self.history: List[Transaction] = []
        
    def update(self, tx: Transaction):
        self.history.append(tx)

    def extract_features(self, current_time: float, nodes: List[str]) -> Dict[str, Dict[str, float]]:
        start_time = current_time - self.window_size
        recent_txs = [tx for tx in self.history if tx.timestamp >= start_time]
        
        features = {node: self._base_features() for node in nodes}
        
        for tx in recent_txs:
            if tx.sender in features:
                f = features[tx.sender]
                f["tx_velocity"] += 1
                f["total_sent"] += tx.amount
                f["amounts"].append(tx.amount)
                f["out_degree_set"].add(tx.receiver)
                
            if tx.receiver in features:
                f = features[tx.receiver]
                f["tx_velocity"] += 1
                f["total_received"] += tx.amount
                f["amounts"].append(tx.amount)
                f["in_degree_set"].add(tx.sender)

        for node, f in features.items():
            amts = f.pop("amounts")
            f["mean_amount"] = float(np.mean(amts)) if amts else 0.0
            f["std_amount"] = float(np.std(amts)) if len(amts) > 1 else 0.0
            f["in_degree"] = len(f.pop("in_degree_set"))
            f["out_degree"] = len(f.pop("out_degree_set"))
            f["burstiness"] = f["tx_velocity"] / self.window_size if self.window_size > 0 else 0
            
            # Simple counterparty novelty
            f["counterparty_novelty"] = (f["in_degree"] + f["out_degree"]) / max(1, f["tx_velocity"])

        # Subgraph for Centrality and Motifs
        import networkx as nx
        G_recent = nx.DiGraph()
        for tx in recent_txs:
            if not G_recent.has_edge(tx.sender, tx.receiver):
                G_recent.add_edge(tx.sender, tx.receiver, weight=0)
            G_recent[tx.sender][tx.receiver]["weight"] += 1
            
        if G_recent.number_of_nodes() > 0:
            # Betweenness Centrality
            try:
                centrality = nx.betweenness_centrality(G_recent)
            except:
                centrality = {n: 0.0 for n in G_recent.nodes()}
                
            for node in nodes:
                features[node]["centrality"] = centrality.get(node, 0.0)
                
            # Temporal Motif Signals
            for node in nodes:
                motif_score = 0.0
                if node in G_recent:
                    # Fan-In Motif
                    if G_recent.in_degree(node) >= 2:
                        motif_score += 0.3
                    # Fan-Out Motif
                    if G_recent.out_degree(node) >= 2:
                        motif_score += 0.3
                    # 2-hop chain passing through node
                    if G_recent.in_degree(node) > 0 and G_recent.out_degree(node) > 0:
                        motif_score += 0.4
                features[node]["temporal_motif_score"] = min(1.0, motif_score)
        else:
            for node in nodes:
                features[node]["centrality"] = 0.0
                features[node]["temporal_motif_score"] = 0.0

        return features

    def _base_features(self):
        return {
            "tx_velocity": 0,
            "total_sent": 0.0,
            "total_received": 0.0,
            "amounts": [],
            "in_degree_set": set(),
            "out_degree_set": set()
        }
