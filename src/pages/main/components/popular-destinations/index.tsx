import { Box, Typography, Grid, Card, CardMedia, CardContent } from "@mui/material";
import { destinations } from "./mock";

export const PopularDestinations = () => {
  return (
    <Box sx={{ my: 6 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Popular Destinations
      </Typography>
      <Grid container spacing={2}>
        {destinations.map((dest) => (
          <Grid component="div" size={{ xs: 6, sm: 4, md: 2 }} key={dest.title}>
            <Card>
              <CardMedia image={dest.image} title={dest.title} sx={{ height: 140 }} />
              <CardContent>
                <Typography variant="subtitle1">{dest.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {dest.location}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
