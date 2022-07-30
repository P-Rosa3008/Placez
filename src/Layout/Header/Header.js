import React, { useState, useContext, useEffect } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  ListItemButton,
  Toolbar,
  Typography,
} from "@mui/material";
import NewMarkerButton from "./components/NewMarkerButton";
import Menu from "./components/Menu";
import { Link } from "react-router-dom";
import { AuthContext } from "../../shared/context/auth-context";
import SearchBar from "./components/SearchBar";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";

import { faker } from "@faker-js/faker";
import { useHttpClient } from "../../shared/hooks/http-hook";

function Header(props) {
  faker.locale = "pt_PT";

  const { isLoading, error, sendRequest } = useHttpClient();

  const auth = useContext(AuthContext);
  const [allowNewMarker, setAllowNewMarker] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    setAnchorEl(null);
    auth.logout();
  };

  const allowNewMarkerHandler = () => {
    if (!allowNewMarker) {
      setAllowNewMarker(true);
    }
    if (allowNewMarker) {
      setAllowNewMarker(false);
    }
  };

  const setAllowNewMarkerFalse = () => {
    setAllowNewMarker(false);
  };

  props.isNewMarkerAllowed(allowNewMarker);

  useEffect(() => {
    const createUser = async () => {
      const username = faker.internet.userName();
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const email = faker.internet.email();
      const password = faker.internet.password();
      const avatar = faker.internet.avatar();

      const user = { username, firstName, lastName, email, password, avatar };

      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/api/users/signup",
          "POST",
          JSON.stringify({
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            password: user.password,
            avatar: user.avatar,
          }),
          { "Content-Type": "application/json" }
        );
      } catch (err) {}
    };
  }, []);

  return (
    <Box>
      <AppBar
        position="sticky"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Link
            to="/"
            onClick={() => {
              setAllowNewMarkerFalse();
            }}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <Typography variant="h1" component="div" fontWeight="bold">
              PlaceZ
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 0.05 }} />
          {/* <SearchBar /> */}
          <Box sx={{ flexGrow: 0.95 }} />
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
          {auth.isLoggedIn && (
            <Link
              to={props.allowNewMarker ? "/" : "/"}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <NewMarkerButton
                allowNewMarker={props.allowNewMarker}
                onClick={allowNewMarkerHandler}
              />
            </Link>
          )}
          {!auth.isLoggedIn ? (
            <Link
              to="/login"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <Button variant="contained" color="secondary">
                Log in / Sign up
              </Button>
            </Link>
          ) : (
            <Link
              style={{ color: "inherit", textDecoration: "inherit" }}
              to={`/profile/${auth.username}`}
            >
              <IconButton>
                <Avatar
                  src={
                    auth.avatar
                      ? `${process.env.REACT_APP_BACKEND_URL}/${auth.avatar}`
                      : ""
                  }
                />
              </IconButton>
            </Link>
          )}
          <Menu
            open={open}
            anchorEl={anchorEl}
            closeMenu={closeMenu}
            handleLogOut={handleLogOut}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
