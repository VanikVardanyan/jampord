import { Box, Typography, Avatar, Paper, CircularProgress, Button, Divider } from "@mui/material";
import { useParams, Link as RouterLink } from "react-router-dom";
import { useGetTourRequestQuery } from "@/store/tour-request/api";
import { useGetProfileQuery } from "@/store/profile/api";
import { useAuth } from "@/AppRoutes/AuthContext";
import { ClassicTourRequest, EntertainmentTourRequest } from "../../store/tour-request/types";

export const TourRequestPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();

  const { data: request, isLoading } = useGetTourRequestQuery(id!, { skip: !id });
  const { data: authorProfile } = useGetProfileQuery(request?.createdBy ?? "", {
    skip: !request?.createdBy,
  });

  if (isLoading || !request) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  const isMine = user?.uid === request.createdBy;
  console.log(request);
  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          {request.type === "classic" ? "Դասական տուր" : "Արկածային տուր"}
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          {request.description}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {request.type === "classic" ? (
          <>
            <Typography>Երկիր: {(request as ClassicTourRequest).country || "Չնշված"}</Typography>
            <Typography>Քաղաք: {(request as ClassicTourRequest).city || "Չնշված"}</Typography>
            <Typography>Ամսաթիվ: {request.preferredDate}</Typography>
            <Typography>
              Մարդիկ: {request.peopleCount} / Երեխաներ: {(request as ClassicTourRequest).childrenCount}
            </Typography>
            <Typography>Կենդանիներ: {(request as ClassicTourRequest).hasAnimals ? "Այո" : "Ոչ"}</Typography>
            <Typography>Ամսաթվի տևողություն: {(request as ClassicTourRequest).daysCount} օր</Typography>
            <Typography>Վիզայից մերժում: {(request as ClassicTourRequest).hasVisaRejection ? "Այո" : "Ոչ"}</Typography>
            <Typography>Բյուջե: {(request as ClassicTourRequest).budget || "Չնշված"}</Typography>
          </>
        ) : (
          <>
            <Typography>Տեսակ: {(request as EntertainmentTourRequest).activityType}</Typography>
            <Typography>Ամսաթիվ: {request.preferredDate}</Typography>
            <Typography>Մարդկանց քանակ: {request.peopleCount}</Typography>
          </>
        )}

        <Divider sx={{ my: 2 }} />

        {authorProfile && (
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar src={authorProfile.avatar} />
            <Box>
              <Typography>
                Հեղինակ՝
                <RouterLink to={`/agency/${request.createdBy}`}>
                  {/* {authorProfile.name || authorProfile.companyName} */}
                </RouterLink>
              </Typography>
            </Box>
          </Box>
        )}

        {!isMine && (
          <Button fullWidth sx={{ mt: 3 }} variant="contained">
            Օֆֆեր ուղարկել
          </Button>
        )}
      </Paper>
    </Box>
  );
};
