import { Typography } from "@mui/material";
// import { useLayoutStyles } from "./styles";
// import { PopularDestinations } from "./components/popular-destinations";
// import { HotelsAndRestaurants } from "./components/hotels-restaurants";
// import { TravelTips } from "./components/travel-tips";
// import { Activities } from "./components/activities";
// import { AboutUs } from "./components/about-us";

export const HomePage = () => {
  // const classes = useLayoutStyles();

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
        padding: "20px",
      }}
    >
      <Typography
        sx={{
          fontFamily: "Montserratarm-Bold",
          fontSize: { xs: "32px", md: "48px" },
          color: "white",
          textAlign: "center",
          marginBottom: "24px",
        }}
      >
        Շուտով
      </Typography>
      <Typography
        sx={{
          fontFamily: "Montserratarm-Medium",
          fontSize: { xs: "24px", md: "32px" },
          color: "white",
          textAlign: "center",
          maxWidth: "800px",
          lineHeight: 1.5,
        }}
      >
        Մենք աշխատում ենք ձեզ համար նոր և հետաքրքիր տուրիստական հարթակ ստեղծելու ուղղությամբ
      </Typography>
      <Typography
        sx={{
          fontFamily: "Montserratarm-Regular",
          fontSize: { xs: "18px", md: "24px" },
          color: "rgba(255, 255, 255, 0.8)",
          textAlign: "center",
          marginTop: "16px",
        }}
      >
        Jampord.am
      </Typography>
    </div>
  );

  /* Закомментированный оригинальный код
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
            Երազի՛ր, պլանավորի՛ր <br />
            Jampord.am-ի հետ։
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
  */
};
