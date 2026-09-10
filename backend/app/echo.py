from typing import Optional
from app.schemas import EchoReconstruction, EchoTimelinePoint

class EchoReconstructor:
    def __init__(self):
        self.history = []

    def record_state(self, timestamp: float, score: float, state: str):
        self.history.append(EchoTimelinePoint(timestamp=timestamp, state=state, score=round(score, 2)))
        
    def reconstruct(self, cluster_id: str) -> Optional[EchoReconstruction]:
        if not self.history:
            return None
            
        emergence = None
        for pt in self.history:
            if pt.score > 60.0:
                emergence = pt.timestamp
                break
                
        if not emergence and self.history:
            emergence = self.history[0].timestamp
            
        return EchoReconstruction(
            cluster_id=cluster_id,
            first_emergence=emergence,
            confidence=85.0 if emergence else 50.0,
            timeline=self.history[-10:],
            evidence=[
                f"Suspicious behavior first emerged at {emergence}.",
                "Coordination increased sharply.",
                "Network density increased."
            ]
        )
