// import AgencyProfilePage from "./components/AgencyProfilePage";
// import { ROLE } from "@/types";
import { Box, Typography } from "@mui/material";
// import { TouristProfilePage } from "./components/TouristProfilePage.tsx";
// import { useGetProfileQuery } from "@/store/profile/api.ts";
// import { useAuth } from "@/AppRoutes/AuthContext.tsx";

export const ProfilePage = () => {
  // const { user } = useAuth();
  // const userId = user?.uid;

  // const { data: profile, isLoading } = useGetProfileQuery(userId!, {
  //   skip: !userId,
  // });

  // if (isLoading) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
      <Typography>Загрузка профиля...</Typography>
    </Box>
  );
  // }

  // if (!profile) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
      <Typography>Профиль не найден</Typography>
    </Box>
  );
  // }

  // if (profile.role === ROLE.AGENCY) {
  //   return <AgencyProfilePage />;
  // }

  // if (profile.role === ROLE.TOURIST) {
  //   return <TouristProfilePage />;
  // }

  return null;
};

export default ProfilePage;
