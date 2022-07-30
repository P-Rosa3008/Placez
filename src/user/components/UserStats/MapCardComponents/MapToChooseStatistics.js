import { CircularProgress, Typography } from "@mui/material";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import React, { useCallback, useEffect, useRef, useState } from "react";
import mapStyles from "../../../../Map/mapStyles";
import BetterMarker from "../../../../Map/Markers/BetterMarker";
import MarkerTypes from "../../../../Map/Markers/MarkerTypes";
import { useHttpClient } from "../../../../shared/hooks/http-hook";

export function MapToChooseStatistics(props) {
  const [center, setCenter] = useState({
    lat: 39.353161,
    lng: -8.13946,
  });
  const [markers, setMarkers] = useState();
  const [zoomHasChanged, setZoomHasChanged] = useState(false);

  const { isLoading, sendRequest } = useHttpClient();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/api/places"
        );
        setMarkers(responseData.places);

        if (props.countries.length > 0) {
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

  const mapContainerStyle = {
    width: "100%",
    height: "100%",
  };
  const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
  };

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const handleZoom = () => {
    setZoomHasChanged(true);
  };

  if (zoomHasChanged) {
    setZoomHasChanged();
  }

  const betterMarker = new BetterMarker();

  if (loadError) {
    return "Error";
  }
  if (!isLoaded) {
    return (
      <React.Fragment>
        <div style={{ height: 90 }} />
        <Typography>Loading</Typography>
        <CircularProgress />
      </React.Fragment>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={3}
      center={center}
      options={options}
      onLoad={onMapLoad}
      onZoomChanged={handleZoom}
    >
      {!isLoading &&
        markers &&
        markers.map((marker) => {
          const markerIcon = MarkerTypes(marker.type);
          return betterMarker.createMarker(
            marker.id,
            marker.title,
            marker.type,
            marker.location,
            {
              url: markerIcon,
              scaledSize: new window.google.maps.Size(32.685, 37.7925),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 22.5),
            },
            (event) => {
              setCenter({
                lat: event.latLng.lat() - 0.01,
                lng: event.latLng.lng() + 0.045,
              });
            },
            marker.advancedOptions[0],
            mapRef.current.zoom,
            zoomHasChanged,
            props.countries,
            props.types
          );
        })}
    </GoogleMap>
  );
}
