import networkx as nx
from typing import Optional, List, Dict
from app.schemas import PhaseChangeEvent

class PhaseTransitionDetector:
    def __init__(self):
        self.last_snapshot: Optional[nx.DiGraph] = None
        self.last_time: float = 0
        self.current_state = "stable"
        
        self.weights = {
            "edge_growth": 0.4,
            "degree_change": 0.3,
            "velocity_change": 0.3
        }

    def detect(self, current_time: float, current_graph: nx.DiGraph, recent_tx_count: int) -> Optional[PhaseChangeEvent]:
        if self.last_snapshot is None:
            self.last_snapshot = current_graph.copy()
            self.last_time = current_time
            return None
            
        prev_edges = self.last_snapshot.number_of_edges()
        curr_edges = current_graph.number_of_edges()
        
        edge_growth = (curr_edges - prev_edges) / max(1, prev_edges)
        
        prev_avg_deg = sum(dict(self.last_snapshot.degree()).values()) / max(1, self.last_snapshot.number_of_nodes())
        curr_avg_deg = sum(dict(current_graph.degree()).values()) / max(1, current_graph.number_of_nodes())
        degree_change = abs(curr_avg_deg - prev_avg_deg) / max(1, prev_avg_deg)
        
        velocity_change = recent_tx_count / 10.0 # simple proxy for velocity
        
        change_score = (
            self.weights["edge_growth"] * edge_growth +
            self.weights["degree_change"] * degree_change + 
            self.weights["velocity_change"] * velocity_change
        ) * 100.0
        
        event = None
        if change_score > 25.0: # Adaptive threshold for MVP
            new_state = "emerging_activity" if edge_growth > 0.5 else "network_shift"
            if new_state != self.current_state:
                event = PhaseChangeEvent(
                    timestamp=current_time,
                    previous_state=self.current_state,
                    new_state=new_state,
                    change_score=round(change_score, 2),
                    trigger_signals=[
                        f"Edge growth: {edge_growth:.2f}",
                        f"Degree change: {degree_change:.2f}"
                    ],
                    affected_nodes=list(current_graph.nodes())[:5] # Top 5 for demo
                )
                self.current_state = new_state
                
        self.last_snapshot = current_graph.copy()
        self.last_time = current_time
        return event
