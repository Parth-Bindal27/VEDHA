import networkx as nx
from typing import List, Dict, Any, Optional
from app.schemas import TransactionEvent, GraphUpdateEvent

class TemporalGraphEngine:
    def __init__(self):
        self.G = nx.DiGraph()
        self.transactions: List[TransactionEvent] = []

    def reset(self):
        self.G.clear()
        self.transactions.clear()

    def add_transaction(self, event: TransactionEvent):
        self.transactions.append(event)
        self._apply_transaction_to_graph(self.G, event)

    def _apply_transaction_to_graph(self, graph: nx.DiGraph, event: TransactionEvent):
        tx = event.transaction
        
        # Update/Add Nodes
        for node, amt, is_sender in [(tx.sender, tx.amount, True), (tx.receiver, tx.amount, False)]:
            if not graph.has_node(node):
                graph.add_node(node, 
                               transaction_count=0, 
                               total_sent=0.0, 
                               total_received=0.0, 
                               first_seen=tx.timestamp, 
                               last_seen=tx.timestamp)
            
            n_data = graph.nodes[node]
            n_data["transaction_count"] += 1
            n_data["last_seen"] = max(n_data["last_seen"], tx.timestamp)
            if is_sender:
                n_data["total_sent"] += amt
            else:
                n_data["total_received"] += amt

        # Update/Add Edge
        if graph.has_edge(tx.sender, tx.receiver):
            e_data = graph[tx.sender][tx.receiver]
            e_data["transaction_count"] += 1
            e_data["total_amount"] += tx.amount
            e_data["last_timestamp"] = max(e_data["last_timestamp"], tx.timestamp)
        else:
            graph.add_edge(tx.sender, tx.receiver, 
                           transaction_count=1, 
                           total_amount=tx.amount, 
                           first_timestamp=tx.timestamp, 
                           last_timestamp=tx.timestamp)

    def build_graph(self, transactions: List[TransactionEvent], until_timestamp: Optional[float] = None) -> nx.DiGraph:
        new_G = nx.DiGraph()
        for ev in transactions:
            if until_timestamp is not None and ev.transaction.timestamp > until_timestamp:
                break
            self._apply_transaction_to_graph(new_G, ev)
        return new_G

    def get_graph_snapshot(self, timestamp: float) -> nx.DiGraph:
        """Returns the graph exactly as it looked at the specified timestamp."""
        return self.build_graph(self.transactions, until_timestamp=timestamp)

    def get_update_event(self) -> GraphUpdateEvent:
        """Helper to serialize the current graph for the frontend payload."""
        nodes = [{"id": n, **data} for n, data in self.G.nodes(data=True)]
        edges = [{"source": u, "target": v, **data} for u, v, data in self.G.edges(data=True)]
        return GraphUpdateEvent(nodes=nodes, edges=edges)
