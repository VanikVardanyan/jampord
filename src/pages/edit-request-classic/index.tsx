import { Box, Typography, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { ClassicTourRequestForm } from "@/components/request-form-tour-classic";
import { ClassicTourRequestFormData } from "@/components/request-form-tour-classic/schema";
import { useGetTourRequestQuery, useUpdateTourRequestMutation } from "@/store/tour-request/api";
import { toast } from "react-toastify";
import { ClassicTourRequest } from "@/store/tour-request/types";
import { ROUTES } from "@/routes";

export const EditClassicTourRequestPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading: isLoadingRequest } = useGetTourRequestQuery(id!, {
    skip: !id,
  });

  const request = data as ClassicTourRequest;

  const [updateRequest] = useUpdateTourRequestMutation();

  const handleSubmit = async (data: ClassicTourRequestFormData) => {
    if (!id) return;

    try {
      await updateRequest({
        id,
        data: {
          ...data,
          type: "classic",
          hasAnimals: data.withAnimals,
          hasVisaRejection: data.visaDeniedBefore,
        },
      }).unwrap();

      toast.success("Հայտը հաջողությամբ թարմացվեց։");
      navigate(ROUTES.profile);
    } catch {
      toast.error("Սխալ հայտի թարմացման ժամանակ։");
    }
  };

  const initialValues =
    request?.type === "classic"
      ? {
          ...request,
          withAnimals: request.hasAnimals,
          visaDeniedBefore: request.hasVisaRejection,
        }
      : null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Box sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 3 }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Խմբագրել դասական տուրի հայտը
        </Typography>

        {isLoadingRequest || !initialValues ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <ClassicTourRequestForm submitHandler={handleSubmit} defaultValues={initialValues} />
        )}
      </Box>
    </motion.div>
  );
};
