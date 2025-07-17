import { Box, Typography, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { useGetAllTourRequestsQuery } from "@/store/tour-request/api";
import { TourRequestCard } from "@/components/tour-request-card";

export const RequestsPage = () => {
  const { data: requestDetail, isLoading } = useGetAllTourRequestsQuery();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Box sx={{ maxWidth: 800, mx: "auto", mt: 4, p: 2 }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Բոլոր հայտերը
        </Typography>

        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : requestDetail && requestDetail.length > 0 ? (
          requestDetail.map((item) => <TourRequestCard key={item.id} request={item} />)
        ) : (
          <Typography variant="body2" color="text.secondary">
            Դեռևս հայտեր չկան։
          </Typography>
        )}
      </Box>
    </motion.div>
  );
};
