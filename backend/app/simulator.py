import random
import time
from typing import List, Iterator
from app.schemas import Transaction, TransactionMetadata, TransactionEvent

class TransactionSimulator:
    def __init__(self, seed: int = 42):
        self.seed = seed
        self.reset()

    def reset(self):
        random.seed(self.seed)
        self.current_time = 1710000000.0  # Fixed start time for deterministic temporal analysis
        self.transaction_count = 0
        self.accounts = [f"ACC_{i:03d}" for i in range(1, 101)]
        self.smurfs = [f"SMURF_{i:02d}" for i in range(1, 6)]
        self.hub = "HUB_01"
        self.layers = ["LAYER_1", "LAYER_2", "LAYER_3"]
        self.destinations = ["DEST_X", "DEST_Y", "DEST_Z"]

    def generate_event(self, sender: str, receiver: str, amount: float, phase: int, pattern: str, is_suspicious: bool) -> TransactionEvent:
        self.transaction_count += 1
        # Time advances deterministically but seemingly randomly to simulate real flow
        self.current_time += random.uniform(1.0, 10.0) 
        
        tx = Transaction(
            transaction_id=f"TX_{self.transaction_count:05d}",
            timestamp=self.current_time,
            sender=sender,
            receiver=receiver,
            amount=round(amount, 2),
            currency="USD",
            transaction_type="transfer"
        )
        meta = TransactionMetadata(
            scenario_id="DEMO_001",
            ground_truth_pattern=pattern,
            ground_truth_is_suspicious=is_suspicious,
            phase=phase
        )
        return TransactionEvent(transaction=tx, metadata=meta)

    def _random_account(self, exclude: str = None) -> str:
        acc = random.choice(self.accounts)
        while acc == exclude:
            acc = random.choice(self.accounts)
        return acc

    def generate_sequence(self, num_transactions: int = 500) -> List[TransactionEvent]:
        events = []
        for i in range(1, num_transactions + 1):
            if i <= 100:
                # Phase 0: Baseline (Normal ecosystem)
                src = self._random_account()
                dst = self._random_account(exclude=src)
                amt = random.uniform(10, 1000)
                events.append(self.generate_event(src, dst, amt, 0, "baseline", False))
                
            elif i <= 200:
                # Phase 1: Weak Signal (Subtle, modest coordination)
                if i % 10 == 0:
                    events.append(self.generate_event(self.smurfs[0], self.hub, random.uniform(100, 200), 1, "weak_signal", True))
                else:
                    src = self._random_account()
                    dst = self._random_account(exclude=src)
                    events.append(self.generate_event(src, dst, random.uniform(10, 1000), 1, "baseline", False))
                    
            elif i <= 300:
                # Phase 2: Coordination Emergence (Smurfs synchronizing to Hub)
                if i % 4 == 0:
                    src = random.choice(self.smurfs)
                    amt = random.uniform(9000, 9999) # Structuring amounts
                    events.append(self.generate_event(src, self.hub, amt, 2, "coordination", True))
                else:
                    src = self._random_account()
                    dst = self._random_account(exclude=src)
                    events.append(self.generate_event(src, dst, random.uniform(10, 1000), 2, "baseline", False))

            elif i <= 400:
                # Phase 3: Layering / Fan-out (Moving money out of Hub)
                if i % 5 == 0:
                    if random.random() < 0.5:
                        events.append(self.generate_event(self.hub, random.choice(self.layers), random.uniform(15000, 25000), 3, "layering", True))
                    else:
                        events.append(self.generate_event(random.choice(self.layers), random.choice(self.destinations), random.uniform(5000, 10000), 3, "fan_out", True))
                else:
                    src = self._random_account()
                    dst = self._random_account(exclude=src)
                    events.append(self.generate_event(src, dst, random.uniform(10, 1000), 3, "baseline", False))
                    
            elif i < 500:
                # Phase 4: Network Expansion (New edges, burst velocity)
                if i % 3 == 0:
                    src = random.choice(self.layers)
                    new_dest = f"NEW_DEST_{i}"
                    events.append(self.generate_event(src, new_dest, random.uniform(10000, 12000), 4, "expansion", True))
                else:
                    src = self._random_account()
                    dst = self._random_account(exclude=src)
                    events.append(self.generate_event(src, dst, random.uniform(10, 1000), 4, "baseline", False))
            else:
                # Phase 5: Future Event (Prediction Target)
                events.append(self.generate_event(self.destinations[0], "OFFSHORE_ACC_99", 50000.0, 5, "future_move", True))
                
        return events

    def stream(self, num_transactions: int = 500) -> Iterator[TransactionEvent]:
        self.reset()
        for ev in self.generate_sequence(num_transactions):
            yield ev
