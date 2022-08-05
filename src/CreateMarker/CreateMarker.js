import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  ClickAwayListener,
  Collapse,
  Container,
  FormControl,
  IconButton,
  SwipeableDrawer,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Form } from "react-bootstrap";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";
import MenuItemsForChoosingTypes from "./components/MenuItemsForChoosingTypes";
import { useHttpClient } from "../shared/hooks/http-hook";
import { AuthContext } from "../shared/context/auth-context";
import ImageUpload from "../ImageUpload";
import { DescriptionOption } from "./components/DescriptionOption";
import QuestionMark from "../icons/Special Char/symbol_inter.png";

function CreateMarker(props) {
  const [open, setOpen] = useState(true);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [errorData, setErrorData] = useState();
  const [isValid, setIsValid] = useState(true);
  const [title, setTitle] = useState("");
  const [type, setTypeValue] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState();

  const missingData = [];

  const { isLoading, sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);

  useEffect(() => {}, [sendRequest]);

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleTitle = (event) => {
    const name = event.target.value;
    setTitle(name);
    if (name) {
      setIsValid(true);
    }
  };

  const handleType = (type) => {
    setTypeValue(type);
    if (type) {
      setIsValid(true);
    }
  };

  const handleDescription = (event) => {
    const descriptionEvent = event.target.value;
    setDescription(descriptionEvent);
    if (description) {
      setIsValid(true);
    }
  };

  const handleImage = async (image) => {
    setImage(image);
    if (image) {
      setIsValid(true);
    }
  };

  const dataIsMissing = (name, type, description, image) => {
    return (
      name.trim().length === 0 ||
      type.trim().length === 0 ||
      description.trim().length === 0 ||
      !image
    );
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (dataIsMissing(title, type, description, image)) {
      if (!title) {
        missingData.push("name");
      }
      if (!type) {
        missingData.push("type");
      }
      if (!description) {
        missingData.push("description");
      }
      if (!image) {
        missingData.push("image");
      }
      setErrorData(missingData);
      setIsValid(false);
      return;
    }

    let region;
    let country;
    try {
      const responseData = await sendRequest(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${props.onLatLng.lat},${props.onLatLng.lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&language=en`
      );
      region =
        responseData.results[
          responseData.results.length - 2
        ].formatted_address.split(",")[0];
      country =
        responseData.results[responseData.results.length - 1].formatted_address;
    } catch (err) {}

    const modalData = {
      title: title,
      type: type,
      coordinates: { lat: props.onLatLng.lat, lng: props.onLatLng.lng },
      region: region,
      country: country,
      creator: auth.userId,
    };

    console.log(modalData);

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("type", type);
      formData.append("description", description);
      formData.append("advancedOptions", JSON.stringify({}));
      formData.append("coordinates", JSON.stringify(modalData.coordinates));
      formData.append("region", region);
      formData.append("country", country);
      formData.append("creator", auth.userId);
      formData.append("image", image);
      formData.append("date", modalData.date);
      for (var pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/api/places",
        "POST",
        formData,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
    } catch (err) {
      setErrorData(err.message);
    }

    props.onClose();
  };

  return (
    <Card
      sx={{
        position: "absolute",
        top: "45%",
        borderRadius: "8px",
        left: openDrawer ? "35%" : "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: "white",
        boxShadow: 24,
        display: "block",
        maxHeight: "800px",
      }}
    >
      <CardHeader
        title={
          <Typography
            variant="h4"
            color="rgba(46,46,48,255)"
            sx={{ fontWeight: 600, paddingRight: 0 }}
          >
            Create new place
          </Typography>
        }
        sx={{
          paddingTop: 2,
          paddingLeft: 2,
          paddingBottom: 1,
        }}
        action={
          <Button onClick={props.onClose}>
            <CloseIcon />
          </Button>
        }
      />
      <CardContent sx={{ paddingBottom: 1 }}>
        <Form
          onSubmit={submitHandler}
          enctype="multipart/form-data"
          autoComplete="off"
        >
          <Container
            sx={{ "@media (min-width: 600px)": { paddingLeft: 0.5 } }}
            display="block"
            boxSizing="border-box"
            marginLeft="auto"
            marginRight="auto"
          >
            <Box
              display="inline-flex"
              alignItems="center"
              width={1}
              paddingBottom={2}
              alignContent="space-around"
            >
              <Box display="flex">
                <Box>
                  <Typography
                    color="rgba(54,54,54,255)"
                    sx={{ paddingBottom: 1, fontSize: 14, fontWeight: 400 }}
                  >
                    Enter name
                  </Typography>
                  <TextField
                    id="name"
                    type="text"
                    variant="outlined"
                    onChange={handleTitle}
                    inputProps={{
                      style: {
                        fontSize: "20px",
                        fontWeight: "400",
                        color: "rgba(163,163,165,255)",
                      },
                    }}
                    sx={{
                      minWidth: 392,
                      mr: "10px",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "rgba(231,232,235,255)",
                        },
                        "&:hover fieldset": {
                          borderColor: "rgba(200,200,200,255)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "rgba(200,200,200,255)",
                          borderWidth: "1px",
                        },
                      },
                      "& .MuiFormLabel-root": {
                        fontWeight: "400",
                        color: "rgba(163,163,165,255)",
                      },
                      "& .MuiInputLabel-root": {
                        "&.Mui-focused": { color: "transparent" },
                      },
                      "& .css-1z7n62>span": { display: "none" },
                    }}
                  />
                </Box>
                <Box display="flex" alignItems="flex-end">
                  <ClickAwayListener onClickAway={handleDrawerClose}>
                    <FormControl
                      sx={{
                        my: 1,
                        width: type ? "100%" : "",
                        marginBottom: 0,
                        marginTop: 0,
                      }}
                    >
                      <Button
                        variant="outlined"
                        sx={{
                          height: "62px",
                          borderWidth: "1px",
                          borderColor: "rgba(231,232,235,255)",
                          color: "rgba(0,0,0,0.54)",
                          fontSize: "17px",
                          fontWeight: "300",
                          textTransform: "none",
                          "&:hover": {
                            backgroundColor: "white",
                            borderColor: "rgba(200,200,200,255)",
                          },
                        }}
                        onClick={handleDrawerOpen}
                      >
                        {type ? (
                          <Typography
                            variant="h4"
                            fontWeight="400"
                            color="primary"
                          >
                            {type}
                          </Typography>
                        ) : (
                          <img src={QuestionMark} alt="question-mark" />
                        )}
                      </Button>
                      <SwipeableDrawer
                        anchor="right"
                        sx={{
                          "& .MuiBackdrop-root": {
                            backgroundColor: "rgba(0,0,0,0)",
                          },
                          "& .MuiDrawer-paper": {
                            backgroundColor: "rgba(20, 33, 61, 1)",
                          },
                        }}
                        open={openDrawer}
                        onClose={handleDrawerClose}
                      >
                        <Toolbar sx={{ height: 73 }} />
                        <Box sx={{ width: 500, marginLeft: 1 }}>
                          <MenuItemsForChoosingTypes
                            newMarker={props.newMarker}
                            type={handleType}
                            closeDrawer={handleDrawerClose}
                          ></MenuItemsForChoosingTypes>
                        </Box>
                      </SwipeableDrawer>
                    </FormControl>
                  </ClickAwayListener>
                </Box>
              </Box>
            </Box>
            <Box sx={{ width: "465 !important" }}>
              <Typography
                color="rgba(54,54,54,255)"
                variant="caption"
                sx={{ paddingBottom: 1, fontSize: 14, fontWeight: 400 }}
              >
                Description
              </Typography>
              <DescriptionOption handleInputChange={handleDescription} />
            </Box>
            <ImageUpload
              id="image"
              component="create-marker"
              image={image}
              setImage={handleImage}
            />
          </Container>
        </Form>
      </CardContent>
      <CardActions
        sx={{
          paddingBottom: "16px",
          paddingLeft: "20px",
          paddingTop: "32px",
        }}
      >
        <Box height="10px" width="70%" />
        <Box sx={{ backgroundColor: "rgba(253,161,13,1)", borderRadius: 1 }}>
          <Button
            type="submit"
            value="Submit"
            sx={{ textTransform: "none", fontWeight: 600 }}
            onClick={submitHandler}
          >
            {isLoading ? <CircularProgress /> : "Create place"}
          </Button>
        </Box>
      </CardActions>
      {!isValid && (
        <Collapse in={open}>
          <Alert
            severity="error"
            variant="filled"
            sx={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                  setErrorData(null);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {"Missing: " +
              errorData.map((err, index) => {
                const error = err.replaceAll(",", "");
                return index === 0 ? error : " " + error;
              })}
          </Alert>
        </Collapse>
      )}
    </Card>
  );
}

export default CreateMarker;
