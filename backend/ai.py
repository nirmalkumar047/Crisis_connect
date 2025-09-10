import numpy as np
from sklearn.cluster import DBSCAN
from typing import List
from backend.schemas import ClusterResponse

def assign_priority(request) -> str:
    needs = request.needs.lower()
    if "medical" in needs:
        return "high"
    elif "food" in needs:
        return "medium"
    elif "water" in needs:
        return "medium"
    else:
        return "low"

def get_clusters(requests, eps=0.01, min_samples=2) -> List[ClusterResponse]:
    if len(requests) < 2:
        return []
    
    coords = np.array([[r.lat, r.lon] for r in requests])
    clustering = DBSCAN(eps=eps, min_samples=min_samples).fit(coords)
    
    clusters = []
    for cluster_id in set(clustering.labels_):
        if cluster_id == -1:  # noise
            continue
            
        cluster_mask = clustering.labels_ == cluster_id
        cluster_requests = [requests[i] for i, mask in enumerate(cluster_mask) if mask]
        cluster_coords = coords[cluster_mask]
        
        centroid_lat = float(np.mean(cluster_coords[:, 0]))
        centroid_lon = float(np.mean(cluster_coords[:, 1]))
        
        # Determine cluster priority (highest priority in cluster)
        priorities = [r.priority for r in cluster_requests]
        if "high" in priorities:
            cluster_priority = "high"
        elif "medium" in priorities:
            cluster_priority = "medium"
        else:
            cluster_priority = "low"
        
        clusters.append(ClusterResponse(
            cluster_id=int(cluster_id),
            centroid_lat=centroid_lat,
            centroid_lon=centroid_lon,
            request_ids=[r.id for r in cluster_requests],
            priority=cluster_priority
        ))
    
    return clusters