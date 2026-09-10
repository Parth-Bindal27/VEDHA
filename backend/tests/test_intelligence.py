import networkx as nx
from app.features import FeatureExtractor
from app.anomaly import BehavioralAnomalyDetector
from app.coordination import CoordinationDetector
from app.phase_transition import PhaseTransitionDetector
from app.schemas import Transaction

def test_feature_extraction():
    extractor = FeatureExtractor(window_size=10.0)
    tx = Transaction(transaction_id="1", timestamp=1.0, sender="A", receiver="B", amount=100.0, currency="USD", transaction_type="transfer")
    extractor.update(tx)
    
    features = extractor.extract_features(1.0, ["A", "B"])
    assert features["A"]["tx_velocity"] == 1
    assert features["A"]["total_sent"] == 100.0
    assert features["B"]["total_received"] == 100.0
    assert features["A"]["out_degree"] == 1

def test_anomaly_detection_no_ground_truth():
    # Verify AnomalyDetector doesn't require ground truth or labels
    features = {
        "A": {"tx_velocity": 1, "total_sent": 100, "burstiness": 0.1},
        "B": {"tx_velocity": 100, "total_sent": 99999, "burstiness": 10.0}
    }
    detector = BehavioralAnomalyDetector()
    results = detector.score_nodes(features)
    assert len(results) == 2
    # Ensure it didn't crash and purely used behavioral features

def test_coordination():
    history = [
        Transaction(transaction_id="1", timestamp=1.0, sender="A", receiver="HUB", amount=9990.0, currency="USD", transaction_type="transfer"),
        Transaction(transaction_id="2", timestamp=1.1, sender="B", receiver="HUB", amount=9995.0, currency="USD", transaction_type="transfer"),
        Transaction(transaction_id="3", timestamp=1.2, sender="C", receiver="HUB", amount=9999.0, currency="USD", transaction_type="transfer"),
    ]
    detector = CoordinationDetector()
    clusters = detector.detect(2.0, history)
    assert len(clusters) == 1
    assert "A" in clusters[0].members
    assert "HUB" in clusters[0].shared_intermediaries
    assert clusters[0].coordination_score > 60

def test_phase_change():
    detector = PhaseTransitionDetector()
    g1 = nx.DiGraph()
    g1.add_edge("A", "B")
    
    g2 = nx.DiGraph()
    g2.add_edge("A", "B")
    g2.add_edge("C", "D")
    g2.add_edge("D", "E")
    
    # Init baseline
    detector.detect(1.0, g1, 1)
    
    # Detect change
    event = detector.detect(2.0, g2, 5)
    assert event is not None
    assert event.change_score > 25
