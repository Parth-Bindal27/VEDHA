from sklearn.ensemble import IsolationForest
import numpy as np
from typing import Dict, List, Any

class BehavioralAnomalyDetector:
    def __init__(self):
        self.model = IsolationForest(contamination=0.05, random_state=42)
        self.fitted = False

    def score_nodes(self, features: Dict[str, Dict[str, float]]) -> List[Dict[str, Any]]:
        if not features:
            return []
            
        nodes = list(features.keys())
        feature_keys = [
            "tx_velocity", "total_sent", "total_received", 
            "mean_amount", "std_amount", "in_degree", 
            "out_degree", "burstiness", "counterparty_novelty"
        ]
        
        X = []
        for node in nodes:
            X.append([features[node].get(k, 0.0) for k in feature_keys])
            
        X = np.array(X)
        
        # Fit on current window (simplified online learning)
        if len(X) > 10:
            self.model.fit(X)
            self.fitted = True
            
        if not self.fitted:
            return [{"node_id": n, "anomaly_score": 0.0, "is_anomalous": False, "evidence": []} for n in nodes]
            
        scores = self.model.decision_function(X)
        min_s, max_s = np.min(scores), np.max(scores)
        range_s = max_s - min_s if max_s > min_s else 1.0
        
        results = []
        for i, node in enumerate(nodes):
            risk = 100.0 * (max_s - scores[i]) / range_s
            is_anom = risk > 80.0
            evidence = [f"Isolation Forest identified distinct behavioral deviation."] if is_anom else []
            results.append({
                "node_id": node,
                "anomaly_score": round(risk, 2),
                "is_anomalous": is_anom,
                "evidence": evidence
            })
            
        return results
