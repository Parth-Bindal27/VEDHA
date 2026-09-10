import networkx as nx
from typing import List
from app.schemas import CrimeGenome, CrimeGenomeSignals, Transaction, CoordinationCluster

class CrimeGenomeDetector:
    def detect(self, current_time: float, graph: nx.DiGraph, recent_txs: List[Transaction], clusters: List[CoordinationCluster]) -> CrimeGenome:
        fan_in = 0.0
        fan_out = 0.0
        layering = 0.0
        intermediary_reuse = 0.0
        temporal_synchrony = 0.0
        rapid_expansion = 0.0
        circular_flow = 0.0
        
        evidence = []
        dominant_patterns = []
        
        in_degrees = dict(graph.in_degree())
        out_degrees = dict(graph.out_degree())
        
        max_in = max(in_degrees.values()) if in_degrees else 0
        if max_in >= 3:
            fan_in = min(100.0, max_in * 10.0)
            dominant_patterns.append("FAN_IN")
            evidence.append(f"{max_in} accounts converged on a common intermediary.")
            
        max_out = max(out_degrees.values()) if out_degrees else 0
        if max_out >= 3:
            fan_out = min(100.0, max_out * 10.0)
            dominant_patterns.append("FAN_OUT")
            evidence.append(f"Funds dispersed to {max_out} destinations from a single node.")
            
        reuse_nodes = [n for n, in_d in in_degrees.items() if in_d > 0 and out_degrees.get(n, 0) > 0]
        if reuse_nodes:
            intermediary_reuse = min(100.0, len(reuse_nodes) * 20.0)
            dominant_patterns.append("INTERMEDIARY_REUSE")
            evidence.append(f"Intermediaries ({len(reuse_nodes)}) participated in repeated inbound/outbound flows.")
            
        if len(graph.edges) > 0:
            layering_count = sum(1 for node in reuse_nodes if in_degrees[node] >= 1 and out_degrees[node] >= 1)
            if layering_count > 0:
                layering = min(100.0, layering_count * 25.0)
                dominant_patterns.append("LAYERING")
                evidence.append(f"Funds propagated through intermediary layers.")
                
        if clusters:
            temporal_synchrony = min(100.0, max([c.coordination_score for c in clusters]))
            if temporal_synchrony > 60:
                dominant_patterns.append("TEMPORAL_SYNCHRONY")
                evidence.append(f"Accounts exhibited synchronized transfers.")
                
        rapid_expansion = min(100.0, len(recent_txs) * 2.0)
        
        try:
            cycles = list(nx.simple_cycles(graph))
            if cycles:
                circular_flow = min(100.0, len(cycles) * 50.0)
                dominant_patterns.append("CIRCULAR_FLOW")
                evidence.append(f"Circular flow detected in {len(cycles)} cycles.")
        except:
            pass
            
        overall_score = (fan_in + fan_out + layering + intermediary_reuse + temporal_synchrony + rapid_expansion) / 6.0
        
        return CrimeGenome(
            timestamp=current_time,
            network_id="cluster_01" if clusters else "global",
            overall_score=round(overall_score, 2),
            signals=CrimeGenomeSignals(
                fan_in=round(fan_in, 2),
                fan_out=round(fan_out, 2),
                layering=round(layering, 2),
                intermediary_reuse=round(intermediary_reuse, 2),
                temporal_synchrony=round(temporal_synchrony, 2),
                rapid_expansion=round(rapid_expansion, 2),
                circular_flow=round(circular_flow, 2)
            ),
            dominant_patterns=dominant_patterns,
            evidence=evidence
        )
