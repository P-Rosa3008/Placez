import { SelectOptionsButton } from "./MapCardComponents/SelectOptionsButton";
import { MapToChooseStatistics } from "./MapCardComponents/MapToChooseStatistics";
import React, { useState } from "react";
import { Box, Card, CardActions } from "@mui/material";
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

  const getWidthByOrientation = () => {
    if (document.body.clientHeight > document.body.clientWidth) {
      return { width: "100vw" };
    }
    return { width: "74.1vw" };
  };

  return (
    <Box position="relative">
      <Card
        sx={{
          color: "white",
          height: "90.52vh",
          width: getWidthByOrientation(),
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
        </CardActions>
      </Card>
    </Box>
  );
}
