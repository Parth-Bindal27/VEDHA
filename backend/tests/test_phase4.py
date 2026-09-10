import networkx as nx
from app.prediction import NextEdgePredictor
from app.schemas import Transaction

def test_prediction_candidate_generation_and_scoring():
    predictor = NextEdgePredictor()
    
    graph = nx.DiGraph()
    graph.add_edges_from([
        ("A", "HUB"), ("B", "HUB"), ("HUB", "X"), ("HUB", "Y")
    ])
    
    tx1 = Transaction(transaction_id="1", timestamp=10.0, sender="A", receiver="HUB", amount=100.0, currency="USD", transaction_type="transfer")
    tx2 = Transaction(transaction_id="2", timestamp=11.0, sender="HUB", receiver="X", amount=100.0, currency="USD", transaction_type="transfer")
    tx3 = Transaction(transaction_id="3", timestamp=12.0, sender="HUB", receiver="Y", amount=100.0, currency="USD", transaction_type="transfer")
    
    predictions = predictor.predict(13.0, graph, [tx1, tx2, tx3], ["A", "HUB"])
    
    assert len(predictions) > 0
    
    found_candidate = False
    for p in predictions:
        if p.source == "A" and p.target in ["X", "Y"]:
            found_candidate = True
            assert p.prediction_score > 0
            assert p.estimated_amount_range["max"] >= 100.0
            
    assert found_candidate

def test_temporal_leakage():
    predictor = NextEdgePredictor()
    graph = nx.DiGraph()
    graph.add_edges_from([("A", "B")])
    
    tx_past = Transaction(transaction_id="1", timestamp=1.0, sender="A", receiver="B", amount=50.0, currency="USD", transaction_type="transfer")
    tx_future = Transaction(transaction_id="2", timestamp=20.0, sender="B", receiver="C", amount=1000.0, currency="USD", transaction_type="transfer")
    
    history_A = [tx for tx in [tx_past] if tx.timestamp <= 10.0]
    history_B = [tx for tx in [tx_past, tx_future] if tx.timestamp <= 10.0]
    
    pred_A = predictor.predict(10.0, graph, history_A, ["A"])
    pred_B = predictor.predict(10.0, graph, history_B, ["A"])
    
    assert len(pred_A) == len(pred_B)
    if len(pred_A) > 0:
        for pa, pb in zip(pred_A, pred_B):
            assert pa.source == pb.source
            assert pa.target == pb.target
            assert pa.prediction_score == pb.prediction_score
