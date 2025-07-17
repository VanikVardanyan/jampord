export type ValueOf<T> = T[keyof T];

export enum ROLE {
  TOURIST = "tourist",
  AGENCY = "agency",
}

export interface TouristProfileData {
  role: ROLE;
  name: string;
  phone: string;
  avatar?: string;
}

export interface AgencyProfileData {
  role: ROLE;
  companyName: string;
  phone: string;
  country: string;
  about: string;
  fb?: string;
  tiktok?: string;
  telegram?: string;
  instagram?: string;
  avatar?: string;
}
