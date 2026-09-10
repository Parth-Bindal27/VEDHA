from pydantic import BaseModel
from typing import List, Dict, Any, Optional

class TransactionMetadata(BaseModel):
    # Ground truth - for evaluation only. MUST NOT BE USED FOR DETECTION.
    scenario_id: str
    ground_truth_pattern: str
    ground_truth_is_suspicious: bool
    phase: int

class Transaction(BaseModel):
    transaction_id: str
    timestamp: float
    sender: str
    receiver: str
    amount: float
    currency: str
    transaction_type: str

class TransactionEvent(BaseModel):
    transaction: Transaction
    metadata: TransactionMetadata

class GraphUpdateEvent(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

class PhaseChangeEvent(BaseModel):
    timestamp: float
    previous_state: str
    new_state: str
    change_score: float
    trigger_signals: List[str]
    affected_nodes: List[str]

class CoordinationCluster(BaseModel):
    cluster_id: str
    members: List[str]
    coordination_score: float
    shared_intermediaries: List[str]
    time_window: float
    evidence: List[str]

class CrimeGenomeSignals(BaseModel):
    fan_in: float
    fan_out: float
    layering: float
    intermediary_reuse: float
    temporal_synchrony: float
    rapid_expansion: float
    circular_flow: float

class CrimeGenome(BaseModel):
    timestamp: float
    network_id: str
    overall_score: float
    signals: CrimeGenomeSignals
    dominant_patterns: List[str]
    evidence: List[str]

class EchoTimelinePoint(BaseModel):
    timestamp: float
    state: str
    score: float

class EchoReconstruction(BaseModel):
    cluster_id: str
    first_emergence: float
    confidence: float
    timeline: List[EchoTimelinePoint]
    evidence: List[str]

class SurgeryCandidate(BaseModel):
    node_id: str
    disruption_impact: float
    edges_removed: int
    evidence: List[str]

class NetworkSurgery(BaseModel):
    cluster_id: str
    baseline_score: float
    candidates: List[SurgeryCandidate]

class InvestigationCase(BaseModel):
    investigation_priority: float
    top_suspicious_nodes: List[Dict[str, Any]]
    coordination_evidence: List[str]
    network_phase_change: Optional[str]
    crime_genome: Optional[CrimeGenome]
    echo_reconstruction: Optional[EchoReconstruction]
    network_surgery: Optional[NetworkSurgery]
    recommended_action: str

class IntelligenceSnapshot(BaseModel):
    timestamp: float
    node_anomalies: List[Dict[str, Any]]
    coordination_clusters: List[CoordinationCluster]
    network_change_score: float
    phase_change: Optional[PhaseChangeEvent] = None
    top_suspicious_nodes: List[Dict[str, Any]]
    investigation_case: Optional[InvestigationCase] = None

class StreamPayload(BaseModel):
    type: str
    transaction_event: Optional[TransactionEvent] = None
    graph: GraphUpdateEvent
    intelligence: Optional[IntelligenceSnapshot] = None
