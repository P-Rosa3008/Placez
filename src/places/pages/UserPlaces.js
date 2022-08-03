import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";

import PlaceList from "../components/PlaceList";

function UserPlaces(props) {
  const userId = useParams().userId;
  const { isLoading, sendRequest } = useHttpClient();
  const [userPlaces, setUserPlaces] = useState();

  useEffect(() => {
    document.body.style.overflow = "visible";
  }, []);

  const setSelectedHandler = (selected) => {
    if (selected) {
      props.markerIsShownGetter(true);
    }
    props.selectedGetter(selected);
    props.setCenterGetter({
      lat: selected.location.lat - 0.01,
      lng: selected.location.lng + 0.045,
    });
  };

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/places/${userId}/places`
        );
        setUserPlaces(responseData.places);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPlaces();
  }, [sendRequest, userId]);

  const placeDeletedHandler = (deletedPlaceId) => {
    setUserPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place.id !== deletedPlaceId)
    );
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "40vh",
          display: "block",
          position: "relative",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          Loading your places...
        </Typography>
      </Box>
    );
  }

  if (!isLoading && !userPlaces) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "40vh",
          display: "block",
          position: "relative",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          You have no places
        </Typography>
        <Link
          to="/"
          style={{
            color: "inherit",
            textDecoration: "inherit",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            endIcon={<OpenInNewRoundedIcon />}
            sx={{
              position: "absolute",
              top: "70%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          >
            Create some!
          </Button>
        </Link>
      </Box>
    );
  }

  return (
    <Box display="flex">
      <Box padding={3}>
        <PlaceList
          selectedGetter={setSelectedHandler}
          items={userPlaces}
          onDelete={placeDeletedHandler}
        />
      </Box>
    </Box>
  );
}

export default UserPlaces;
