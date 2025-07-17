import { ROLE } from "@/types";
import { FirebaseError } from "firebase/app";
import { toast } from "react-toastify";
import { useUpdateProfileMutation } from "@/store/profile/api";
import { useAuth } from "@/AppRoutes/AuthContext";
import { CircularProgress, Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes";
import { AgencyForm } from "@/components/create-agency-form";
import { TouristForm } from "@/components/create-tourist-form";
import { useGetProfileQuery } from "@/store/profile/api";
import { TouristFormData } from "@/components/create-tourist-form/schema";
import { AgencyFormData } from "@/components/create-agency-form/schema";

export const EditProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const userId = user?.uid;

  const { data: profile, isLoading: isProfileLoading } = useGetProfileQuery(userId!, {
    skip: !userId,
  });

  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const handleSubmit = async (data: TouristFormData | AgencyFormData) => {
    if (!userId || !profile?.role) {
      toast.error("Невозможно обновить профиль");
      return;
    }

    try {
      await updateProfile({ userId, data }).unwrap();
      toast.success("Профиль успешно обновлён!");
      await navigate(ROUTES.profile);
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error(error.message);
      } else {
        toast.error("Произошла неизвестная ошибка");
      }
      console.error("Error updating profile:", error);
    }
  };

  const isLoading = isProfileLoading || isUpdating;

  const goToProfile = () => {
    navigate(ROUTES.profile);
  };

  if (isLoading || !profile) {
    return (
      <Box
        sx={{
          height: "80vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <CircularProgress size={80} />
          <Typography sx={{ mt: 3 }} variant="h6">
            {isProfileLoading ? "Բեռնվում է պրոֆիլը..." : "Պրոֆիլի թարմացում..."}
          </Typography>
        </motion.div>
      </Box>
    );
  }

  return (
    <div>
      {profile.role === ROLE.TOURIST && (
        <TouristForm submitHandler={handleSubmit} defaultValues={profile as TouristFormData} onBack={goToProfile} />
      )}
      {profile.role === ROLE.AGENCY && (
        <AgencyForm submitHandler={handleSubmit} defaultValues={profile as AgencyFormData} onBack={goToProfile} />
      )}
    </div>
  );
};
