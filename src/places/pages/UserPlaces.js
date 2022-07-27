import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";

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
          `http://localhost:8080/api/places/${userId}/places`
        );

        const places = responseData.places;
        setUserPlaces(places);
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest, userId]);

  if (isLoading) {
    return <Typography>Please Wait</Typography>;
  }

  if (!isLoading && userPlaces === 0) {
    return <Typography>You have no places</Typography>;
  }

  return (
    <Box display="flex">
      <Box padding={3}>
        <PlaceList selectedGetter={setSelectedHandler} items={userPlaces} />
      </Box>
    </Box>
  );
}

export default UserPlaces;
