import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/AppRoutes/AuthContext";
import { CreateTourForm } from "@/components/create-tour-form";
import { useGetTourQuery, useUpdateTourMutation } from "@/store/tour/api";
import { toast } from "react-toastify";
import { ROUTES } from "@/routes";
import { TourFormData } from "@/components/create-tour-form/types";
import { Box, Typography } from "@mui/material";

export const EditTour = () => {
  const { tourId } = useParams<{ tourId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    data: tour,
    isLoading,
    isError,
  } = useGetTourQuery(tourId!, {
    skip: !tourId,
  });

  const [updateTour] = useUpdateTourMutation();

  const onSubmit = async (data: TourFormData) => {
    if (!user) {
      toast.error("Մուտք գործեք համակարգ");
      return;
    }

    if (!tourId) {
      toast.error("Չհաջողվեց ստանալ տուրի ID-ն");
      return;
    }

    const dataWithCratedBy = {
      ...data,
      createdBy: user.uid,
    };

    try {
      await updateTour({ tourId, data: dataWithCratedBy }).unwrap();
      toast.success("Տուրը հաջողությամբ թարմացվեց");
      navigate(ROUTES.profile);
    } catch (error) {
      console.error("Սխալ տուրի թարմացման ժամանակ:", error);
      toast.error("Սխալ թարմացման ժամանակ");
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ mt: 10, textAlign: "center" }}>
        <Typography>Տուրը բեռնվում է...</Typography>
      </Box>
    );
  }

  if (isError || !tour) {
    return (
      <Box sx={{ mt: 10, textAlign: "center" }}>
        <Typography>Տուրը չի գտնվել</Typography>
      </Box>
    );
  }

  return <CreateTourForm successCallback={onSubmit} defaultValues={tour} />;
};
