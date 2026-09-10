import pandas as pd
from sklearn.ensemble import IsolationForest
from typing import List, Dict, Any

class AnomalyDetector:
    def __init__(self):
        # We set contamination to 5% to flag the top 5% most unusual nodes
        self.model = IsolationForest(n_estimators=100, contamination=0.05, random_state=42)
        self.is_trained = False
        self.min_samples_to_train = 10 
        
    def detect(self, features: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        if len(features) < self.min_samples_to_train:
            return []
            
        df = pd.DataFrame(features)
        df.set_index("node", inplace=True)
        
        # Re-fitting on the current active nodes to learn baseline dynamically
        self.model.fit(df)
        self.is_trained = True
        
        preds = self.model.predict(df)
        scores = self.model.decision_function(df)
        
        anomalies = []
        for i, node in enumerate(df.index):
            if preds[i] == -1:
                # Convert sklearn score (negative is anomalous) to a 0-100% intuitive score
                normalized_score = max(0.0, min(100.0, -scores[i] * 500 + 50)) 
                anomalies.append({
                    "node": node,
                    "score": round(normalized_score, 2),
                    "features": features[i]
                })
                
        return anomalies
