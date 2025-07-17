import { makeStyles } from "@mui/styles";
import HeaderBG from "./media/header_bg.png";

export const useLayoutStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "24px",
    width: "100%",
  },
  headerBG: {
    height: "530px",
    width: "100%",
    background: `url(${HeaderBG})`,
    backgroundSize: "cover",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "8px",
  },
}));
