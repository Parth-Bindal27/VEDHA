from app.schemas import InvestigationCase, CrimeGenome, EchoReconstruction, NetworkSurgery, CoordinationCluster
from typing import List, Dict, Any, Optional

class InvestigationOrchestrator:
    def generate_case(self, 
                      top_nodes: List[Dict[str, Any]], 
                      clusters: List[CoordinationCluster], 
                      genome: Optional[CrimeGenome], 
                      echo: Optional[EchoReconstruction], 
                      surgery: Optional[NetworkSurgery]) -> InvestigationCase:
                      
        priority = 0.0
        if genome:
            priority = max(priority, genome.overall_score)
        if clusters:
            priority = max(priority, max(c.coordination_score for c in clusters))
            
        coordination_evidence = []
        for c in clusters:
            coordination_evidence.extend(c.evidence)
            
        return InvestigationCase(
            investigation_priority=round(priority, 2),
            top_suspicious_nodes=top_nodes,
            coordination_evidence=coordination_evidence,
            network_phase_change="Emerging" if priority > 60 else "Stable",
            crime_genome=genome,
            echo_reconstruction=echo,
            network_surgery=surgery,
            recommended_action="INVESTIGATION RECOMMENDED" if priority > 75 else "MONITOR"
        )
