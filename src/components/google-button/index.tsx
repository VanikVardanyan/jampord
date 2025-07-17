import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

type GoogleLoginButtonProps = {
  onClick: () => void;
};

const GoogleLoginButton = ({ onClick }: GoogleLoginButtonProps) => {
  return (
    <Button
      variant="outlined"
      startIcon={<GoogleIcon />}
      onClick={onClick}
      sx={{
        mt: 2,
        color: "#555",
        borderColor: "#ccc",
        textTransform: "none",
        fontWeight: "bold",
        backgroundColor: "white",

        "&:hover": {
          backgroundColor: "#f7f7f7",
          borderColor: "#aaa",
        },
      }}
      fullWidth
    >
      Войти через Google
    </Button>
  );
};

export default GoogleLoginButton;
