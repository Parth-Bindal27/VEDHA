import os
import json
from typing import Optional, Dict, Any, List
from app.schemas import InvestigatorReport, CrimeGenome, EchoReconstruction, NetworkSurgery, PredictedEdge

class AIInvestigator:
    def __init__(self):
        self.api_key = os.getenv("OPENAI_API_KEY")
        
    def generate_report(self, 
                        priority: float,
                        genome: Optional[CrimeGenome],
                        echo: Optional[EchoReconstruction],
                        surgery: Optional[NetworkSurgery],
                        predictions: List[PredictedEdge],
                        coordination_evidence: List[str]) -> InvestigatorReport:
                        
        recommended_action = "INVESTIGATION RECOMMENDED" if priority > 75 else "MONITOR"
        
        # Deterministic Fallback Generation
        key_findings = []
        if priority > 60:
            key_findings.append("The network shows elevated behavioural deviation and coordinated activity.")
        if genome and genome.dominant_patterns:
            key_findings.append(f"Key structural signals include: {', '.join(genome.dominant_patterns)}.")
            
        summary = "Network behaviour is stable."
        if priority > 75:
            summary = "Suspicious network behavior detected with highly coordinated topology."
            
        critical_nodes = surgery.candidates[:2] if surgery and surgery.candidates else []
        critical_node_dicts = [{"node_id": c.node_id, "disruption_impact": c.disruption_impact} for c in critical_nodes]
        
        sar_draft = None
        
        if priority > 75:
            sar_draft = (
                "**DRAFT — HUMAN REVIEW REQUIRED**\n\n"
                f"Subject Network Priority: {priority}\n"
                "Summary: Suspicious coordinated transaction behavior detected.\n"
                "Evidence: " + " | ".join(coordination_evidence[:3]) + "\n"
                "This network exhibits structural patterns consistent with layering and rapid expansion."
            )
            
        # Optional LLM Enhancement
        if self.api_key:
            # We would invoke the LLM here using the strict guardrails.
            # Due to the hackathon prototype nature and avoidance of external unmocked calls during tests,
            # we demonstrate where the OpenAI call would execute.
            # If the user has an API key, we format the prompt.
            pass
            
        return InvestigatorReport(
            summary=summary,
            key_findings=key_findings,
            network_patterns=genome.dominant_patterns if genome else [],
            critical_nodes=critical_node_dicts,
            recommended_action=recommended_action,
            human_review_required=True,
            sar_draft=sar_draft
        )
