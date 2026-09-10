from app.simulator import TransactionSimulator

def test_determinism():
    sim1 = TransactionSimulator(seed=42)
    seq1 = sim1.generate_sequence(100)
    
    sim2 = TransactionSimulator(seed=42)
    seq2 = sim2.generate_sequence(100)
    
    for e1, e2 in zip(seq1, seq2):
        assert e1.transaction.transaction_id == e2.transaction.transaction_id
        assert e1.transaction.amount == e2.transaction.amount

def test_transaction_validity():
    sim = TransactionSimulator()
    seq = sim.generate_sequence(100)
    for e in seq:
        tx = e.transaction
        assert tx.sender != tx.receiver
        assert tx.amount > 0

def test_phases_exist():
    sim = TransactionSimulator()
    seq = sim.generate_sequence(500)
    phases = set([e.metadata.phase for e in seq])
    assert phases == {0, 1, 2, 3, 4, 5}
