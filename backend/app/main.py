import asyncio
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from app.simulator import TransactionSimulator
from app.graph_engine import TemporalGraphEngine
from app.features import FeatureExtractor
from app.anomaly import BehavioralAnomalyDetector
from app.coordination import CoordinationDetector
from app.phase_transition import PhaseTransitionDetector
from app.crime_genome import CrimeGenomeDetector
from app.echo import EchoReconstructor
from app.surgery import NetworkSurgeryAnalyzer
from app.prediction import NextEdgePredictor
from app.investigation import InvestigationOrchestrator
from app.schemas import StreamPayload, IntelligenceSnapshot

app = FastAPI(title="Argus Echo API", description="Temporal Intelligence for Financial Crime")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

simulator = TransactionSimulator()
graph_engine = TemporalGraphEngine()
feature_extractor = FeatureExtractor()
anomaly_detector = BehavioralAnomalyDetector()
coordination_detector = CoordinationDetector()
phase_detector = PhaseTransitionDetector()
crime_genome_detector = CrimeGenomeDetector()
echo_reconstructor = EchoReconstructor()
surgery_analyzer = NetworkSurgeryAnalyzer()
edge_predictor = NextEdgePredictor()
investigation_orchestrator = InvestigationOrchestrator()
clients = set()

active_stream_task = None

def reset_all():
    simulator.reset()
    graph_engine.reset()
    feature_extractor.__init__()
    anomaly_detector.__init__()
    coordination_detector.__init__()
    phase_detector.__init__()
    crime_genome_detector.__init__()
    echo_reconstructor.__init__()
    surgery_analyzer.__init__()
    edge_predictor.__init__()
    investigation_orchestrator.__init__()

@app.get("/health")
async def health_check():
    return {"status": "ok", "message": "ARGUS ECHO Backend is running."}

@app.websocket("/ws/stream")
async def websocket_endpoint(websocket: WebSocket):
    global active_stream_task
    await websocket.accept()
    clients.add(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            if data == "start":
                if active_stream_task is None or active_stream_task.done():
                    active_stream_task = asyncio.create_task(run_simulation())
            elif data == "reset":
                if active_stream_task and not active_stream_task.done():
                    active_stream_task.cancel()
                reset_all()
                await broadcast_state()
    except WebSocketDisconnect:
        clients.remove(websocket)

async def broadcast_state(event=None, intelligence=None):
    if event:
        payload = StreamPayload(
            type="transaction",
            transaction_event=event,
            graph=graph_engine.get_update_event(),
            intelligence=intelligence
        )
    else:
        payload = StreamPayload(
            type="reset",
            transaction_event=None,
            graph=graph_engine.get_update_event(),
            intelligence=None
        )
        
    stale_clients = set()
    for client in clients:
        try:
            await client.send_json(payload.model_dump())
        except:
            stale_clients.add(client)
    
    for client in stale_clients:
        clients.remove(client)

async def run_simulation():
    try:
        tx_count = 0
        recent_tx_count = 0
        for event in simulator.stream(num_transactions=500):
            tx_count += 1
            recent_tx_count += 1
            graph_engine.add_transaction(event)
            feature_extractor.update(event.transaction)
            
            intelligence = None
            if tx_count % 10 == 0:
                current_time = event.transaction.timestamp
                nodes = list(graph_engine.G.nodes())
                
                features = feature_extractor.extract_features(current_time, nodes)
                anomalies = anomaly_detector.score_nodes(features)
                clusters = coordination_detector.detect(current_time, feature_extractor.history)
                phase_change = phase_detector.detect(current_time, graph_engine.G, recent_tx_count)
                recent_tx_count = 0
                
                node_risk = {}
                for a in anomalies:
                    node_risk[a["node_id"]] = {"score": a["anomaly_score"], "evidence": a["evidence"].copy()}
                
                for c in clusters:
                    for m in c.members:
                        if m in node_risk:
                            node_risk[m]["score"] += (c.coordination_score / 2.0)
                            node_risk[m]["evidence"].append(f"Involved in coordination cluster {c.cluster_id}")
                
                top_nodes = sorted(node_risk.items(), key=lambda x: x[1]["score"], reverse=True)[:5]
                top_suspicious = [{"node_id": k, "risk_score": round(v["score"], 2), "evidence": v["evidence"]} for k, v in top_nodes]
                
                priority = max([a["anomaly_score"] for a in anomalies]) if anomalies else 0.0
                if clusters:
                    priority = max(priority, max([c.coordination_score for c in clusters]))
                    
                echo_reconstructor.record_state(current_time, priority, phase_change.new_state if phase_change else "stable")
                genome = crime_genome_detector.detect(current_time, graph_engine.G, feature_extractor.history, clusters)
                
                cluster_id = clusters[0].cluster_id if clusters else "global"
                suspicious_node_ids = [n["node_id"] for n in top_suspicious]
                surgery = surgery_analyzer.analyze(graph_engine.G, cluster_id, priority, suspicious_node_ids)
                echo = echo_reconstructor.reconstruct(cluster_id)
                
                predictions = edge_predictor.predict(current_time, graph_engine.G, feature_extractor.history, suspicious_node_ids)
                
                investigation_case = investigation_orchestrator.generate_case(
                    top_suspicious, clusters, genome, echo, surgery, predictions
                )
                
                intelligence = IntelligenceSnapshot(
                    timestamp=current_time,
                    node_anomalies=[a for a in anomalies if a["is_anomalous"]],
                    coordination_clusters=clusters,
                    network_change_score=phase_change.change_score if phase_change else 0.0,
                    phase_change=phase_change,
                    top_suspicious_nodes=top_suspicious,
                    investigation_case=investigation_case,
                    predictions=predictions,
                    investigator_report=investigation_case.investigator_report
                )
            
            await broadcast_state(event, intelligence)
            await asyncio.sleep(0.05)
    except asyncio.CancelledError:
        pass
