import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import mapStyles from "./mapStyles";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Modal from "../Layout/Modal";
import CreateMarker from "../CreateMarker/CreateMarker";
import BetterMarker from "./Markers/BetterMarker";
import { useHttpClient } from "../shared/hooks/http-hook";
import MarkerTypes from "./Markers/MarkerTypes";
import { Box, Chip } from "@mui/material";
import LoadingScreen from "../shared/components/LoadingScreen";

function Map(props) {
  const [center, setCenter] = useState({ lat: 39.353161, lng: -8.13946 });
  const [zoom, setZoom] = useState(13);
  const [latLng, setLatLng] = useState({ lat: null, lng: null });
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(false);
  const [markerIsShown, setMarkerIsShown] = useState();
  const [newMarker, setNewMarker] = useState(false);
  const [showCreateMarker, setShowCreateMarker] = useState(false);
  const [allowNewMarker, setAllowNewMarker] = useState(false);
  const [loadingPlaces, setLoadingPlaces] = useState(true);
  const { isLoading, sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchPlaces = async () => {
      setLoadingPlaces(true);
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/api/places"
        );
        setMarkers(responseData.places);
        setLoadingPlaces(false);

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
          setLoadingPlaces(false);
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
          setLoadingPlaces(false);
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
          setLoadingPlaces(false);
        }
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest, props.countries, props.types]);

  const newPlaceHandler = (bool) => {
    if (bool === true) {
      const fetchPlaces = async () => {
        setLoadingPlaces(true);
        try {
          const responseData = await sendRequest(
            process.env.REACT_APP_BACKEND_URL + "/api/places"
          );
          setMarkers(responseData.places);
          setLoadingPlaces(false);
        } catch (error) {}
      };
      fetchPlaces();
    }
  };

  useEffect(() => {
    if (props.markerIsShown && props.selected) {
      setCenter(props.center);
    }
  }, []);

  const hideModalHandler = () => {
    if (props.markerIsShown) {
      props.markerIsShownGetter(false);
    }

    setMarkerIsShown(false);
  };

  const showCreateMarkerHandler = () => {
    setShowCreateMarker(true);
  };

  const hideCreateMarkerHandler = () => {
    setShowCreateMarker(false);
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const mapContainerStyle = { width: "100vw", height: "93vh" };

  const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
  };

  const mapRef = useRef();

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const onMapClick = useCallback(
    (event) => {
      setAllowNewMarker(props.allowNewMarker);
      setNewMarker(true);
      showCreateMarkerHandler();
      hideModalHandler();
      setLatLng({ lat: event.latLng.lat(), lng: event.latLng.lng() });
      setCenter({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    },
    [props.allowNewMarker]
  );

  const getPlaceModal = () => {
    return (
      <Modal
        onCloseModal={hideModalHandler}
        selected={selected || props.selected}
        currentName={selected?.title || props.selected.title}
        currentType={selected?.type || props.selected.type}
      />
    );
  };

  const getCreateMarker = () => {
    return (
      <CreateMarker
        onClose={hideCreateMarkerHandler}
        onLatLng={latLng}
        newMarker={newMarker}
        newPlaceHandler={newPlaceHandler}
      />
    );
  };

  if (loadError) {
    return "Error";
  }
  if (!isLoaded) {
    return <LoadingScreen />;
  }

  const betterMarker = new BetterMarker();

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={zoom}
      center={center}
      options={options}
      onClick={onMapClick}
      onLoad={onMapLoad}
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
              setZoom(0);
              setSelected(marker);
              setZoom(18);
              setCenter({
                lat: event.latLng.lat(),
                lng: event.latLng.lng() + 0.0015,
              });
              props.selectedGetter(marker);
              setMarkerIsShown(true);
            },
            marker.advancedOptions[0],
            mapRef.current ? mapRef.current.zoom : 3,
            props.countries ? props.countries : 0,
            props.types ? props.types : 0
          );
        })}

      {newMarker && showCreateMarker && allowNewMarker
        ? getCreateMarker()
        : null}
      {markerIsShown === true || props.markerIsShown === true
        ? getPlaceModal()
        : null}

      {loadingPlaces === true ? (
        <Box
          sx={{
            width: "100%",
            height: "40vh",
            display: "block",
            position: "relative",
          }}
        >
          <Chip
            label="Loading places..."
            color="secondary"
            sx={{
              position: "absolute",
              top: "30%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          />
        </Box>
      ) : null}
    </GoogleMap>
  );
}

export default Map;
