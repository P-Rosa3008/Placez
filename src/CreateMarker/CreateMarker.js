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
import { setRegion } from "react-geocode";

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
        sx={{
          paddingTop: 1.5,
          paddingLeft: 0,
          paddingRight: 1.5,
          paddingBottom: 0,
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
              <TextField
                id="name"
                type="text"
                label="Enter Name"
                variant="outlined"
                onChange={handleTitle}
                sx={{ minWidth: 0.49, mr: "10px" }}
              ></TextField>
              <Box sx={{ minWidth: 0.49, mr: 3 }}>
                <Form.Group>
                  <ClickAwayListener onClickAway={handleDrawerClose}>
                    <FormControl
                      sx={{
                        my: 1,
                        minWidth: "100%",
                      }}
                    >
                      <Button
                        variant="outlined"
                        sx={{
                          height: "57.44px",
                          borderWidth: "1px",
                          borderColor: "rgba(0, 0, 0, 0.54)",
                          color: "rgba(0,0,0,0.54)",
                          fontSize: "17px",
                          fontWeight: "300",
                          textTransform: "none",
                          "&:hover": { backgroundColor: "white" },
                        }}
                        onClick={handleDrawerOpen}
                      >
                        {type ? type : " Choose Type"}
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
                </Form.Group>
              </Box>
            </Box>
            <DescriptionOption handleInputChange={handleDescription} />
            <ImageUpload id="image" setImage={handleImage} />
            {/* <Button
              onClick={handleInsertAdvancedOptions}
              sx={{ "&:hover": { backgroundColor: "transparent" } }}
            >
              <Switch
                checked={insertAdvancedOptions || advancedOptionsChoosed}
                onChange={handleInsertAdvancedOptions}
              />
              Advanced options
            </Button> */}
          </Container>
          {insertAdvancedOptions && closeModal ? (
            <ChooseAdvancedOptions
              open={insertAdvancedOptions}
              handleCloseChildModal={closeChildModal}
              advancedOptionsChoosedValues={handleAdvancedOptionsChoosedValues}
              advancedOptionsChoosed={handleAdvancedOptionsChoosed}
            />
          ) : null}
          {advancedOptionsChoosed ? (
            <Box sx={{ overflow: "auto", maxHeight: "300px" }}>
              <AdvancedOptions
                type={type}
                advancedOptionsObjectData={advancedOptions}
                advancedOptionsData={handleAdvancedOptionsData}
                advancedOptionsChoosedValues={advancedOptionsChoosedValues}
              />
            </Box>
          ) : null}
        </Form>
      </CardContent>
      <CardActions sx={{ paddingBottom: 1, paddingLeft: 2, paddingTop: 4 }}>
        <Button type="submit" value="Submit" onClick={submitHandler}>
          {isLoading ? <CircularProgress /> : "Submit"}
        </Button>
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
