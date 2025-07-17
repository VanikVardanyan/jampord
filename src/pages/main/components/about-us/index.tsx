import { Box, Typography, Button, CardMedia } from "@mui/material";
import Grid from "@mui/material/Grid";

export const AboutUs = () => {
  return (
    <Box sx={{ my: 8 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        About Us
      </Typography>
      <Grid container component="div" spacing={4}>
        <Grid component="div" size={{ xs: 12, sm: 6 }}>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sagittis turpis sit amet felis feugiat
            tristique.
          </Typography>
          <Button variant="contained" color="primary">
            Read more
          </Button>
        </Grid>
        <Grid component="div" size={{ xs: 12, sm: 6 }}>
          <CardMedia component="img" image="/images/about-us.jpg" alt="About us" sx={{ borderRadius: 2 }} />
        </Grid>
      </Grid>
    </Box>
  );
};
