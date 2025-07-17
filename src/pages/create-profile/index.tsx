import { useState } from "react";
import { ROLE } from "@/types";
import { SelectRoleStep } from "./components/select-role-step";
import { FirebaseError } from "firebase/app";
import { toast } from "react-toastify";
import { useCreateProfileMutation } from "@/store/profile/api";
import { useAuth } from "@/AppRoutes/AuthContext";
import { CircularProgress, Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes";
import { AgencyForm } from "@/components/create-agency-form";
import { TouristForm } from "@/components/create-tourist-form";
import { TouristFormData } from "@/components/create-tourist-form/schema";
import { AgencyFormData } from "@/components/create-agency-form/schema";

export const CreateProfile = () => {
  const { user } = useAuth();
  const [role, setRole] = useState<ROLE | "">("");
  const [createProfile, { isLoading }] = useCreateProfileMutation();
  const navigaete = useNavigate();

  const handleSubmit = async (data: TouristFormData | AgencyFormData) => {
    if (!role || user === null) {
      toast.error("Выберите роль");
      return;
    }

    try {
      await createProfile({ userId: user.uid, data: { ...data, role } }).unwrap();
      toast.success("Профиль успешно создан!");
      await navigaete(ROUTES.profile);
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error(error.message);
      } else {
        toast.error("Произошла неизвестная ошибка");
      }
      console.error("Error creating profile:", error);
    }
  };

  if (isLoading) {
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
            Создаём ваш профиль...
          </Typography>
        </motion.div>
      </Box>
    );
  }

  return (
    <div>
      {!role && <SelectRoleStep onSelect={(selectedRole) => setRole(selectedRole)} />}
      {role === ROLE.TOURIST && <TouristForm submitHandler={handleSubmit} onBack={() => setRole("")} />}
      {role === ROLE.AGENCY && <AgencyForm submitHandler={handleSubmit} onBack={() => setRole("")} />}
    </div>
  );
};
