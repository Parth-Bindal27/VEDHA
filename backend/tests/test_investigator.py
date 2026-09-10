import pytest
from app.investigator import AIInvestigator
from app.schemas import InvestigatorReport
from unittest.mock import patch, MagicMock

def test_deterministic_fallback_no_api_key(monkeypatch):
    monkeypatch.delenv("OPENAI_API_KEY", raising=False)
    
    investigator = AIInvestigator()
    assert investigator.client is None
    
    report = investigator.generate_report(
        priority=80.0,
        genome=None,
        echo=None,
        surgery=None,
        predictions=[],
        coordination_evidence=["Node A coordinated with Node B"]
    )
    
    assert isinstance(report, InvestigatorReport)
    assert report.recommended_action == "INVESTIGATION RECOMMENDED"
    assert report.sar_draft is not None
    assert "DRAFT" in report.sar_draft

@patch("app.investigator.AIInvestigator")
def test_llm_failure_triggers_fallback(mock_investigator, monkeypatch):
    # Mocking openai to raise an exception
    monkeypatch.setenv("OPENAI_API_KEY", "fake-key")
    
    investigator = AIInvestigator()
    # Mock the client chat completions to raise Exception
    investigator.client = MagicMock()
    investigator.client.chat.completions.create.side_effect = Exception("API Timeout")
    
    report = investigator.generate_report(
        priority=85.0,
        genome=None,
        echo=None,
        surgery=None,
        predictions=[],
        coordination_evidence=["Test evidence"]
    )
    
    assert isinstance(report, InvestigatorReport)
    assert report.recommended_action == "INVESTIGATION RECOMMENDED"
    assert report.sar_draft is not None
