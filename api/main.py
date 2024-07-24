from fastapi import FastAPI
import requests
from pydantic import BaseModel
from typing import Union

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}

class Location(BaseModel):
    latitude: float
    longitude: float
    human_address: str

class FoodTruckPermit(BaseModel):
    objectid: str
    applicant: str
    facilitytype: str
    cnn: str
    locationdescription: str
    address: str
    blocklot: str
    block: str
    lot: str
    permit: str
    status: str # "APPROVED" | "REQUESTED" | "EXPIRED" | "SUSPENDED"
    fooditems: str # description
    x: float
    y: float
    latitude: float
    longitude: float
    schedule: str # url
    approved: str # datetime
    received: str # date
    priorpermit: int
    expirationdate: str # datetime
    location: Location
    dayshours: Union[str, None] = None
    # ":@computed_region_yftq_j783": "10",
    # ":@computed_region_p5aj_wyqh": "3",
    # ":@computed_region_rxqg_mtj9": "8",
    # ":@computed_region_bh8s_q3mv": "58",
    # ":@computed_region_fyvs_ahh9": "1"

@app.get("/search")
def search(
    status: str = "APPROVED",
    applicant: Union[str, None] = None,
    street: Union[str, None] = None,
):
    query = f"status={status}"
    if applicant:
        query += f"&applicant={applicant}"
    if street:
        query += f"&street={street}"
    res = requests.get(f"https://data.sfgov.org/resource/rqzj-sfat.json?{query}")
    print(len(res.json()))
    return res.json()
