import React from "react";
import {
  Divider,
  Drawer,
  List,
  ListItemButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../shared/context/auth-context";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";

function CustomDrawer() {
  const auth = useContext(AuthContext);
  // console.log(auth);
  return (
    <Drawer
      sx={{
        height: 1,
        width: 0.16,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          height: 1,
          width: 0.16,
          boxSizing: "border-box",
        },
      }}
      open={true}
      variant="permanent"
      anchor="left"
    >
      <Toolbar sx={{ height: 65 }} />
      <List>
        {auth.isLoggedIn && (
          <Link
            style={{ color: "inherit", textDecoration: "inherit" }}
            to={`/profile/${auth.username}`}
          >
            <ListItemButton sx={{ height: 48 }}>
              <AccountCircleRoundedIcon />
              <Typography sx={{ paddingLeft: 1 }} variant="button">
                Profile
              </Typography>
            </ListItemButton>
          </Link>
        )}
        <Divider />
        {auth.isLoggedIn && (
          <Link
            style={{ color: "inherit", textDecoration: "inherit" }}
            to={`/places/${auth.userId}`}
          >
            <ListItemButton sx={{ height: 48 }}>
              <LocationOnRoundedIcon />
              <Typography sx={{ paddingLeft: 1 }} variant="button">
                My Places
              </Typography>
            </ListItemButton>
          </Link>
        )}

        <Divider />
        {auth.isLoggedIn && (
          <Link
            style={{ color: "inherit", textDecoration: "inherit" }}
            to={`/stats/${auth.username}`}
          >
            <ListItemButton sx={{ height: 48 }}>
              <DashboardRoundedIcon />
              <Typography sx={{ paddingLeft: 1 }} variant="button">
                Dashboard
              </Typography>{" "}
            </ListItemButton>
          </Link>
        )}
        <Divider />
      </List>
    </Drawer>
  );
}

export default CustomDrawer;
