import { useContext } from "react";
import { AuthContext } from "../../../context/auth-context";
import { useHttpClient } from "../../../hooks/http-hook";
import React, { useState } from "react";
import { Box, Typography } from "@mui/material";

export const PercentageUserOnTypes = async (props) => {
  const auth = useContext(AuthContext);

  const { sendRequest } = useHttpClient();

  const [percentage, setPercentage] = useState();

  try {
    const responseData = await sendRequest("http://localhost:8080/api/places");
    const responseDataUserPlaces = await sendRequest(
      `http://localhost:8080/api/places/${auth.userId}/places`
    );
    const totalNumberOfPlacesAll = responseData.places.length;
    const totalNumberOfPlacesUser = responseDataUserPlaces.places.length;
    setPercentage(
      ((totalNumberOfPlacesUser / totalNumberOfPlacesAll) * 100).toFixed(2)
    );
    return ((totalNumberOfPlacesUser / totalNumberOfPlacesAll) * 100).toFixed(
      2
    );
  } catch (err) {
    console.log(err);
    return (
      <Box>
        <Typography>You still have no places</Typography>
      </Box>
    );
  }
};
