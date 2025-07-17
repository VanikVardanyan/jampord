import { Route, Routes } from "react-router-dom";
import { lazily } from "@/utils/modules";
import { ROUTES } from "@/routes";
import { AppLayout } from "../components/layout/AppLayout";
import { AuthProvider } from "./AuthContext";
import { PrivateRoute } from "./components/PrivateRoute";
import { LogoutRoute } from "./components/LogoutRoute";
import { AuthRoute } from "./components/AuthRoute";
import { EditTour } from "../pages/edit-tour";

const { HomePage } = lazily(() => import("@/pages/main"));
const { RegisterPage } = lazily(() => import("@/pages/register"));
const { ProfilePage } = lazily(() => import("@/pages/profile"));
const { CreateTour } = lazily(() => import("@/pages/create-tour"));
const { TourDetailsPage } = lazily(() => import("@/pages/tour"));
const { CreateProfile } = lazily(() => import("@/pages/create-profile"));
const { EditProfile } = lazily(() => import("@/pages/edit-profile"));
const { LogoutPage } = lazily(() => import("@/pages/logout"));
const { LoginPage } = lazily(() => import("@/pages/login"));
const { ForgotPasswordPage } = lazily(() => import("@/pages/forgot-password"));
const { AgencyPage } = lazily(() => import("@/pages/agency"));
const { CreateEntertainmentTourRequestPage } = lazily(() => import("@/pages/create-request-activity"));
const { CreateClassicTourRequestPage } = lazily(() => import("@/pages/create-request-classic"));
const { TourRequestPage } = lazily(() => import("@/pages/tour-request"));
const { EditEntertainmentTourRequestPage } = lazily(() => import("@/pages/edit-request-activity"));
const { EditClassicTourRequestPage } = lazily(() => import("@/pages/edit-request-classic"));
const { ToursPage } = lazily(() => import("@/pages/tours"));
const { RequestsPage } = lazily(() => import("@/pages/requests"));

export const AppRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path={ROUTES.HomePage} element={<AppLayout />}>
          <Route>
            <Route index element={<HomePage />} />
            <Route path={`${ROUTES.tour}/:tourId`} element={<TourDetailsPage />} />
            <Route path={`${ROUTES.agency}/:id`} element={<AgencyPage />} />
            <Route path={ROUTES.tours} element={<ToursPage />} />
          </Route>

          <Route element={<PrivateRoute requireProfile={false} />}>
            <Route path={ROUTES.createProfile} element={<CreateProfile />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path={ROUTES.profile} element={<ProfilePage />} />
            <Route path={ROUTES.createTour} element={<CreateTour />} />
            <Route path={ROUTES.createClassicTourRequest} element={<CreateClassicTourRequestPage />} />
            <Route path={ROUTES.createEntertainmentTourRequest} element={<CreateEntertainmentTourRequestPage />} />
            <Route path={ROUTES.editProfile} element={<EditProfile />} />
            <Route path={`${ROUTES.tourRequest}/:id`} element={<TourRequestPage />} />
            <Route path={`${ROUTES.editTour}/:tourId`} element={<EditTour />} />
            <Route path={`${ROUTES.editClassicTourRequest}/:id`} element={<EditClassicTourRequestPage />} />
            <Route path={`${ROUTES.editEntertainmentTourRequest}/:id`} element={<EditEntertainmentTourRequestPage />} />
            <Route path={ROUTES.requests} element={<RequestsPage />} />
          </Route>

          <Route element={<LogoutRoute />}>
            <Route path={ROUTES.logout} element={<LogoutPage />} />
          </Route>

          <Route path={ROUTES.HomePage}>
            <Route element={<AuthRoute />}>
              <Route path={ROUTES.register} element={<RegisterPage />} />
              <Route path={ROUTES.login} element={<LoginPage />} />
              <Route path={ROUTES.forgotPassword} element={<ForgotPasswordPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
};
