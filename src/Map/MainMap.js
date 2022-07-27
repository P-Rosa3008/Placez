import { Box, Card, CardActions } from "@mui/material";
import React, { useState } from "react";
import { SelectOptionsButton } from "../user/components/UserStats/MapCardComponents/SelectOptionsButton";
import Map from "./Map";
export function MainMap(props) {
  const [countries, setCountries] = useState([]);
  const [types, setTypes] = useState([]);

  const handleSelectedCountries = (countries) => {
    setCountries(countries);
  };
  const handleSelectedTypes = (types) => {
    setTypes(types);
  };

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
          markerIsShownGetter={props.markerIsShownGetter}
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
          <SelectOptionsButton
            countries={countries}
            types={types}
            handleSelectedCountries={handleSelectedCountries}
            handleSelectedTypes={handleSelectedTypes}
          />
        </CardActions>
      </Card>
    </Box>
  );
}
