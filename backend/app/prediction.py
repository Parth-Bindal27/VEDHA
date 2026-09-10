import networkx as nx
from typing import List, Dict, Any
from app.schemas import PredictedEdge, Transaction
import numpy as np

class NextEdgePredictor:
    def __init__(self):
        self.weights = {
            "temporal_proximity": 0.25,
            "graph_proximity": 0.25,
            "shared_intermediary": 0.20,
            "flow_direction": 0.15,
            "motif_continuation": 0.15
        }

    def predict(self, current_time: float, graph: nx.DiGraph, recent_txs: List[Transaction], suspicious_nodes: List[str]) -> List[PredictedEdge]:
        if not suspicious_nodes or len(recent_txs) == 0:
            return []
            
        candidates = {} 
        
        recent_nodes = set()
        amount_history = {}
        for tx in recent_txs:
            recent_nodes.add(tx.sender)
            recent_nodes.add(tx.receiver)
            amount_history.setdefault(tx.sender, []).append(tx.amount)
            amount_history.setdefault(tx.receiver, []).append(tx.amount)
            
        for n1 in suspicious_nodes:
            if n1 not in graph: continue
            
            for inter in list(graph.successors(n1)):
                for n2 in list(graph.successors(inter)):
                    if n1 != n2 and not graph.has_edge(n1, n2):
                        candidates[(n1, n2)] = candidates.get((n1, n2), {"shared_inter": True})
                        
            for n2 in recent_nodes:
                if n1 != n2 and not graph.has_edge(n1, n2):
                    if (n1, n2) in candidates: continue 
                    candidates[(n1, n2)] = {"recent": True}
                    
        scored_edges = []
        for (u, v), meta in candidates.items():
            temporal_score = 1.0 if meta.get("recent") else 0.0
            
            graph_score = 0.0
            try:
                if nx.has_path(graph, u, v):
                    path_len = nx.shortest_path_length(graph, u, v)
                    graph_score = 1.0 / path_len if path_len > 0 else 0.0
            except nx.NetworkXNoPath:
                pass
                
            shared_inter_score = 1.0 if meta.get("shared_inter") else 0.0
            
            u_out = graph.out_degree(u)
            v_in = graph.in_degree(v)
            flow_dir_score = 1.0 if (u_out > 0 and v_in > 0) else 0.5
            
            u_in = graph.in_degree(u)
            motif_score = 1.0 if (u_in > 0 and u_out > 0) else 0.0
            
            score = (
                self.weights["temporal_proximity"] * temporal_score +
                self.weights["graph_proximity"] * graph_score +
                self.weights["shared_intermediary"] * shared_inter_score +
                self.weights["flow_direction"] * flow_dir_score +
                self.weights["motif_continuation"] * motif_score
            ) * 100.0
            
            if score > 30.0:
                evidence = []
                if temporal_score > 0: evidence.append("Recent interaction between source and network")
                if shared_inter_score > 0: evidence.append("Shared intermediary relationship")
                if flow_dir_score > 0: evidence.append("Consistent flow direction")
                if motif_score > 0: evidence.append("Structural motif continuation")
                
                amts = amount_history.get(u, []) + amount_history.get(v, [])
                if amts:
                    mean_a = float(np.mean(amts))
                    std_a = float(np.std(amts))
                    min_a = max(10.0, mean_a - std_a)
                    max_a = mean_a + std_a
                else:
                    min_a, max_a = 500.0, 1500.0
                    
                scored_edges.append(PredictedEdge(
                    source=u,
                    target=v,
                    prediction_score=round(score, 2),
                    estimated_amount_range={"min": round(min_a, 2), "max": round(max_a, 2)},
                    evidence=evidence
                ))
                
        scored_edges.sort(key=lambda x: x.prediction_score, reverse=True)
        return scored_edges[:5]
