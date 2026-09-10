import os
import json
import logging
from typing import Optional, Dict, Any, List
from app.schemas import InvestigatorReport, CrimeGenome, EchoReconstruction, NetworkSurgery, PredictedEdge

logger = logging.getLogger(__name__)

class AIInvestigator:
    def __init__(self):
        self.api_key = os.getenv("OPENAI_API_KEY")
        self.client = None
        if self.api_key:
            try:
                from openai import OpenAI
                self.client = OpenAI(api_key=self.api_key)
            except ImportError:
                logger.warning("OPENAI_API_KEY is set but 'openai' package is not installed. Falling back to deterministic.")
                self.client = None
            
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
            
        deterministic_report = InvestigatorReport(
            summary=summary,
            key_findings=key_findings,
            network_patterns=genome.dominant_patterns if genome else [],
            critical_nodes=critical_node_dicts,
            recommended_action=recommended_action,
            human_review_required=True,
            sar_draft=sar_draft
        )
        
        # Optional LLM Enhancement
        if self.client and priority > 60:
            try:
                system_prompt = (
                    "You are an investigator-assistance system.\n"
                    "You do not determine guilt.\n"
                    "You do not determine criminal intent.\n"
                    "You do not make legal conclusions.\n"
                    "You do not invent evidence, transactions, amounts, or account relationships.\n"
                    "You do not treat anomaly scores as probabilities of crime.\n"
                    "You do not treat structural influence as causality.\n"
                    "You only summarize the structured evidence supplied to you.\n"
                    "Clearly distinguish observed evidence from inference and predictions.\n"
                    "The final decision belongs to a human investigator.\n"
                    "Output strictly in JSON format matching the schema."
                )
                
                evidence_context = {
                    "priority": priority,
                    "coordination_evidence": coordination_evidence,
                    "genome_patterns": genome.dominant_patterns if genome else [],
                    "surgery_candidates": [c.node_id for c in surgery.candidates] if surgery else [],
                    "predictions": [{"source": p.source, "target": p.target, "score": p.prediction_score} for p in predictions] if predictions else []
                }
                
                response = self.client.chat.completions.create(
                    model="gpt-4o-mini",
                    messages=[
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": f"Generate an investigator brief and SAR draft in JSON based on this evidence: {json.dumps(evidence_context)}"}
                    ],
                    response_format={"type": "json_object"},
                    timeout=5.0
                )
                
                content = response.choices[0].message.content
                data = json.loads(content)
                
                return InvestigatorReport(
                    summary=data.get("executive_summary", data.get("summary", summary)),
                    key_findings=data.get("key_findings", key_findings),
                    network_patterns=data.get("network_patterns", data.get("crime_genome_summary", genome.dominant_patterns if genome else [])),
                    critical_nodes=critical_node_dicts,
                    recommended_action=recommended_action,
                    human_review_required=True,
                    sar_draft=data.get("sar_draft", sar_draft)
                )
            except Exception as e:
                logger.error(f"LLM generation failed, using fallback: {e}")
                return deterministic_report
                
        return deterministic_report
