import { Box, Card, CardActions } from "@mui/material";
import React, { useState } from "react";
import { SelectOptionsButton } from "../user/components/UserStats/MapCardComponents/SelectOptionsButton";
import Map from "./Map";
export function MainMap(props) {
  const [countriesArray, setCountries] = useState([]);
  const [typesArray, setTypes] = useState([]);

  const handleSelectedCountries = (countries) => {
    if (countries !== countriesArray) {
      setCountries(countries);
    }
  };
  const handleSelectedTypes = (types) => {
    if (types !== typesArray) {
      setTypes(types);
    }
  };

  return (
    <Box position="relative">
      <Card
        sx={{
          color: "white",
          height: "90.48vh",
          width: "100vw",
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}
      >
        <Map
          allowNewMarker={props.allowNewMarker}
          selectedGetter={props.selectedGetter}
          markerIsShown={props.markerIsShown}
          markerIsShownGetter={props.markerIsShownGetter}
          selected={props.selected}
          center={props.center}
          countries={countriesArray}
          types={typesArray}
        />
        <CardActions
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
          }}
        >
          <SelectOptionsButton
            countries={countriesArray}
            types={typesArray}
            handleSelectedCountries={handleSelectedCountries}
            handleSelectedTypes={handleSelectedTypes}
          />
        </CardActions>
      </Card>
    </Box>
  );
}
