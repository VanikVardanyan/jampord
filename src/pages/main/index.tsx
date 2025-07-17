import { Typography } from "@mui/material";
import { useLayoutStyles } from "./styles";
import { PopularDestinations } from "./components/popular-destinations";
import { HotelsAndRestaurants } from "./components/hotels-restaurants";
import { TravelTips } from "./components/travel-tips";
import { Activities } from "./components/activities";
import { AboutUs } from "./components/about-us";

export const HomePage = () => {
  const classes = useLayoutStyles();
  return (
    <div>
      <div className={classes.root}>
        <div className={classes.headerBG}>
          <Typography
            sx={{
              fontFamily: "Bainsley",
              fontSize: "48px",
              color: "white",
              fontStyle: "italic",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Երազի՛ր, պլանավորի՛ր <br /> Trippply-ի հետ։
          </Typography>
        </div>
      </div>

      <div>
        <PopularDestinations />
        <HotelsAndRestaurants />
        <TravelTips />
        <Activities />
        <AboutUs />
      </div>
    </div>
  );
};
