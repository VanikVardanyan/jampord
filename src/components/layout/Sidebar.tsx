import { Drawer, List, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes";
import { useAuth } from "@/AppRoutes/AuthContext";
import { useGetProfileQuery } from "../../store/profile/api";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function Sidebar({ open, onClose }: Props) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data } = useGetProfileQuery(user?.uid ?? "", {
    skip: !user?.uid,
  });

  const go = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <List sx={{ width: 250, marginTop: "63px" }}>
        <ListItemButton onClick={() => go(ROUTES.HomePage)}>
          <ListItemText primary="Главная" />
        </ListItemButton>
        <ListItemButton onClick={() => go(ROUTES.tours)}>
          <ListItemText primary="Туры" />
        </ListItemButton>
        {user && (
          <>
            <ListItemButton onClick={() => go(ROUTES.profile)}>
              <ListItemText primary="Профиль" />
            </ListItemButton>
            {data?.role === "agency" && (
              <ListItemButton onClick={() => go(ROUTES.requests)}>
                <ListItemText primary="Запросы" />
              </ListItemButton>
            )}
          </>
        )}
        <ListItemButton onClick={() => go("/about")}>
          <ListItemText primary="О сайте" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}
