import { Box } from "@mui/material";
import { Header } from "./Header";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { Outlet } from "react-router-dom";

type Props = {
  children?: React.ReactNode;
};

export const AppLayout = ({ children = <Outlet /> }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Box display="flex" flexDirection="column" height="100vh" overflow="hidden">
      <Header onMenuClick={() => setOpen(true)} />
      <Sidebar open={open} onClose={() => setOpen(false)} />

      <Box component="main" flexGrow={1} overflow="auto" p={2} sx={{ backgroundColor: "#f9f9f9" }}>
        {children}
      </Box>
    </Box>
  );
};
