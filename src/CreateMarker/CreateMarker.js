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
  Switch,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Form } from "react-bootstrap";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";
import MenuItemsForChoosingTypes from "./components/MenuItemsForChoosingTypes";
import AdvancedOptions from "./components/AdvancedOptions";
import { useHttpClient } from "../shared/hooks/http-hook";
import { AuthContext } from "../shared/context/auth-context";
import ImageUpload from "../ImageUpload";
import { DescriptionOption } from "./components/DescriptionOption";
import ChooseAdvancedOptions from "./components/ChooseAdvancedOptions";

import QuestionMark from "../icons/Special Char/symbol_inter.png";

function CreateMarker(props) {
  const [open, setOpen] = useState(true);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [errorData, setErrorData] = useState();
  const [isValid, setIsValid] = useState(true);
  const [title, setTitle] = useState("");
  const [type, setTypeValue] = useState("");
  const [description, setDescription] = useState("");
  const [advancedOptions, setAdvancedOptions] = useState({});
  const [insertAdvancedOptions, setInsertAdvancedOptions] = useState(false);
  const [closeModal, setCloseModal] = useState(true);
  const [advancedOptionsChoosed, setAdvancedOptionsChoosed] = useState(false);
  const [advancedOptionsChoosedValues, setAdvancedOptionsChoosedValues] =
    useState(false);
  const [image, setImage] = useState();
  const [region, setRegion] = useState();
  const [country, setCountry] = useState();

  const missingData = [];

  const { isLoading, error, sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);

  useEffect(() => {}, [sendRequest]);

  const handleDrawerClose = () => {
    setOpenDrawer(false);
    if (!type) {
      setInsertAdvancedOptions(false);
      setAdvancedOptionsChoosed(false);
    }
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

  const handleImage = (image) => {
    setImage(image);
    if (image) {
      setIsValid(true);
    }
  };

  const handleAdvancedOptionsData = (advancedOptionsData) => {
    setAdvancedOptions(advancedOptionsData);

    console.log(advancedOptionsData);
  };

  const handleInsertAdvancedOptions = (value) => {
    setInsertAdvancedOptions(!insertAdvancedOptions);

    if (type.trim().length === 0) {
      missingData.push("You need to choose a type first!");
      setErrorData(missingData);
      setInsertAdvancedOptions(false);
      setIsValid(false);
    }

    if (advancedOptionsChoosed === true) {
      setInsertAdvancedOptions(false);
      setAdvancedOptionsChoosed(false);
    }
    setCloseModal(true);
  };

  const closeChildModal = (value) => {
    if (value === false) {
      setInsertAdvancedOptions(false);
    }
    setCloseModal(value);
  };

  const handleAdvancedOptionsChoosed = (value) => {
    setAdvancedOptionsChoosed(value);
  };

  const handleAdvancedOptionsChoosedValues = (values) => {
    setAdvancedOptionsChoosedValues(values);
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
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${props.onLatLng.lat},${props.onLatLng.lng}&key=AIzaSyCBV5PosZ19R_EBmCdHZNluFe-bzP_fJ3M&language=en`
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
      advancedOptions: advancedOptions,
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

      await sendRequest("http://localhost:8080/api/places", "POST", formData, {
        Authorization: "Bearer " + auth.token,
      });
    } catch (err) {
      setErrorData(err.message);
      console.log(error);
    }

    props.onClose();
  };

  return (
    <Card
      sx={{
        position: "absolute",
        top: "45%",
        left: openDrawer ? "35%" : "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: "white",
        boxShadow: 24,
        display: "block",
        width: "50%",
        maxHeight: "800px",
      }}
    >
      <CardHeader
        title={
          <Typography
            variant="h3"
            color="rgba(46,46,48,255)"
            sx={{ fontWeight: 400 }}
          >
            Create Marker
          </Typography>
        }
        sx={{
          paddingTop: 2,
          paddingLeft: 2,
          paddingRight: 2,
          paddingBottom: 1,
        }}
        action={
          <Button onClick={props.onClose}>
            <CloseIcon />
          </Button>
        }
      />
      <CardContent sx={{ paddingBottom: 1 }}>
        <Form onSubmit={submitHandler} enctype="multipart/form-data">
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
                    sx={{ paddingBottom: 1, fontSize: 18, fontWeight: 400 }}
                  >
                    Enter name
                  </Typography>
                  <TextField
                    id="name"
                    type="text"
                    variant="outlined"
                    label="e.g. Eiffel Tower"
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
                          borderColor: "rgba(231,232,235,255)",
                          borderWidth: "2px",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "rgba(231,232,235,255)",
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
                <Box
                  display="flex"
                  alignItems="flex-end"
                  sx={
                    {
                      // minWidth: 0.49,
                    }
                  }
                >
                  {/* <Form.Group> */}
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
                            borderColor: "rgba(231,232,235,255)",
                            borderWidth: "2px",
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
                  {/* </Form.Group> */}
                </Box>
              </Box>
            </Box>
            <Box>
              <Typography
                color="rgba(54,54,54,255)"
                sx={{ paddingBottom: 1, fontSize: 18, fontWeight: 400 }}
              >
                Description
              </Typography>
              <DescriptionOption handleInputChange={handleDescription} />
            </Box>
          </Container>
        </Form>
      </CardContent>
      <CardActions
        sx={{
          paddingBottom: 1,
          paddingLeft: 2.5,
          paddingTop: 4,
        }}
      >
        <ImageUpload
          id="image"
          component="create-marker"
          setImage={handleImage}
        />
        <Box width="100%" />
        <Box sx={{ backgroundColor: "rgba(253,161,13,1)", borderRadius: 1 }}>
          <Button type="submit" value="Submit" onClick={submitHandler}>
            {isLoading ? <CircularProgress /> : "Submit"}
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
            {"Error: " +
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
