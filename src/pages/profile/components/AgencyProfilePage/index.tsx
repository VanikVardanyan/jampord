import { Box, Typography, Avatar, Grid, Button, Paper, Link, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { useAuth } from "@/AppRoutes/AuthContext";
import { useGetProfileQuery } from "@/store/profile/api";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay"; // TikTok
import { useDeleteTourMutation, useGetMyToursQuery } from "@/store/tour/api";
import { TourCard } from "@/components/tour-card";
import { ROUTES } from "@/routes";
import { useNavigate } from "react-router-dom";
import { AgencyProfileData } from "@/types";

export const AgencyProfilePage = () => {
  const { user } = useAuth();
  const userId = user?.uid;
  const [removeTour] = useDeleteTourMutation();
  const navigate = useNavigate();

  const { data: myTours, isLoading: isToursLoading } = useGetMyToursQuery(userId || "");

  const { data: profile, isLoading: ispProfileLoading } = useGetProfileQuery(userId!, {
    skip: !userId,
  });

  if (ispProfileLoading || !profile) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <Typography>{ispProfileLoading ? "Загрузка профиля..." : "Профиль не найден"}</Typography>
      </Box>
    );
  }
  const agency = profile as AgencyProfileData;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Box sx={{ bgcolor: "#fafafa", pb: 4 }}>
        <Box
          sx={{
            height: 200,
            bgcolor: "#ddd",
            backgroundImage: agency.avatar || "url(/images/default.jpg)",
            backgroundSize: "cover",
            position: "relative",
            borderRadius: "8px",
          }}
        >
          <Avatar
            src={agency.avatar || "/images/default.jpg"}
            alt={agency.companyName}
            sx={{
              width: 120,
              height: 120,
              border: "4px solid white",
              position: "absolute",
              bottom: -60,
              left: 32,
            }}
          />
        </Box>
        <Box sx={{ pl: 32 / 8, mt: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box>
            <Typography variant="h5" fontWeight={600}>
              {agency.companyName}
            </Typography>
            <Typography color="text.secondary">Տուրիստական գործակալություն</Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 1, pr: 2 }}>
            <Button variant="outlined" color="primary" onClick={() => navigate(ROUTES.editProfile)}>
              Հետ կապ հաստատել
            </Button>
          </Box>
        </Box>

        <Grid container spacing={3} sx={{ mt: 2, px: 4 }}>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <Grid>
              <Paper variant="outlined" sx={{ p: 2, height: "100%" }}>
                <Box display="flex" alignItems="center" mb={1} gap={1}>
                  <LocationOnIcon fontSize="small" color="action" />
                  <Typography variant="body2">{agency.country}</Typography>
                </Box>

                <Box display="flex" alignItems="center" mb={1} gap={1}>
                  <EmailIcon fontSize="small" color="action" />
                  <Typography variant="body2">{user?.email}</Typography>
                </Box>

                <Box display="flex" alignItems="center" mb={1} gap={1}>
                  <PhoneIcon fontSize="small" color="action" />
                  <Typography variant="body2">{agency.phone}</Typography>
                </Box>

                {agency.fb && (
                  <Box display="flex" alignItems="center" mb={1} gap={1}>
                    <FacebookIcon fontSize="small" color="action" />
                    <Link href={agency.fb} target="_blank" rel="noopener" underline="hover">
                      Facebook
                    </Link>
                  </Box>
                )}
                {agency.instagram && (
                  <Box display="flex" alignItems="center" mb={1} gap={1}>
                    <InstagramIcon fontSize="small" color="action" />
                    <Link href={agency.instagram} target="_blank" rel="noopener" underline="hover">
                      Instagram
                    </Link>
                  </Box>
                )}
                {agency.telegram && (
                  <Box display="flex" alignItems="center" mb={1} gap={1}>
                    <TelegramIcon fontSize="small" color="action" />
                    <Link href={agency.telegram} target="_blank" rel="noopener" underline="hover">
                      Telegram
                    </Link>
                  </Box>
                )}
                {agency.tiktok && (
                  <Box display="flex" alignItems="center" mb={1} gap={1}>
                    <SmartDisplayIcon fontSize="small" color="action" />
                    <Link href={agency.tiktok} target="_blank" rel="noopener" underline="hover">
                      TikTok
                    </Link>
                  </Box>
                )}
              </Paper>
            </Grid>

            <Grid sx={{ width: { xs: "100%", md: "50%" } }}>
              <Paper variant="outlined" sx={{ p: 2, height: "100%" }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Մեր մասին
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {agency.about}
                </Typography>
              </Paper>
            </Grid>
          </Box>

          {isToursLoading ? (
            <Grid sx={{ width: "100%" }}>
              <Paper
                variant="outlined"
                sx={{
                  p: 4,
                  minHeight: 300,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h6" fontWeight={600} mb={2}>
                  Տուրեր
                </Typography>
                <CircularProgress color="primary" />
                <Typography variant="body2" color="text.secondary" mt={2}>
                  Տուրեր բեռնվում են...
                </Typography>
              </Paper>
            </Grid>
          ) : (
            <Grid sx={{ xs: 12, width: "100%" }}>
              <Paper variant="outlined" sx={{ p: 2, minHeight: 300 }}>
                <Box display="flex" justifyContent="flex-end" mb={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(ROUTES.createTour)}
                    sx={{ textTransform: "none", borderRadius: 3 }}
                  >
                    Ավելացնել Տուր
                  </Button>
                </Box>
                <Typography variant="h6" fontWeight={600} mb={2}>
                  Մեր Տուրերը
                </Typography>

                {myTours && myTours.length > 0 ? (
                  <Grid container spacing={2}>
                    {myTours.map((tour) => (
                      <Grid
                        key={tour.id}
                        sx={{
                          width: {
                            xs: "100%", // 1 колонка на мобилке
                            sm: "50%", // 2 колонки на tablet
                            md: "33.33%", // 3 колонки на desktop
                          },
                        }}
                      >
                        <TourCard
                          key={tour.id}
                          tour={tour}
                          isMyTour
                          onDelete={(id) => {
                            removeTour(id);
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Տուրեր չկան
                  </Typography>
                )}
              </Paper>
            </Grid>
          )}
        </Grid>
      </Box>
    </motion.div>
  );
};

export default AgencyProfilePage;
