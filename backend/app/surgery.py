import networkx as nx
from typing import List
from app.schemas import NetworkSurgery, SurgeryCandidate

class NetworkSurgeryAnalyzer:
    def analyze(self, graph: nx.DiGraph, cluster_id: str, baseline_score: float, suspicious_nodes: List[str]) -> NetworkSurgery:
        if not suspicious_nodes or graph.number_of_nodes() == 0:
            return NetworkSurgery(cluster_id=cluster_id, baseline_score=baseline_score, candidates=[])
            
        candidates = []
        base_edges = graph.number_of_edges()
        
        for node in suspicious_nodes:
            if not graph.has_node(node):
                continue
                
            g_copy = graph.copy()
            g_copy.remove_node(node)
            
            new_edges = g_copy.number_of_edges()
            edges_removed = base_edges - new_edges
            
            impact = min(100.0, (edges_removed / max(1, base_edges)) * 200.0)
            
            evidence = []
            if edges_removed > 2:
                evidence.append(f"Removal breaks {edges_removed} structural paths.")
                evidence.append("Intermediary concentration falls significantly.")
                
            candidates.append(SurgeryCandidate(
                node_id=node,
                disruption_impact=round(impact, 2),
                edges_removed=edges_removed,
                evidence=evidence
            ))
            
        candidates.sort(key=lambda x: x.disruption_impact, reverse=True)
        
        return NetworkSurgery(
            cluster_id=cluster_id,
            baseline_score=baseline_score,
            candidates=candidates
        )
