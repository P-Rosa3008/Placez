import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import mapStyles from "./mapStyles";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Modal from "../Layout/Modal";
import CreateMarker from "../CreateMarker/CreateMarker";
import BetterMarker from "./Markers/BetterMarker";
import { useHttpClient } from "../shared/hooks/http-hook";
import { useHistory } from "react-router-dom";
import MarkerTypes from "./Markers/MarkerTypes";
import { CircularProgress, Typography } from "@mui/material";

function Map(props) {
  const [center, setCenter] = useState({ lat: 39.353161, lng: -8.13946 });
  const [latLng, setLatLng] = useState({ lat: null, lng: null });
  const [markers, setMarkers] = useState();
  const [selected, setSelected] = useState(false);
  const [markerIsShown, setMarkerIsShown] = useState();
  const [newMarker, setNewMarker] = useState(false);
  const [showCreateMarker, setShowCreateMarker] = useState(false);
  const [allowNewMarker, setAllowNewMarker] = useState(false);
  const [edited, setEdited] = useState();
  const [zoomHasChanged, setZoomHasChanged] = useState(false);
  const { isLoading, sendRequest } = useHttpClient();

  const history = useHistory();

  console.log(props);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:8080/api/places"
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

  useEffect(() => {
    if (props.markerIsShown && props.selected) {
      setCenter(props.center);
    }
  }, []); //check this if center error

  const showModalHandler = () => {
    setMarkerIsShown(true);
  };

  const hideModalHandler = () => {
    setMarkerIsShown(false);
    history.push("/");
  };

  const showCreateMarkerHandler = () => {
    setShowCreateMarker(true);
  };

  const hideCreateMarkerHandler = () => {
    setShowCreateMarker(false);
  };

  const setEditedHandler = (edited) => {
    setEdited(!edited);
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

  const handleZoom = () => {
    setZoomHasChanged(true);
  };

  if (zoomHasChanged) {
    setZoomHasChanged();
  }

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

  const betterMarker = new BetterMarker();
  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={13}
      center={center}
      options={options}
      onClick={onMapClick}
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
              setSelected(marker);
              setCenter({
                lat: event.latLng.lat() - 0.01,
                lng: event.latLng.lng() + 0.045,
              });
              console.log(props);
              props.selectedGetter(marker);
              setMarkerIsShown(true);
            },
            marker.advancedOptions[0],
            mapRef.current ? mapRef.current.zoom : 3,
            zoomHasChanged,
            props.countries ? props.countries : 0,
            props.types ? props.types : 0
          );
        })}

      {newMarker && showCreateMarker && allowNewMarker && (
        <CreateMarker
          onClose={hideCreateMarkerHandler}
          onLatLng={latLng}
          newMarker={newMarker}
        />
      )}
      {markerIsShown === true || props.markerIsShown === true
        ? (console.log(markerIsShown),
          (
            <Modal
              onCloseModal={hideModalHandler}
              selected={selected || props.selected}
              currentName={selected?.title || props.selected.title}
              currentType={selected?.type || props.selected.type}
              setEdited={setEditedHandler}
            ></Modal>
          ))
        : null}
    </GoogleMap>
  );
}

export default Map;
