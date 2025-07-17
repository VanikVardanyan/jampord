// pages/edit-entertainment-tour-request/index.tsx
import { Box, Typography, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { EntertainmentTourRequestForm } from "@/components/request-form-tour-entertainment";
import { EntertainmentTourRequestData } from "@/components/request-form-tour-entertainment/schema";
import { useGetTourRequestQuery, useUpdateTourRequestMutation } from "@/store/tour-request/api";
import { toast } from "react-toastify";
import { EntertainmentTourRequest } from "@/store/tour-request/types";
import { ROUTES } from "@/routes";

export const EditEntertainmentTourRequestPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading } = useGetTourRequestQuery(id!, {
    skip: !id,
  });

  const request = data as EntertainmentTourRequest;

  const [updateRequest] = useUpdateTourRequestMutation();

  const handleSubmit = async (formData: EntertainmentTourRequestData) => {
    if (!id) return;

    try {
      await updateRequest({
        id,
        data: {
          ...formData,
          type: "entertainment",
        },
      }).unwrap();

      toast.success("Արկածային տուրի հայտը թարմացվեց։");
      navigate(ROUTES.profile);
    } catch {
      toast.error("Սխալ հայտի թարմացման ժամանակ։");
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Box sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 3 }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Խմբագրել արկածային տուրի հայտը
        </Typography>

        {isLoading || !request ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <EntertainmentTourRequestForm submitHandler={handleSubmit} defaultValues={request} />
        )}
      </Box>
    </motion.div>
  );
};

export default EditEntertainmentTourRequestPage;
