import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontWeight: 500,
    marginBottom: "4px",
    fontSize: 14,
    color: "#333",
  },
  root: {
    fontSize: 16,
    margin: 0,
  },
  helperText: {
    marginTop: "4px",
    fontSize: 12,
    color: "#666",
  },
  error: {
    color: "#d32f2f",
  },
}));
