import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Chip,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import { SpringGrid, layout, measureItems } from "react-stonecutter";
import { Link, useHistory, useParams } from "react-router-dom";
import { types } from "../../CreateMarker/components/Types";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useEffect } from "react";

function PlaceList(props) {
  const userId = useParams().userId;
  const auth = useContext(AuthContext);

  const { isLoading, sendRequest } = useHttpClient();
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState();
  const [placeId, setPlaceId] = useState();

  const history = useHistory();

  const places = props.items;

  useEffect(() => {}, [showConfirmDeleteModal]);

  if (places?.length === 0) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "40vh",
          display: "block",
          position: "relative",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          You have no places
        </Typography>
        <Link
          to="/"
          style={{
            color: "inherit",
            textDecoration: "inherit",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            endIcon={<OpenInNewRoundedIcon />}
            sx={{
              position: "absolute",
              top: "70%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          >
            Create some!
          </Button>
        </Link>
      </Box>
    );
  }

  const defaultItemHeight = 200;

  const Grid = measureItems(SpringGrid, { measureImages: true });

  console.log(showConfirmDeleteModal);

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
        img.src = image;

        const showDeleteWarningHandler = () => {
          setShowConfirmDeleteModal(true);
        };

        const cancelDeleteHandler = () => {
          setShowConfirmDeleteModal(false);
        };

        const confirmDeleteHandler = async () => {
          setShowConfirmDeleteModal(false);
          try {
            await sendRequest(
              `${process.env.REACT_APP_BACKEND_URL}/api/places/${place.id}`,
              "DELETE",
              {},
              {
                Authorization: "Bearer " + auth.token,
              }
            );
            props.onDelete(place.id);
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
                    image={image}
                    onClick={() => {
                      props.selectedGetter(place);
                      history.push(`/place/${place.id}`);
                    }}
                  ></CardMedia>
                </Box>
                {userId === auth.userId ? (
                  isLoading ? (
                    <CircularProgress
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                      }}
                    />
                  ) : showConfirmDeleteModal === true ? (
                    <Chip
                      sx={{ position: "absolute", top: 8, right: 4 }}
                      label={
                        <Box display="flex" maxHeight="20px">
                          <Box>Delete place?</Box>
                          <IconButton
                            size="small"
                            sx={{
                              "&:hover": {
                                backgroundColor: "transparent",
                              },
                            }}
                            onClick={confirmDeleteHandler}
                          >
                            <CheckRoundedIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            sx={{
                              "&:hover": {
                                backgroundColor: "transparent",
                              },
                            }}
                            onClick={cancelDeleteHandler}
                          >
                            <CloseRoundedIcon />
                          </IconButton>
                        </Box>
                      }
                      color="error"
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
                      onClick={showDeleteWarningHandler}
                    >
                      <DeleteForeverRoundedIcon />
                    </IconButton>
                  )
                ) : null}

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
          </li>
        );
      })}
    </Grid>
  );
}

export default PlaceList;
