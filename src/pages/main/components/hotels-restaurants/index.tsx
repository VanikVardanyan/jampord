import { Box, Typography, Grid, Card, CardMedia, CardContent, Rating } from "@mui/material";
import { hotels } from "./mock";

export const HotelsAndRestaurants = () => {
  return (
    <Box sx={{ my: 6 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Hotels and Restaurants
      </Typography>
      <Grid container spacing={3}>
        {hotels.map((hotel) => (
          <Grid component="div" size={{ xs: 12, sm: 6, md: 3 }} key={hotel.name}>
            <Card>
              <CardMedia image={hotel.image} title={hotel.name} sx={{ height: 180 }} />
              <CardContent>
                <Typography variant="subtitle1">{hotel.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {hotel.location}
                </Typography>
                <Rating value={hotel.rating} readOnly size="small" />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
