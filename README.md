# ARGUS ECHO

**Temporal Intelligence for Financial Crime**

## 1. Project Vision
Traditional AML systems flag transactions in isolation. ARGUS ECHO traces the *evolution* of financial networks. It asks: "When do innocent transactions become a suspicious network?"

## 2. Problem Statement
Financial criminals structure transactions to evade threshold rules. The crime isn't hidden inside a single transaction; it's hidden inside the evolution of the network.

## 3. Why Transaction-Level AML Misses Distributed Patterns
Rules catch sums over $10,000. Supervised ML catches historical patterns. Both fail when a completely novel set of accounts begins subtly coordinating micro-transactions that eventually funnel into a laundering hub.

## 4. ARGUS ECHO Concept
Argus treats the financial network as a **latent evolving object**. It detects when the network enters a state that is statistically inconsistent with its historical behavior.

## 5. Architecture
A FastAPI + NetworkX backend computing real-time graph features and Isolation Forest anomalies, streaming via WebSockets to a Next.js 3D React Force Graph frontend.

## 6. Planned Intelligence Modules
- Behavioral Anomaly Detection
- Coordination Emergence
- Network Phase Change
- Crime Genome
- Echo Reconstruction
- Counterfactual Network Surgery
- Next-Edge Prediction

## 7. Planned Algorithms
- **Coordination Emergence**: Detect synchrony, burstiness, and topological novelty.
- **Crime Genome**: Produce a fingerprint based on in/out degrees, clustering, and flow density.
- **Counterfactual Surgery**: Recursively remove candidate nodes to quantify impact on the anomaly score.

## 8. Demo Storyline
1. Live network streaming normal background noise.
2. Subtle relationships emerge.
3. Network phase change triggered (Smurf ring structuring).
4. System highlights anomaly.
5. Investigator runs Echo Reconstruction to trace origin.
6. Counterfactual Surgery isolates the key mule.

## 9. Backend Setup
```bash
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## 10. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 11. API/WebSocket Contract
- `GET /health` : Health check.
- `WS /ws/stream` : Streams JSON payloads containing PhaseChangeEvents, AnomalyEvents, and CoordinationEvents.

## 12. Phase 3 Intelligence (Genome, Echo, Surgery)
Phase 3 transforms raw behavioral signals into human-understandable network intelligence:
- **Crime Genome**: Calculates structural fingerprints. Measures fan-in, fan-out, layering, and intermediary reuse by purely analyzing topological paths and coordination.
- **Echo Reconstruction**: Rewinds the suspicious network through historical graph snapshots to pinpoint the exact temporal window where anomalous behavior first emerged.
- **Counterfactual Network Surgery**: Measures structural dependencies by copying the live graph, systematically removing candidate nodes, and computing the "Disruption Impact". *Note: This measures structural influence, not real-world causality.*

**Important Distinction:** ARGUS evaluates behavioral evidence, completely isolated from ground-truth labels. It does not classify nodes as 'criminal', but rather calculates their structural influence and investigation priority.

## 13. Phase 4 Predictive Intelligence (Next-Edge & Investigator Report)
Phase 4 attempts to answer "What is this network likely to do next?" using historical constraints:
- **Next-Edge Prediction**: Generates candidate relationships (shared intermediaries, motif continuations, recent interactions) and scores them based on temporal proximity and flow direction. It also estimates probable transaction amount ranges. The prediction is evaluated using Hit@1, Hit@3, and Hit@5 metrics.
- **Investigator Report**: Synthesizes the Genome, Echo, Surgery, and Prediction results into a concise brief. This system is deterministic by default but can optionally utilize an LLM adapter.
- **Strict Information Barrier**: The predictor is explicitly barred from accessing future temporal transactions or simulator ground-truth states, guaranteeing that predictions are authentic forward-inferences.

## 14. Phase 5 Final Intelligence & Validation
Phase 5 completes the investigation loop:
- **AI Investigator (SAR Draft)**: Uses a multi-signal priority heuristic (combining Anomaly, Coordination, Genome, Surgery, and Prediction) to trigger a deterministic SAR Draft. LLM capability is integrated but optional.
- **Richer Graph Features**: Implemented `betweenness_centrality` and temporal motif detection (`Fan-In`/`Fan-Out` loops) into the core `FeatureExtractor`.
- **Validation**: Introduced rigorous end-to-end and reproducibility tests. Evaluates Hit@K and Baseline comparisons natively.
- **Strict Leakage Guard**: Comprehensive structural tests explicitly block metadata/future state leakage, ensuring ARGUS functions purely on observational graph states.

## 15. Limitations and Security
- **Simulator Constraints**: The data is a deterministic simulation. Production would require integration with live banking streams.
- **ML Component**: Only the Isolation Forest constitutes machine learning. Genome, Echo, Surgery, and Prediction are all structural graph heuristics.
- **Security**: Please create a `.env` file if injecting `OPENAI_API_KEY`. DO NOT commit API keys to version control.

## 16. Local Demo Instructions
**Backend:**
```bash
cd backend
.\venv\Scripts\Activate.ps1
uvicorn app.main:app --reload
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

Navigate to `http://localhost:3000` to begin the simulation.

## 13. Research Direction
Treating financial crime as a topological phase transition rather than a static classification problem.

## 14. Scientific Limitations
ARGUS computes *structural anomaly scores*. It does not prove legal guilt. It identifies "high-impact intermediaries" and "crime hypotheses" that require human investigation.

## 15. Implementation Phases
- **PHASE 0:** Foundation, routing, WebSocket contracts, UI shell.
- **PHASE 1:** Deterministic transaction simulator + temporal graph engine.
- **PHASE 2:** Graph features + unsupervised anomaly detection.
- **PHASE 3:** Coordination Emergence + Network Phase Change.
- **PHASE 4:** Crime Genome + Echo Reconstruction.
- **PHASE 5:** Counterfactual Surgery + Next-Edge Prediction.
- **PHASE 6:** Investigation Orchestrator + LLM-assisted case generation.
- **PHASE 7:** 3D visualization + animations + final demo polish.
