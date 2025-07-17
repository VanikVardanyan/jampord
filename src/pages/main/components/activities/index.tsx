import { Box, Typography, Grid, Card, CardMedia, CardContent } from "@mui/material";
import { activities } from "./mock";

export const Activities = () => {
  return (
    <Box sx={{ my: 6 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Activities
      </Typography>
      <Grid container spacing={2}>
        {activities.map((activity) => (
          <Grid component="div" size={{ xs: 12, sm: 6 }} key={activity.name}>
            <Card>
              <CardMedia image={activity.image} title={activity.name} sx={{ height: 140 }} />
              <CardContent>
                <Typography align="center">{activity.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
