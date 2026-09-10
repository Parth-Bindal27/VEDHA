import networkx as nx
from app.crime_genome import CrimeGenomeDetector
from app.echo import EchoReconstructor
from app.surgery import NetworkSurgeryAnalyzer

def test_crime_genome():
    graph = nx.DiGraph()
    graph.add_edges_from([
        ("A", "HUB"), ("B", "HUB"), ("C", "HUB"), ("D", "HUB"),
        ("HUB", "X"), ("HUB", "Y"), ("HUB", "Z"), ("HUB", "W") 
    ])
    
    detector = CrimeGenomeDetector()
    genome = detector.detect(100.0, graph, [], [])
    assert genome.signals.fan_in > 0
    assert genome.signals.fan_out > 0
    assert "FAN_IN" in genome.dominant_patterns
    assert "FAN_OUT" in genome.dominant_patterns

def test_echo_reconstruction():
    reconstructor = EchoReconstructor()
    reconstructor.record_state(10.0, 20.0, "stable")
    reconstructor.record_state(20.0, 40.0, "weak")
    reconstructor.record_state(30.0, 75.0, "emerging") 
    reconstructor.record_state(40.0, 90.0, "coordinated")
    
    echo = reconstructor.reconstruct("c1")
    assert echo is not None
    assert echo.first_emergence == 30.0
    assert echo.timeline[-1].score == 90.0

def test_network_surgery():
    analyzer = NetworkSurgeryAnalyzer()
    graph = nx.DiGraph()
    graph.add_edges_from([
        ("A", "HUB"), ("B", "HUB"), ("C", "HUB"),
        ("HUB", "X"), ("HUB", "Y")
    ]) 
    
    surgery = analyzer.analyze(graph, "c1", 85.0, ["HUB", "A"])
    assert len(surgery.candidates) == 2
    
    hub_candidate = next(c for c in surgery.candidates if c.node_id == "HUB")
    assert hub_candidate.edges_removed == 5
    assert hub_candidate.disruption_impact == 100.0
    
    a_candidate = next(c for c in surgery.candidates if c.node_id == "A")
    assert a_candidate.edges_removed == 1
    assert a_candidate.disruption_impact < 100.0
