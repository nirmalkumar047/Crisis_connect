from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from backend.database import get_db
from backend.models import Request
from backend.schemas import RequestCreate, RequestResponse, ClusterResponse
from backend.ai import assign_priority, get_clusters

router = APIRouter()

@router.post("/api/requests", response_model=RequestResponse)
def create_request(request: RequestCreate, db: Session = Depends(get_db)):
    priority = assign_priority(request)
    db_request = Request(**request.dict(), priority=priority)
    db.add(db_request)
    db.commit()
    db.refresh(db_request)
    return db_request

@router.get("/api/requests", response_model=List[RequestResponse])
def get_requests(db: Session = Depends(get_db)):
    return db.query(Request).all()

@router.get("/api/clusters", response_model=List[ClusterResponse])
def get_request_clusters(db: Session = Depends(get_db)):
    requests = db.query(Request).all()
    return get_clusters(requests)