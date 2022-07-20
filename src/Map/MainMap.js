import { Box, Card, CardActions } from "@mui/material";
import React, { useState } from "react";
import { SelectOptionsButton } from "../user/components/UserStats/MapCardComponents/SelectOptionsButton";
import Map from "./Map";
export function MainMap(props) {
  const [countries, setCountries] = useState([]);
  const [types, setTypes] = useState([]);

  console.log(props);

  return (
    <Box position="relative">
      <Card
        sx={{
          color: "white",
          height: "100%",
          width: "100%",
        }}
      >
        <Map
          allowNewMarker={props.allowNewMarker}
          selectedGetter={props.selectedGetter}
          markerIsShown={props.markerIsShown}
          selected={props.selected}
          center={props.center}
          countries={countries}
          types={types}
        />
        <CardActions
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
          }}
        >
          <SelectOptionsButton />
        </CardActions>
      </Card>
    </Box>
  );
}
