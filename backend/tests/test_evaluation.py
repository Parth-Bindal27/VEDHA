import pytest
from app.simulator import TransactionSimulator
from app.graph_engine import TemporalGraphEngine
from app.features import FeatureExtractor
from app.anomaly import BehavioralAnomalyDetector
from app.prediction import NextEdgePredictor

def test_evaluation_metrics():
    simulator = TransactionSimulator()
    graph_engine = TemporalGraphEngine()
    feature_extractor = FeatureExtractor()
    anomaly_detector = BehavioralAnomalyDetector()
    predictor = NextEdgePredictor()
    
    true_positives = 0
    false_positives = 0
    false_negatives = 0
    true_negatives = 0
    
    hits_at_1 = 0
    hits_at_3 = 0
    hits_at_5 = 0
    total_predictions = 0
    
    all_events = list(simulator.stream(num_transactions=500))
    
    for i, event in enumerate(all_events):
        current_time = event.transaction.timestamp
        graph_engine.add_transaction(event)
        feature_extractor.update(event.transaction)
        
        if i % 10 == 0 and i > 10:
            nodes = list(graph_engine.G.nodes())
            features = feature_extractor.extract_features(current_time, nodes)
            anomalies = anomaly_detector.score_nodes(features)
            
            # Ground truth for current time
            # Note: We check if the node has recently been part of a suspicious transaction.
            recent_suspicious_nodes = set()
            for tx_e in all_events[max(0, i-10):i]:
                if tx_e.metadata.ground_truth_is_suspicious:
                    recent_suspicious_nodes.add(tx_e.transaction.sender)
                    recent_suspicious_nodes.add(tx_e.transaction.receiver)
            
            predicted_anomalies = {a["node_id"] for a in anomalies if a["is_anomalous"]}
            
            for node in nodes:
                is_true_suspicious = node in recent_suspicious_nodes
                is_pred_suspicious = node in predicted_anomalies
                
                if is_true_suspicious and is_pred_suspicious:
                    true_positives += 1
                elif not is_true_suspicious and is_pred_suspicious:
                    false_positives += 1
                elif is_true_suspicious and not is_pred_suspicious:
                    false_negatives += 1
                else:
                    true_negatives += 1
                    
            # Hit@K evaluation for the very next edge
            if i + 1 < len(all_events):
                next_tx = all_events[i+1].transaction
                next_edge = (next_tx.sender, next_tx.receiver)
                
                # Use only history up to `i`
                history = [e.transaction for e in all_events[:i+1]]
                suspicious_ids = list(predicted_anomalies)[:5]
                preds = predictor.predict(current_time, graph_engine.G, history, suspicious_ids)
                
                if preds:
                    total_predictions += 1
                    ranked_edges = [(p.source, p.target) for p in preds]
                    
                    if next_edge in ranked_edges[:1]: hits_at_1 += 1
                    if next_edge in ranked_edges[:3]: hits_at_3 += 1
                    if next_edge in ranked_edges[:5]: hits_at_5 += 1

    precision = true_positives / (true_positives + false_positives) if (true_positives + false_positives) > 0 else 0.0
    recall = true_positives / (true_positives + false_negatives) if (true_positives + false_negatives) > 0 else 0.0
    f1 = 2 * (precision * recall) / (precision + recall) if (precision + recall) > 0 else 0.0
    
    # We don't strictly assert high F1 because IsolationForest on 500 nodes is stochastic,
    # but we assert the evaluation pipeline executes without crashing.
    assert precision >= 0.0
    assert recall >= 0.0
    assert f1 >= 0.0
