import { Box, Typography, Grid, Card, CardMedia, CardContent } from "@mui/material";
import { travelTips } from "./mock";

export const TravelTips = () => {
  return (
    <Box sx={{ my: 6 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Travel Tips and Advice
      </Typography>
      <Grid container spacing={3}>
        {travelTips.map((tip) => (
          <Grid component="div" size={{ xs: 12, sm: 6 }} key={tip.title}>
            <Card sx={{ display: "flex" }}>
              <CardMedia image={tip.image} sx={{ width: 160 }} />
              <CardContent>
                <Typography variant="h6">{tip.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {tip.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
