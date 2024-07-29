export type Status = "APPROVED" | "REQUESTED" | "EXPIRED" | "SUSPENDED";

export type FoodTruck = {
  objectid: string,
  applicant: string,
  facilitytype: string,
  cnn: string,
  locationdescription?: string,
  address: string,
  blocklot?: string,
  block?: string,
  lot?: string,
  permit: string,
  status: Status, // 
  fooditems: string, // description
  x?: number,
  y?: number,
  latitude: number,
  longitude: number,
  schedule: string, // url
  approved?: string,
  received: string, // date
  priorpermit: number,
  expirationdate: string, // datetime
  location: {
    latitude: number,
    longitude: number,
    human_address: string,
  },
  dayshours?: string,
  msg?: string,
  loc?: string,
  distance_from_input?: number,
};

export type FormData = {
  status?: string,
  applicant?: string,
  street?: string,
  lat?: number,
  long?: number,
};
