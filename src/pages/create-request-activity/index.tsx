import { Box, Typography, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { useCreateTourRequestMutation } from "@/store/tour-request/api";
import { useAuth } from "@/AppRoutes/AuthContext";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { EntertainmentTourRequestForm } from "@/components/request-form-tour-entertainment";
import { EntertainmentTourRequestData } from "@/components/request-form-tour-entertainment/schema";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes";

export const CreateEntertainmentTourRequestPage = () => {
  const [createRequest, { isLoading }] = useCreateTourRequestMutation();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (data: EntertainmentTourRequestData) => {
    if (!user) return;

    const requestId = uuidv4();
    try {
      await createRequest({
        id: requestId,
        data: {
          ...data,
          type: "entertainment",
          createdBy: user.uid,
          preferredDate: data.date,
          activityType: data.activityType,
        },
      }).unwrap();

      toast.success("Զբոսաշրջային հայտը հաջողությամբ ստեղծվեց!");
      await navigate(ROUTES.profile);
    } catch {
      toast.error("Սխալ առաջացավ հայտը ստեղծելիս");
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Box sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 3 }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Ստեղծել ժամանցային տուրի հայտ
        </Typography>

        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <EntertainmentTourRequestForm submitHandler={handleSubmit} />
        )}
      </Box>
    </motion.div>
  );
};
