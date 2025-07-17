import { Box, Typography, Avatar, Paper, Link, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import { useGetProfileQuery } from "@/store/profile/api";
import { useGetMyToursQuery } from "@/store/tour/api";
import { TourCard } from "@/components/tour-card";
import Grid from "@mui/material/Grid";
import { AgencyProfileData, ROLE } from "../../types";

export const AgencyPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: profile, isLoading: isProfileLoading } = useGetProfileQuery(id!, {
    skip: !id,
  });

  const { data: tours, isLoading: isToursLoading } = useGetMyToursQuery(id!, {
    skip: !id,
  });

  if (isProfileLoading || !profile) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <Typography>{isProfileLoading ? "Բեռնվում է..." : "Գործակալությունը չի գտնվել"}</Typography>
      </Box>
    );
  }

  if (profile.role !== ROLE.AGENCY) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <Typography>Դուք չունեք գործակալության էջ</Typography>
      </Box>
    );
  }

  const agency = profile as AgencyProfileData;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Box sx={{ bgcolor: "#fafafa", pb: 4 }}>
        <Box sx={{ height: 200, bgcolor: "#ddd", position: "relative", borderRadius: "8px" }}>
          <Avatar
            src={profile.avatar}
            alt={agency.companyName}
            sx={{ width: 120, height: 120, border: "4px solid white", position: "absolute", bottom: -60, left: 32 }}
          />
        </Box>

        <Box sx={{ pl: 4, mt: 10 }}>
          <Typography variant="h5" fontWeight={600}>
            {agency.companyName}
          </Typography>
          <Typography color="text.secondary">Տուրիստական գործակալություն</Typography>
        </Box>

        <Grid container spacing={3} sx={{ mt: 2, px: 4 }}>
          <Grid sx={{ xs: 12 }}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Box display="flex" alignItems="center" mb={1} gap={1}>
                <LocationOnIcon fontSize="small" color="action" />
                <Typography variant="body2">{agency.country}</Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={1} gap={1}>
                <EmailIcon fontSize="small" color="action" />
                <Typography variant="body2">agent@example.com</Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={1} gap={1}>
                <PhoneIcon fontSize="small" color="action" />
                <Typography variant="body2">{profile.phone}</Typography>
              </Box>
              {agency.fb && (
                <Box display="flex" alignItems="center" mb={1} gap={1}>
                  <FacebookIcon fontSize="small" color="action" />
                  <Link href={agency.fb} target="_blank" underline="hover">
                    Facebook
                  </Link>
                </Box>
              )}
              {agency.instagram && (
                <Box display="flex" alignItems="center" mb={1} gap={1}>
                  <InstagramIcon fontSize="small" color="action" />
                  <Link href={agency.instagram} target="_blank" underline="hover">
                    Instagram
                  </Link>
                </Box>
              )}
              {agency.telegram && (
                <Box display="flex" alignItems="center" mb={1} gap={1}>
                  <TelegramIcon fontSize="small" color="action" />
                  <Link href={agency.telegram} target="_blank" underline="hover">
                    Telegram
                  </Link>
                </Box>
              )}
              {agency.tiktok && (
                <Box display="flex" alignItems="center" mb={1} gap={1}>
                  <SmartDisplayIcon fontSize="small" color="action" />
                  <Link href={agency.tiktok} target="_blank" underline="hover">
                    TikTok
                  </Link>
                </Box>
              )}
            </Paper>
          </Grid>

          <Grid sx={{ xs: 12 }}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Տուրեր
              </Typography>
              {isToursLoading ? (
                <CircularProgress size={24} />
              ) : tours && tours.length > 0 ? (
                tours.map((tour) => <TourCard key={tour.id} tour={tour} />)
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Տուրեր չկան
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </motion.div>
  );
};
