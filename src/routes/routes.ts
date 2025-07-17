import { ValueOf } from "@/types";

export const ROUTES = {
  HomePage: "/",
  logout: "/logout",
  register: "/register",
  login: "/login",
  profile: "/profile",
  createProfile: "/create-profile",
  editProfile: "/edit-profile",
  forgotPassword: "/forgot-password",
  createTour: "/create-tour",
  editTour: "/edit-tour",
  tour: "/tour",
  tours: "/tours",
  agency: "/agency",
  createClassicTourRequest: "/create-classic-request",
  createEntertainmentTourRequest: "/create-entertainment-request",
  tourRequest: "/tour-request",
  editClassicTourRequest: `/tour-request/classic/`,
  editEntertainmentTourRequest: `/tour-request/entertainment/`,
  requests: "/requests",
} as const;

export type Routes = ValueOf<typeof ROUTES>;

export type LogoutSource = "header" | "server";
