import React, { useContext, useState } from "react";
import {
  Box,
  Card,
  CardMedia,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import { SpringGrid, layout, measureItems } from "react-stonecutter";
import { useHistory, useParams } from "react-router-dom";
import { types } from "../../CreateMarker/components/Types";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

function PlaceList(props) {
  const userId = useParams().userId;
  const auth = useContext(AuthContext);

  const { isLoading, sendRequest } = useHttpClient();
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState();
  const [placeId, setPlaceId] = useState();

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

        const typeFilter = types.filter((t) => {
          if (type === t.label) {
            return t.path;
          }
        });

        let img = new Image();
        img.src = `${process.env.REACT_APP_BACKEND_URL}/${image}`;

        const showDeleteWarningHandler = () => {
          setShowConfirmDeleteModal(true);
        };

        const cancelDeleteHandler = () => {
          setShowConfirmDeleteModal(false);
        };

        const confirmDeleteHandler = async () => {
          setShowConfirmDeleteModal(false);
          try {
            console.log("ola");
            const respondeData = await sendRequest(
              `https://placez-pmbr.herokuapp.com/api/places/${place.id}`,
              "DELETE",
              {},
              {
                Authorization: "Bearer " + auth.token,
              }
            );
            console.log(respondeData);
            console.log("ola2");
            props.onDelete(placeId);
          } catch (err) {
            console.log(err);
          }
        };

        return (
          <li
            style={{
              listStyleType: "none",
              position: "relative",
            }}
            key={place.id}
          >
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
              >
                <Box position="relative">
                  <CardMedia
                    component="img"
                    image={`${process.env.REACT_APP_BACKEND_URL}/${image}`}
                  ></CardMedia>
                </Box>
                <Box>
                  {userId === auth.userId ? (
                    isLoading ? (
                      <CircularProgress
                        sx={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                        }}
                      />
                    ) : (
                      <IconButton
                        sx={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          zIndex: 9,
                          "&:hover": { color: "darkred" },
                        }}
                        onClick={confirmDeleteHandler}
                      >
                        <DeleteForeverRoundedIcon />
                      </IconButton>
                    )
                  ) : null}
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
                    borderTopRightRadius: "12px",
                    borderBottomLeftRadius: "12px",
                    borderBottomRightRadius: "12px",
                    webkitTransform: "translate3d(0, 0, 0)",
                    transform: "translate3d(0, 0, 0)",
                  }}
                  onClick={() => {
                    props.selectedGetter(place);
                    history.push(`/place/${place.id}`);
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
