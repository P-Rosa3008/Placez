import { SelectOptionsButton } from "./MapCardComponents/SelectOptionsButton";
import { MapToChooseStatistics } from "./MapCardComponents/MapToChooseStatistics";
import React, { useState } from "react";
import { Box, Button, Card, CardActions } from "@mui/material";
import { DownloadXLSXButton } from "./MapCardComponents/DownloadXLSXButton";

export function MapToChooseStatisticsCard() {
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
          width: 1280,
        }}
      >
        <MapToChooseStatistics countries={countries} types={types} />

        <CardActions
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
          }}
        >
          <DownloadXLSXButton countries={countries} types={types} />
          <SelectOptionsButton
            countries={countries}
            types={types}
            handleSelectedCountries={handleSelectedCountries}
            handleSelectedTypes={handleSelectedTypes}
          />
          {/* <Button variant="contained" color="secondary" onClick={handleClick}>
            Hexagonal
          </Button> */}
        </CardActions>
      </Card>
    </Box>
  );
}
