from typing import List
from app.schemas import Transaction, CoordinationCluster
from collections import defaultdict
import numpy as np

class CoordinationDetector:
    def __init__(self, window_size: float = 50.0):
        self.window_size = window_size
        self.weights = {
            "temporal_synchrony": 0.3,
            "amount_similarity": 0.3,
            "shared_intermediary": 0.4
        }
        
    def detect(self, current_time: float, history: List[Transaction]) -> List[CoordinationCluster]:
        start_time = current_time - self.window_size
        recent = [tx for tx in history if tx.timestamp >= start_time]
        
        if len(recent) < 3:
            return []
            
        receivers = defaultdict(list)
        for tx in recent:
            receivers[tx.receiver].append(tx)
            
        clusters = []
        cluster_idx = 1
        
        for hub, txs in receivers.items():
            if len(txs) >= 3:
                senders = list(set([tx.sender for tx in txs]))
                if len(senders) >= 2:
                    amounts = [tx.amount for tx in txs]
                    std = np.std(amounts)
                    mean = np.mean(amounts)
                    amount_sim = max(0, 1.0 - (std / (mean + 1e-5)))
                    
                    times = [tx.timestamp for tx in txs]
                    time_span = max(times) - min(times)
                    sync = 1.0 if time_span < 1.0 else min(1.0, 10.0 / time_span)
                    
                    score = (
                        self.weights["shared_intermediary"] * 1.0 +
                        self.weights["amount_similarity"] * amount_sim + 
                        self.weights["temporal_synchrony"] * sync
                    )
                    
                    if score > 0.6:
                        evidence = [
                            f"{len(senders)} accounts shared intermediary {hub}",
                            f"Amount similarity: {amount_sim:.2f}",
                            f"Temporal synchrony: {sync:.2f}"
                        ]
                        clusters.append(CoordinationCluster(
                            cluster_id=f"CLUSTER_{cluster_idx}",
                            members=senders,
                            coordination_score=round(score * 100, 2),
                            shared_intermediaries=[hub],
                            time_window=self.window_size,
                            evidence=evidence
                        ))
                        cluster_idx += 1
                        
        return clusters
