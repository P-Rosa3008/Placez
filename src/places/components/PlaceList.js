import React, { useState } from "react";
import { Box, Card, CardMedia, Typography } from "@mui/material";
import { SpringGrid, layout, measureItems } from "react-stonecutter";
import { Link, useHistory } from "react-router-dom";
import { types } from "../../CreateMarker/components/Types";

function PlaceList(props) {
  const [center, setCenter] = useState();

  const handleSetCenter = (place) => {
    setCenter({ lat: place.location.lat, lng: place.location.lng });
  };

  const history = useHistory();

  const places = props.items;

  if (places?.length === 0) {
    return (
      <Box>
        <Typography>No places found, create some!</Typography>
      </Box>
    );
  }

  const defaultItemHeight = 200;

  const Grid = measureItems(SpringGrid, { measureImages: true });

  return (
    <Grid
      component="div"
      columns={6}
      columnWidth={250}
      gutterWidth={25}
      gutterHeight={25}
      itemHeight={defaultItemHeight}
      layout={layout.pinterest}
      springConfig={{ stiffness: 170, damping: 26 }}
    >
      {places?.map((place) => {
        const title = place.title;
        const type = place.type;
        const image = place.image[0];

        console.log(type);

        const typeFilter = types.filter((t) => {
          if (type === t.label) {
            return t.path;
          }
        });
        console.log(typeFilter[0].icon);

        let img = new Image();
        img.src = `http://localhost:8080/${image}`;

        return (
          <li
            style={{
              listStyleType: "none",
              position: "relative",
            }}
            key={place.id}
            onClick={() => {
              props.selectedGetter(place);
              handleSetCenter(place);
            }}
          >
            {/* <Link
              style={{ color: "inherit", textDecoration: "inherit" }}
              onClick={() => {
                props.selectedGetter(place);
                handleSetCenter(place);
              }}
            > */}
            <Box>
              <Card
                sx={{
                  maxHeight: 350,
                  maxWidth: 250,
                  backgroundColor: "transparent",
                }}
                key={place.id}
                id={place.id}
                elevation={1}
                onClick={() => {
                  props.selectedGetter(place);
                  history.push(`/place/${place.id}`);
                }}
              >
                <Box position="relative">
                  <CardMedia
                    component="img"
                    image={`http://localhost:8080/${image}`}
                  ></CardMedia>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    backdropFilter: "blur(2px)",
                    bgcolor: "rgba(0, 0, 0, 0.25)",
                    color: "white",
                    padding: "2px",
                    borderTopRightRadius: "16px",
                    webkitTransform: "translate3d(0, 0, 0)",
                    transform: "translate3d(0, 0, 0)",
                  }}
                >
                  <img style={{ padding: 0 }} src={typeFilter[0].path} />
                  <Typography
                    paddingLeft="5px"
                    noWrap
                    fontSize="24"
                    fontWeight="500"
                  >
                    {title}
                  </Typography>
                </Box>
              </Card>
            </Box>
            {/* </Link> */}
          </li>
        );
      })}
    </Grid>
  );
}

export default PlaceList;
