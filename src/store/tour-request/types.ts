export type TourRequestType = "classic" | "entertainment";

export interface ClassicTourRequest {
  type: TourRequestType;
  description: string;
  preferredDate: string;
  peopleCount: number;
  country?: string;
  city?: string;
  daysCount: number;
  hasVisaRejection: boolean;
  hasAnimals: boolean;
  childrenCount: number;
  budget?: number;
  createdBy?: string;
  id?: string;
}

export enum EntertainmentActivityType {
  HorseRiding = "horse_riding",
  Jeeping = "jeeping",
  Hiking = "hiking",
  Zipline = "zipline",
  Camping = "camping",
  BoatRide = "boat_ride",
  WineTour = "wine_tour",
  Paragliding = "paragliding",
}

export interface EntertainmentTourRequest {
  type: TourRequestType;
  description: string;
  preferredDate: string;
  peopleCount: number;
  activityType: string;
  createdBy?: string;
  id?: string;
}

export type TourRequestData = ClassicTourRequest | EntertainmentTourRequest;
