// import { Loader } from "@/components/Loader/Loader";
// import { ROUTES } from "@/routes";
// import { useIsAuthorized } from "@/store/auth";
import { JSX, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/firebase/firebaseAuthService";
import { toast } from "react-toastify";
import { ROUTES } from "../../routes";

type Props = {
  children?: JSX.Element | null;
};

export const LogoutRoute = (props: Props): JSX.Element | null => {
  const { children = <Outlet /> } = props;
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logoutUser();
      toast.success("Вы вышли из аккаунта");
      navigate(ROUTES.HomePage);
    } catch {
      toast.error("Ошибка при выходе");
    }
  };

  useEffect(() => {
    logoutHandler();
  }, []);

  logoutUser();

  return children;
};
