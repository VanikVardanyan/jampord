import { JSX } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { ROUTES } from "@/routes";

type Props = {
  children?: JSX.Element | null;
};

export const AuthRoute = (props: Props): JSX.Element | null => {
  const { children = <Outlet /> } = props;
  const { user } = useAuth();

  const isAuth = user;

  if (isAuth) {
    return <Navigate to={ROUTES.profile} replace />;
  }

  return children;
};
