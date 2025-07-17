import { Box, Typography, Card, CardContent, CardActions, Button, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import { TourDataType } from "@/store/tour/types";
import { ROUTES } from "@/routes";

type Props = {
  tour: TourDataType;
  onDelete?: (id: string) => void;
  isMyTour?: boolean;
};

export const TourCard = ({ tour, onDelete, isMyTour = false }: Props) => {
  return (
    <Card sx={{ maxWidth: 345, borderRadius: 3, boxShadow: 3 }}>
      {tour.imageUrl ? (
        <CardMedia component="img" height="180" image={tour.imageUrl} alt={tour.name} sx={{ objectFit: "cover" }} />
      ) : (
        <Box sx={{ height: 180, bgcolor: "grey.200", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Typography variant="subtitle1" color="text.secondary">
            No Image
          </Typography>
        </Box>
      )}

      <CardContent>
        <Typography variant="h6" gutterBottom noWrap>
          {tour.name}
        </Typography>

        <Typography variant="body2" color="text.secondary" noWrap>
          {tour.description}
        </Typography>

        <Box mt={2}>
          <Typography variant="caption" color="text.secondary">
            {tour.startDate} — {tour.endDate}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between", p: 2 }}>
        <Button component={Link} to={`/tour/${tour.id}`} size="small" variant="contained" color="primary">
          Դիտել
        </Button>

        {isMyTour && (
          <Box display="flex" gap={1}>
            <Button
              component={Link}
              to={`${ROUTES.editTour}/${tour.id}`} // добавили переход на редактирование
              size="small"
              variant="outlined"
              color="primary"
            >
              Խմբագրել
            </Button>

            {onDelete && (
              <Button size="small" variant="outlined" color="error" onClick={() => onDelete(tour.id!)}>
                Ջնջել
              </Button>
            )}
          </Box>
        )}
      </CardActions>
    </Card>
  );
};
