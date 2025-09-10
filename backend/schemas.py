from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class RequestCreate(BaseModel):
    name: str
    contact: Optional[str] = None
    needs: str
    lat: float
    lon: float

class RequestResponse(BaseModel):
    id: int
    name: str
    contact: Optional[str]
    needs: str
    lat: float
    lon: float
    priority: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class ClusterResponse(BaseModel):
    cluster_id: int
    centroid_lat: float
    centroid_lon: float
    request_ids: list[int]
    priority: str