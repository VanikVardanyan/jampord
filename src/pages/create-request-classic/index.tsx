import { Box, Typography, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { ClassicTourRequestForm } from "@/components/request-form-tour-classic";
import { ClassicTourRequestFormData } from "@/components/request-form-tour-classic/schema";
import { useCreateTourRequestMutation } from "@/store/tour-request/api";
import { useAuth } from "@/AppRoutes/AuthContext";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes";

export const CreateClassicTourRequestPage = () => {
  const [createRequest, { isLoading }] = useCreateTourRequestMutation();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (data: ClassicTourRequestFormData) => {
    if (!user) return;

    const requestId = uuidv4();
    try {
      await createRequest({
        id: requestId,
        data: {
          ...data,
          type: "classic",
          createdBy: user.uid,
          hasAnimals: data.withAnimals,
          hasVisaRejection: data.visaDeniedBefore,
        },
      }).unwrap();

      toast.success("Заявка успешно создана!");
      navigate(ROUTES.profile);
    } catch {
      toast.error("Ошибка при создании заявки");
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Box sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 3 }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Ստեղծել դասական տուրի հայտ
        </Typography>

        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <ClassicTourRequestForm submitHandler={handleSubmit} />
        )}
      </Box>
    </motion.div>
  );
};
