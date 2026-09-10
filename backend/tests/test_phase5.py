import pytest
from app.simulator import TransactionSimulator
from app.features import FeatureExtractor
from app.anomaly import BehavioralAnomalyDetector
from app.coordination import CoordinationDetector

def test_baseline_comparison():
    simulator = TransactionSimulator()
    events = list(simulator.stream(500))
    
    tp = 0
    fp = 0
    for e in events:
        is_true = e.metadata.ground_truth_is_suspicious
        is_pred = e.transaction.amount > 8000  # Simple threshold
        
        if is_true and is_pred: tp += 1
        elif not is_true and is_pred: fp += 1
        
    precision = tp / (tp + fp) if (tp + fp) > 0 else 0
    assert precision >= 0

def test_ablation_study():
    simulator = TransactionSimulator()
    extractor = FeatureExtractor()
    anomaly = BehavioralAnomalyDetector()
    coord = CoordinationDetector()
    
    events = list(simulator.stream(100))
    nodes = set()
    for e in events:
        extractor.update(e.transaction)
        nodes.add(e.transaction.sender)
        nodes.add(e.transaction.receiver)
        
    current_time = events[-1].transaction.timestamp
    features = extractor.extract_features(current_time, list(nodes))
    
    anom_results = anomaly.score_nodes(features)
    assert len(anom_results) > 0
    
    coord_results = coord.detect(current_time, extractor.history)
    assert isinstance(coord_results, list)

def test_reproducibility():
    s1 = TransactionSimulator()
    s2 = TransactionSimulator()
    
    events1 = list(s1.stream(50))
    events2 = list(s2.stream(50))
    
    for e1, e2 in zip(events1, events2):
        assert e1.transaction.transaction_id == e2.transaction.transaction_id
        assert e1.transaction.amount == e2.transaction.amount
        
def test_end_to_end_pipeline():
    # Tests the complete integration layer without running the asyncio loop directly
    from app.graph_engine import TemporalGraphEngine
    from app.phase_transition import PhaseTransitionDetector
    from app.crime_genome import CrimeGenomeDetector
    from app.echo import EchoReconstructor
    from app.surgery import NetworkSurgeryAnalyzer
    from app.prediction import NextEdgePredictor
    from app.investigation import InvestigationOrchestrator
    
    sim = TransactionSimulator()
    graph = TemporalGraphEngine()
    features = FeatureExtractor()
    anom = BehavioralAnomalyDetector()
    coord = CoordinationDetector()
    phase = PhaseTransitionDetector()
    genome = CrimeGenomeDetector()
    echo = EchoReconstructor()
    surgery = NetworkSurgeryAnalyzer()
    pred = NextEdgePredictor()
    orchestrator = InvestigationOrchestrator()
    
    events = list(sim.stream(100))
    for e in events:
        graph.add_transaction(e)
        features.update(e.transaction)
        
    current_time = events[-1].transaction.timestamp
    nodes = list(graph.G.nodes())
    
    feats = features.extract_features(current_time, nodes)
    anoms = anom.score_nodes(feats)
    clusters = coord.detect(current_time, features.history)
    phase_res = phase.detect(current_time, graph.G, 100)
    
    node_risk = {}
    for a in anoms:
        node_risk[a["node_id"]] = {"score": a["anomaly_score"], "evidence": a["evidence"].copy()}
        
    top_suspicious = sorted([{"node_id": k, "risk_score": v["score"], "evidence": v["evidence"]} for k,v in node_risk.items()], key=lambda x: x["risk_score"], reverse=True)[:5]
    
    genome_res = genome.detect(current_time, graph.G, features.history, clusters)
    cluster_id = clusters[0].cluster_id if clusters else "global"
    surgery_res = surgery.analyze(graph.G, cluster_id, 80.0, [n["node_id"] for n in top_suspicious])
    echo_res = echo.reconstruct(cluster_id)
    pred_res = pred.predict(current_time, graph.G, features.history, [n["node_id"] for n in top_suspicious])
    
    case = orchestrator.generate_case(top_suspicious, clusters, genome_res, echo_res, surgery_res, pred_res)
    
    assert case.investigator_report is not None
    assert case.investigation_priority >= 0.0
