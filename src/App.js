import { MainMap } from "./Map/MainMap";
import React, { useState, useCallback, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import "./App.css";
import themeOptions from "./Layout/Theme";
import { AuthContext } from "./shared/context/auth-context";
import Header from "./Layout/Header/Header";
import Map from "./Map/Map";
import UserProfile from "./user/pages/UserProfile";
import UserPlaces from "./places/pages/UserPlaces";
import CustomDrawer from "./Layout/CustomDrawer";
import SignUp from "./user/pages/SignUp";
import LogIn from "./user/pages/LogIn";
import UserStats from "./user/pages/UserStats";
import { Box, Card, CardActions } from "@mui/material";
import { SelectOptionsButton } from "./user/components/UserStats/MapCardComponents/SelectOptionsButton";

let logoutTimer;

function App() {
  const [allowNewMarker, setAllowNewMarker] = useState();
  const [selected, setSelected] = useState();
  const [markerIsShown, setMarkerIsShown] = useState();
  const [center, setCenter] = useState();

  useEffect(() => {
    document.body.style.overlay = "auto";
  }, []);

  const allowNewMarkerHandler = (isMarkerAllowed) => {
    setAllowNewMarker(isMarkerAllowed);
  };

  const setSelectedHandler = (selected) => {
    setSelected(selected);
  };

  const handleMarkerIsShown = (value) => {
    setMarkerIsShown(value);
  };

  const handleSetCenter = (value) => {
    setCenter(value);
  };

  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [avatar, setAvatar] = useState();

  const login = useCallback(
    (
      userId,
      token,
      email,
      username,
      firstName,
      lastName,
      avatar,
      expirationDate
    ) => {
      setToken(token);
      setUserId(userId);
      setEmail(email);
      setUsername(username);
      setFirstName(firstName);
      setLastName(lastName);
      setAvatar(avatar);

      const tokenExpiration =
        expirationDate || new Date(new Date().getTime() + 1000 * 60 * 360);

      setTokenExpirationDate(tokenExpiration);

      localStorage.setItem(
        "userData",
        JSON.stringify({
          userId: userId,
          token: token,
          email: email,
          username: username,
          firstName: firstName,
          lastName: lastName,
          avatar: avatar,
          expiration: tokenExpiration.toISOString(),
        })
      );
    },
    []
  );

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    setEmail(null);
    setUsername(null);
    setFirstName(null);
    setLastName(null);
    setAvatar(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        storedData.email,
        storedData.username,
        storedData.firstName,
        storedData.lastName,
        storedData.avatar,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  let routes;

  console.log(typeof setSelectedHandler);

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <MainMap
            allowNewMarker={allowNewMarker}
            selectedGetter={setSelectedHandler}
            markerIsShown={markerIsShown}
            selected={selected}
            center={center}
          />
        </Route>
        <Route path="/places/new" exact>
          <MainMap
            allowNewMarker={allowNewMarker}
            selectedGetter={setSelectedHandler}
            markerIsShown={markerIsShown}
            selected={selected}
            center={center}
          />
        </Route>
        <Route path="/:username" exact>
          <CustomDrawer />
        </Route>
        <Route path="/profile/:username" exact>
          <UserProfile />
        </Route>
        <Route path="/stats/:username" exact>
          <UserStats />
        </Route>
        <Route path="/places/:userId" exact>
          <UserPlaces
            selectedGetter={setSelectedHandler}
            markerIsShownGetter={handleMarkerIsShown}
            setCenterGetter={handleSetCenter}
          />
        </Route>
        {/* <Route path="/place/:placeId" exact>
          <MainMap
            allowNewMarker={allowNewMarker}
            selectedGetter={setSelectedHandler}
            markerIsShown={markerIsShown}
            selected={selected}
            center={center}
          />
        </Route> */}
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <MainMap
            allowNewMarker={allowNewMarker}
            selectedGetter={setSelectedHandler}
            markerIsShown={markerIsShown}
            selected={selected}
            center={center}
          />
        </Route>
        <Route path="/places/:userId" exact>
          <UserPlaces
            selectedGetter={setSelectedHandler}
            markerIsShownGetter={handleMarkerIsShown}
          />
        </Route>
        <Route path="/place/:placeId" exact>
          <MainMap
            allowNewMarker={allowNewMarker}
            selectedGetter={setSelectedHandler}
            markerIsShown={markerIsShown}
            selected={selected}
            center={center}
          />
        </Route>
        <Route path="/signup" exact>
          <SignUp />
        </Route>
        <Route path="/login" exact>
          <LogIn />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <ThemeProvider theme={themeOptions}>
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          login: login,
          logout: logout,
          userId: userId,
          token: token,
          email: email,
          username: username,
          firstName: firstName,
          lastName: lastName,
          avatar: avatar,
        }}
      >
        <Router>
          <Header
            allowNewMarker={allowNewMarker}
            isNewMarkerAllowed={allowNewMarkerHandler}
          />
          {routes}
        </Router>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}

export default App;
