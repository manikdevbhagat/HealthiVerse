interface OpenHours{
  from: string;
  to: string;
}

export interface Gym{
  id: string;
  name: string;
  services: string[];
  openHours: OpenHours; 
  avgRating: number;
  totalRating: number;
  photo: string;
  address: string;
}