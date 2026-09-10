from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok", "message": "ARGUS ECHO Backend is running."}

def test_websocket_contract():
    with client.websocket_connect("/ws/stream") as websocket:
        websocket.send_text("test")
        data = websocket.receive_text()
        assert data == "Received: test"
