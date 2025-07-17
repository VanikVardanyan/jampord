import { Box, Typography, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { useGetToursQuery } from "@/store/tour/api";
import { TourCard } from "../../components/tour-card";

export const ToursPage = () => {
  const { data: tourDetail, isLoading } = useGetToursQuery();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Box sx={{ maxWidth: 800, mx: "auto", mt: 4, p: 2 }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Բոլոր տուրերը
        </Typography>

        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : tourDetail && tourDetail.length > 0 ? (
          tourDetail.map((item) => <TourCard key={item.id} tour={item} />)
        ) : (
          <Typography variant="body2" color="text.secondary">
            Դեռևս հայտեր չկան։
          </Typography>
        )}
      </Box>
    </motion.div>
  );
};
