import { Navigate, Outlet } from "react-router-dom";
import { JSX } from "react";
import { useAuth } from "../AuthContext";
import { ROUTES } from "@/routes";
import { useGetProfileQuery } from "../../store/profile/api";
import { CircularProgress, Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

type Props = {
  children?: JSX.Element | null;
  requireProfile?: boolean;
};

export const PrivateRoute = ({ children = <Outlet />, requireProfile = true }: Props): JSX.Element | null => {
  const { user, loading } = useAuth();
  const userId = user?.uid;

  const { data: profile, isLoading: profileLoading } = useGetProfileQuery(userId!, {
    skip: !userId,
  });

  if (loading || profileLoading) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center" }}
        >
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ mt: 3 }}>
            Загружаем ваш профиль...
          </Typography>
        </motion.div>
      </Box>
    );
  }

  if (!user) {
    return <Navigate to={ROUTES.HomePage} replace />;
  }

  if (requireProfile && !profile) {
    return <Navigate to={ROUTES.createProfile} replace />;
  }

  if (!requireProfile && profile) {
    return <Navigate to={ROUTES.profile} replace />;
  }

  return children;
};
