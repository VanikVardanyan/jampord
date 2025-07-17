import { Box, Typography, Button, Container, Avatar } from "@mui/material";
import { useParams, useNavigate, Link as RouterLink } from "react-router-dom";
import { useGetTourQuery } from "@/store/tour/api";
import { useGetProfileQuery } from "@/store/profile/api";
import { motion } from "framer-motion";
import { AgencyProfileData } from "../../types";

export const TourDetailsPage = () => {
  const { tourId } = useParams<{ tourId: string }>();
  const navigate = useNavigate();

  const {
    data: tour,
    isLoading: tourLoading,
    isError,
  } = useGetTourQuery(tourId!, {
    skip: !tourId,
  });

  const createdBy = tour?.createdBy;

  const { data: agencyProfile } = useGetProfileQuery(createdBy ?? "", {
    skip: !tour?.createdBy,
  });
  console.log(tour);
  if (tourLoading) {
    return (
      <Box sx={{ mt: 10, display: "flex", justifyContent: "center" }}>
        <Typography>Բեռնվում է...</Typography>
      </Box>
    );
  }

  if (isError || !tour) {
    return (
      <Box sx={{ mt: 10, display: "flex", justifyContent: "center" }}>
        <Typography>Տուրը չի գտնվել</Typography>
      </Box>
    );
  }

  const agencyData = agencyProfile as AgencyProfileData;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Container maxWidth="md" sx={{ mt: 5 }}>
        {agencyData && (
          <Box mt={5} display="flex" alignItems="center" gap={2}>
            <Avatar src={agencyData.avatar} alt={agencyData.companyName} />
            <Box>
              <Typography variant="subtitle1" fontWeight={600}>
                {agencyData.companyName}
              </Typography>
              <Button
                component={RouterLink}
                to={`/agency/${tour.createdBy}`} // предположим у тебя будет страница профиля агентства
                size="small"
                variant="outlined"
                sx={{ mt: 0.5 }}
              >
                Տեսնել գործակալությունը
              </Button>
            </Box>
          </Box>
        )}

        {tour.imageUrl && (
          <Box mb={3}>
            <img
              src={tour.imageUrl}
              alt={tour.name}
              style={{ width: "100%", borderRadius: 8, objectFit: "cover", maxHeight: 400 }}
            />
          </Box>
        )}

        <Typography variant="h4" fontWeight={600} gutterBottom>
          {tour.name}
        </Typography>

        <Typography variant="body1" color="text.secondary" paragraph>
          {tour.description}
        </Typography>

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          {tour.startDate && (
            <Typography variant="body2">
              <strong>Մեկնարկի ամսաթիվ:</strong> {tour.startDate}
            </Typography>
          )}

          {tour.endDate && (
            <Typography variant="body2">
              <strong>Ավարտի ամսաթիվ:</strong> {tour.endDate}
            </Typography>
          )}

          {tour.price && (
            <Typography variant="body2">
              <strong>Գին:</strong> {tour.price} դրամ
            </Typography>
          )}
        </Box>

        <Button variant="outlined" sx={{ mt: 4 }} onClick={() => navigate(-1)}>
          Վերադառնալ
        </Button>
      </Container>
    </motion.div>
  );
};
