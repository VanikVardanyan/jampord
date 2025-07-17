import { Box, Card, CardContent, Typography, Button, CardActions } from "@mui/material";
import { TourRequestData, TourRequestType } from "@/store/tour-request/types";
import { useAuth } from "@/AppRoutes/AuthContext";
import { Link } from "react-router-dom";

type Props = {
  request: TourRequestData;
  onDelete?: (id: string) => void;
  onEdit?: (id: string, type: TourRequestType) => void;
};

export const TourRequestCard = ({ request, onDelete, onEdit }: Props) => {
  const { user } = useAuth();
  const isMyRequest = request.createdBy === user?.uid;

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {request.type === "classic" ? "Դասական տուր" : "Ժամանցային տուր"}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Մարդիկ՝ {request.peopleCount}
        </Typography>

        {request.type === "classic" && (
          <>
            {request.type === "classic" && (
              <>
                {"country" in request && request.country && (
                  <Typography variant="body2" color="text.secondary">
                    Երկիր՝ {request.country}
                  </Typography>
                )}
                {"city" in request && request.city && (
                  <Typography variant="body2" color="text.secondary">
                    Քաղաք՝ {request.city}
                  </Typography>
                )}
              </>
            )}
          </>
        )}

        {request.type === "entertainment" && "activityType" in request && (
          <Typography variant="body2" color="text.secondary">
            Տեսակը՝ {request.activityType}
          </Typography>
        )}

        <Box mt={1}>
          <Typography variant="body2">{request.description}</Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
        <Button component={Link} to={`/tour-request/${request.id}`} variant="contained" size="small">
          Դիտել
        </Button>

        {isMyRequest ? (
          <Box display="flex" gap={1}>
            <Button variant="outlined" size="small" onClick={() => onEdit?.(request.id!, request.type)}>
              Խմբագրել
            </Button>
            <Button variant="outlined" size="small" color="error" onClick={() => onDelete?.(request.id!)}>
              Ջնջել
            </Button>
          </Box>
        ) : (
          <Button variant="outlined" size="small" color="success">
            Արձագանքել
          </Button>
        )}
      </CardActions>
    </Card>
  );
};
