from fastapi import FastAPI
import requests
from pydantic import BaseModel
from typing import Union
import googlemaps
import os
from fastapi.middleware.cors import CORSMiddleware


GOOGLE_MAPS_API_KEY = os.environ.get("GOOGLE_MAPS_API_KEY")
gmaps = googlemaps.Client(key=GOOGLE_MAPS_API_KEY)

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Location(BaseModel):
    latitude: float
    longitude: float
    human_address: str

class FoodTruckPermit(BaseModel):
    objectid: str
    applicant: str
    facilitytype: str
    cnn: str
    locationdescription: Union[str, None] = None
    address: str
    blocklot: Union[str, None] = None
    block: Union[str, None] = None
    lot: Union[str, None] = None
    permit: str
    status: str # "APPROVED" | "REQUESTED" | "EXPIRED" | "SUSPENDED"
    fooditems: str # description
    x: Union[float, None] = None
    y: Union[float, None] = None
    latitude: float
    longitude: float
    schedule: str # url
    approved: Union[str, None] = None # datetime
    received: str # date
    priorpermit: int
    expirationdate: str # datetime
    location: Location
    dayshours: Union[str, None] = None
    msg: Union[str, None] = None
    loc: Union[str, None] = None
    distance_from_input: Union[int, None] = None
    # ":@computed_region_yftq_j783": "10",
    # ":@computed_region_p5aj_wyqh": "3",
    # ":@computed_region_rxqg_mtj9": "8",
    # ":@computed_region_bh8s_q3mv": "58",
    # ":@computed_region_fyvs_ahh9": "1"

def filter_food_trucks(
  trucks,
  status: str,
  applicant: str,
  street: str,
) -> list[FoodTruckPermit]:
    results = []
    for t in trucks:
        if (t['status'] == status
            and (not applicant or applicant.lower() in t['applicant'].lower())
            and (not street or street.lower() in t['address'].lower())
        ):
            results.append(t)
    return results

def location_filter_food_trucks(
  trucks,
  lat: float,
  long: float,
) -> list[FoodTruckPermit]:
    trucks_w_lat_long = [t for t in trucks if t['latitude'] and t['longitude']]
    destinations = [(t['latitude'], t['longitude']) for t in trucks_w_lat_long]
    g_resps = []
    count = (len(trucks) // 10) + 1
    for i in range(count):
        d = destinations[i*10:i*10+10]
        g_resp = gmaps.distance_matrix((lat, long), d)
        g_resps += g_resp['rows'][0]['elements']

    for i in range(len(trucks_w_lat_long)):
        matching_resp = g_resps[i]
        time_dist = -1
        if 'duration' in matching_resp and 'value' in matching_resp['duration']:
            time_dist = matching_resp['duration']['value']
        trucks_w_lat_long[i]['distance_from_input'] = time_dist

    success_trucks = [t for t in trucks_w_lat_long if t['distance_from_input'] != -1]
    sorted_trucks = sorted(success_trucks, key=lambda t: t['distance_from_input'])
    return sorted_trucks

@app.get("/search")
def search(
    status: str = "APPROVED",
    applicant: Union[str, None] = None,
    street: Union[str, None] = None,
    lat: Union[float, None] = None,
    long: Union[float, None] = None,
) -> list[FoodTruckPermit]:
    res = requests.get("https://data.sfgov.org/resource/rqzj-sfat.json")
    trucks = filter_food_trucks(res.json(), status, applicant, street)
    if lat and long:
        trucks = location_filter_food_trucks(trucks, lat, long)[:5]
    return trucks
