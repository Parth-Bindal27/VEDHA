from app.graph_engine import TemporalGraphEngine
from app.schemas import Transaction, TransactionMetadata, TransactionEvent

def test_graph_construction():
    engine = TemporalGraphEngine()
    tx = Transaction(
        transaction_id="TX_01",
        timestamp=100.0,
        sender="A",
        receiver="B",
        amount=50.0,
        currency="USD",
        transaction_type="transfer"
    )
    meta = TransactionMetadata(
        scenario_id="1", ground_truth_pattern="base", ground_truth_is_suspicious=False, phase=0
    )
    engine.add_transaction(TransactionEvent(transaction=tx, metadata=meta))
    
    assert engine.G.has_node("A")
    assert engine.G.has_node("B")
    assert engine.G.has_edge("A", "B")
    assert engine.G.nodes["A"]["total_sent"] == 50.0

def test_graph_snapshot():
    engine = TemporalGraphEngine()
    txs = [
        TransactionEvent(
            transaction=Transaction(transaction_id="1", timestamp=10.0, sender="A", receiver="B", amount=10.0, currency="USD", transaction_type="transfer"),
            metadata=TransactionMetadata(scenario_id="1", ground_truth_pattern="base", ground_truth_is_suspicious=False, phase=0)
        ),
        TransactionEvent(
            transaction=Transaction(transaction_id="2", timestamp=20.0, sender="B", receiver="C", amount=10.0, currency="USD", transaction_type="transfer"),
            metadata=TransactionMetadata(scenario_id="1", ground_truth_pattern="base", ground_truth_is_suspicious=False, phase=0)
        )
    ]
    for tx in txs:
        engine.add_transaction(tx)
        
    snap_t10 = engine.get_graph_snapshot(15.0)
    assert snap_t10.has_node("A")
    assert snap_t10.has_node("B")
    assert not snap_t10.has_node("C") # C hasn't received anything yet by t=15
