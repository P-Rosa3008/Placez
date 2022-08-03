import React, { useState, useContext, useEffect } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  ListItemButton,
  Toolbar,
  Typography,
} from "@mui/material";
import NewMarkerButton from "./components/NewMarkerButton";
import Menu from "./components/Menu";
import { Link } from "react-router-dom";
import { AuthContext } from "../../shared/context/auth-context";
// import SearchBar from "./components/SearchBar";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import NewMarkerButtonIcon from "./components/NewmarkerButtonIcon";

function Header(props) {
  const auth = useContext(AuthContext);
  const [allowNewMarker, setAllowNewMarker] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

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

  useEffect(() => {}, [document.body.clientWidth]);

  const isFullHD = () => {
    return document.body.clientWidth > 1800;
  };

  const isPortraitMode = () => {
    return document.body.clientHeight > document.body.clientWidth;
  };

  const getNewMarkerButton = () => {
    return isPortraitMode() === false ? (
      <NewMarkerButton
        allowNewMarker={props.allowNewMarker}
        onClick={allowNewMarkerHandler}
      />
    ) : (
      <NewMarkerButtonIcon
        allowNewMarker={props.allowNewMarker}
        onClick={allowNewMarkerHandler}
      />
    );
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        height: "9.48vh",
        width: "100vw",
        display: "flex",
        alignContent: "stretch",
      }}
    >
      <Toolbar
        sx={{
          minHeight: "9.48vh !important",
          maxWidth: "100%",
        }}
      >
        <Link
          to="/"
          onClick={() => {
            setAllowNewMarkerFalse();
          }}
          style={{ color: "inherit", textDecoration: "inherit" }}
        >
          <Typography
            // variant={isPortraitMode() ? "h3" : "h1"}
            variant={"h1"}
            component="div"
            fontWeight="bold"
          >
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
              {!isPortraitMode() && (
                <Typography sx={{ paddingLeft: 1 }} variant="button">
                  My Places
                </Typography>
              )}
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
              {!isPortraitMode() && (
                <Typography sx={{ paddingLeft: 1 }} variant="button">
                  Dashboard
                </Typography>
              )}
            </ListItemButton>
          </Link>
        )}
        {auth.isLoggedIn && (
          <Link
            to={props.allowNewMarker ? "/" : "/"}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            {getNewMarkerButton()}
          </Link>
        )}
        {!auth.isLoggedIn ? (
          <Link
            to="/login"
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <Button
              size={isFullHD() ? "large" : "medium"}
              variant="contained"
              color="secondary"
            >
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
  );
}

export default Header;
