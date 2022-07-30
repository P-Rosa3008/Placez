import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";

import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import { useHttpClient } from "../../../../shared/hooks/http-hook";
import { useJSONToExcel } from "../../../../shared/utils/statisticsUtils/hooks/ useJSONToExcel-hook";

export function DownloadXLSXButton(props) {
  const [markers, setMarkers] = useState();

  const { convertJSONToExcel } = useJSONToExcel();

  const { sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/api/places/jsonToExcel"
        );
        if (props.countries.length === 0 && props.types.length === 0) {
          const formatedJSON = responseData.places.map((place) => {
            return {
              lat: place.location.lat,
              lng: place.location.lng,
              title: place.title,
              type: place.type,
              description: place.description,
              advancedOptions: place.advancedOptions,
              region: place.region,
              country: place.country,
            };
          });

          setMarkers(formatedJSON);
        }
        if (props.countries > 0) {
          const countries = responseData.places.map((p) => p.country);

          const possibleOccurrences = [...new Set(countries)];

          const countriesBothSelectedAndAvailable = possibleOccurrences.filter(
            (element) => props.countries.includes(element)
          );

          const markersFiltered = responseData.places.filter((place) =>
            countriesBothSelectedAndAvailable.includes(place.country)
          );

          setMarkers(markersFiltered);
        }
        if (props.types.length > 0) {
          const types = responseData.places.map((p) => p.type);

          const possibleOccurrences = [...new Set(types)];

          const typesBothSelectedAndAvailable = possibleOccurrences.filter(
            (element) => props.types.includes(element)
          );

          const markersFiltered = responseData.places.filter((place) =>
            typesBothSelectedAndAvailable.includes(place.type)
          );

          setMarkers(markersFiltered);
        }
        if (props.countries.length > 0 && props.types.length > 0) {
          const countries = responseData.places.map((p) => p.country);
          const types = responseData.places.map((p) => p.type);

          const possibleOccurrencesCountries = [...new Set(countries)];
          const possibleOccurrencesTypes = [...new Set(types)];

          const countriesBothSelectedAndAvailable =
            possibleOccurrencesCountries.filter((element) =>
              props.countries.includes(element)
            );

          const typesBothSelectedAndAvailable = possibleOccurrencesTypes.filter(
            (element) => props.types.includes(element)
          );

          const markersFiltered = responseData.places.filter((place) =>
            countriesBothSelectedAndAvailable.includes(place.country)
          );

          const markersFilteredByCountryAndType = markersFiltered.filter(
            (place) => typesBothSelectedAndAvailable.includes(place.type)
          );

          setMarkers(markersFilteredByCountryAndType);
        }
      } catch (err) {}
    };

    fetchPlaces();
  }, [sendRequest, props.countries, props.types]);

  return (
    <Button
      variant="contained"
      color="secondary"
      endIcon={<DownloadRoundedIcon />}
      onClick={convertJSONToExcel.bind(this, markers)}
    >
      Download CSV
    </Button>
  );
}
