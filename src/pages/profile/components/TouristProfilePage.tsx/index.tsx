import {
  Box,
  Typography,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import { useAuth } from "@/AppRoutes/AuthContext";
import { useGetProfileQuery } from "@/store/profile/api";
import { useDeleteTourRequestMutation, useGetMyTourRequestsQuery } from "@/store/tour-request/api";
import { TouristFormData } from "@/components/create-tourist-form/schema";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes";
import { TourRequestCard } from "@/components/tour-request-card";
import { toast } from "react-toastify";
import { TourRequestType } from "@/store/tour-request/types";

export const TouristProfilePage = () => {
  const { user } = useAuth();
  const userId = user?.uid;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [deleteRequest] = useDeleteTourRequestMutation();

  const { data: profile, isLoading } = useGetProfileQuery(userId!, { skip: !userId });
  const { data: myRequests, isLoading: isRequestsLoading } = useGetMyTourRequestsQuery(userId!, {
    skip: !userId,
  });

  if (isLoading || !profile) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <Typography>{isLoading ? "Բեռնվում է..." : "Պրոֆիլը չի գտնվել"}</Typography>
      </Box>
    );
  }

  const handleDelete = async (id: string) => {
    if (!id) return;

    try {
      await deleteRequest(id).unwrap();
      toast.success("Հայտը ջնջվել է");
    } catch {
      toast.error("Սխալ ջնջման ժամանակ");
    }
  };

  const onEdit = (id: string, type: TourRequestType) => {
    if (!id) return;

    if (type === "entertainment") {
      navigate(`${ROUTES.editEntertainmentTourRequest}/${id}`);
    }
    if (type === "classic") {
      navigate(`${ROUTES.editClassicTourRequest}/${id}`);
    }
  };

  const tourist = profile as TouristFormData;

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Box sx={{ maxWidth: 500, mx: "auto", mt: 4, p: 3, boxShadow: 3, borderRadius: 3 }}>
          {tourist.avatar && (
            <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
              <Avatar src={tourist.avatar} alt="Ավատար" sx={{ width: 100, height: 100 }} />
            </Box>
          )}
          <Typography variant="h4" align="center" gutterBottom>
            {tourist.name}
          </Typography>
          <Typography variant="subtitle1" align="center" gutterBottom>
            Հեռախոս՝ {tourist.phone}
          </Typography>
          <Button fullWidth variant="contained" sx={{ mt: 3 }} onClick={() => setOpen(true)}>
            Ստեղծել հայտ
          </Button>
        </Box>
      </motion.div>

      {/* Մոդալ ընտրության համար */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Ընտրեք հայտի տեսակը</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <Button
              variant="outlined"
              onClick={() => {
                setOpen(false);
                navigate(ROUTES.createClassicTourRequest);
              }}
            >
              Դասական արտասահմանյան տուր
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setOpen(false);
                navigate(ROUTES.createEntertainmentTourRequest);
              }}
            >
              Տեղական արկածային տուր
            </Button>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Փակել</Button>
        </DialogActions>
      </Dialog>

      {/* Հայտերի ցուցակ */}
      <Box sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Իմ հայտերը
        </Typography>

        {isRequestsLoading ? (
          <CircularProgress size={24} />
        ) : myRequests && myRequests.length > 0 ? (
          myRequests.map((request) => (
            <TourRequestCard key={request.id} request={request} onDelete={handleDelete} onEdit={onEdit} />
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            Դուք դեռ չունեք հայտեր։
          </Typography>
        )}
      </Box>
    </>
  );
};

export default TouristProfilePage;
