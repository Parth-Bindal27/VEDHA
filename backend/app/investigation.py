from app.schemas import InvestigationCase, CrimeGenome, EchoReconstruction, NetworkSurgery, CoordinationCluster, PredictedEdge
from app.investigator import AIInvestigator
from typing import List, Dict, Any, Optional

class InvestigationOrchestrator:
    def __init__(self):
        self.ai_investigator = AIInvestigator()

    def generate_case(self, 
                      top_nodes: List[Dict[str, Any]], 
                      clusters: List[CoordinationCluster], 
                      genome: Optional[CrimeGenome], 
                      echo: Optional[EchoReconstruction], 
                      surgery: Optional[NetworkSurgery],
                      predictions: List[PredictedEdge]) -> InvestigationCase:
                      
        # Phase 5: Multi-Signal Priority Formula
        # (0.3 * Anomaly) + (0.3 * Coordination) + (0.2 * Genome) + (0.1 * Surgery) + (0.1 * Prediction)
        max_anomaly = max([n.get("risk_score", 0) for n in top_nodes]) if top_nodes else 0.0
        max_coord = max([c.coordination_score for c in clusters]) if clusters else 0.0
        genome_score = genome.overall_score if genome else 0.0
        surgery_score = surgery.candidates[0].disruption_impact if (surgery and surgery.candidates) else 0.0
        prediction_score = predictions[0].prediction_score if predictions else 0.0
        
        priority = (0.3 * max_anomaly) + (0.3 * max_coord) + (0.2 * genome_score) + (0.1 * surgery_score) + (0.1 * prediction_score)
        priority = min(100.0, priority)
            
        coordination_evidence = []
        for c in clusters:
            coordination_evidence.extend(c.evidence)
            
        # Delegate report generation to AI Investigator
        report = self.ai_investigator.generate_report(
            priority=priority,
            genome=genome,
            echo=echo,
            surgery=surgery,
            predictions=predictions,
            coordination_evidence=coordination_evidence
        )
            
        return InvestigationCase(
            case_id="CASE-001",
            title="Emerging Coordinated Network" if priority > 60 else "Routine Monitoring",
            investigation_priority=round(priority, 2),
            top_suspicious_nodes=top_nodes,
            coordination_evidence=coordination_evidence,
            network_phase_change="Emerging" if priority > 60 else "Stable",
            crime_genome=genome,
            echo_reconstruction=echo,
            network_surgery=surgery,
            predicted_next_edges=predictions,
            investigator_report=report,
            recommended_action=report.recommended_action,
            human_review_required=True
        )
