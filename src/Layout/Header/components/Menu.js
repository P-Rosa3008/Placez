import React, { useEffect, useState, useContext } from "react";
import {
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu as MenuMUI,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

import { AuthContext } from "../../../shared/context/auth-context";

function Menu(props) {
  const [isLoading, setIsLoading] = useState(false);
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (!auth) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [auth]);

  return (
    <MenuMUI
      open={props.open}
      anchorEl={props.anchorEl}
      onClose={props.closeMenu}
      PaperProps={{
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          marginTop: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            marginLeft: -0.5,
            marginRight: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 18,
            height: 18,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <List>
        <ListItem alignItems="flex-start">
          {isLoading && <CircularProgress />}
          {!isLoading && (
            <ListItemText
              primary={auth.username}
              secondary={
                <React.Fragment>
                  <Typography sx={{ display: "inline" }} component="span">
                    {auth.email}
                  </Typography>
                </React.Fragment>
              }
            ></ListItemText>
          )}
        </ListItem>
        <Divider component="li" />
      </List>
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
      <Link style={{ color: "inherit", textDecoration: "inherit" }} to="/">
        <ListItemButton sx={{ height: 48 }} onClick={props.handleLogOut}>
          <LogoutRoundedIcon />
          <Typography sx={{ paddingLeft: 1 }} variant="button">
            Log Out
          </Typography>{" "}
        </ListItemButton>
      </Link>
    </MenuMUI>
  );
}

export default Menu;
