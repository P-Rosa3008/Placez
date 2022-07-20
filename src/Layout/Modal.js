import React, { useState, useContext, useEffect } from "react";
import { Button, Rating, Typography } from "@mui/material";
import { Form } from "react-bootstrap";
import { Box } from "@mui/system";

import MenuItemsForChoosingTypes from "../CreateMarker/components/MenuItemsForChoosingTypes";
import classes from "./Modal.module.css";
import { AuthContext } from "../shared/context/auth-context";
import { useHttpClient } from "../shared/hooks/http-hook";
import { useHistory, useParams } from "react-router-dom";
import ImageUpload from "../ImageUpload";
import ModalImages from "./ModalImages";

function Modal(props) {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();
  const placeId = useParams().placeId;
  const history = useHistory();

  const [onEdit, setOnEdit] = useState(false);
  const [typeValue, setTypeValue] = useState("");
  const [nameEdited, setNameEdited] = useState("");
  // const [loadedPlace, setLoadedPlace] = useState();
  const [edited, setEdited] = useState(false);
  const [image, setImage] = useState();

  const getFamousWorks = (works) => {
    return (
      <Typography>
        {props.selected.advancedOptions[0].famousWorks ? (
          <ul>
            {props.selected.advancedOptions[0].famousWorks.firstWork ? (
              <li>{props.selected.advancedOptions[0].famousWorks.firstWork}</li>
            ) : null}
            {props.selected.advancedOptions[0].famousWorks.secondWork ? (
              <li>
                {props.selected.advancedOptions[0].famousWorks.secondWork}
              </li>
            ) : null}
            {props.selected.advancedOptions[0].famousWorks.thirdWork ? (
              <li>{props.selected.advancedOptions[0].famousWorks.thirdWork}</li>
            ) : null}
          </ul>
        ) : null}
      </Typography>
    );
  };

  const day = new Date();
  const dayToday = day.getDay();

  const getSchedule = (day) => {
    if (day === 0) {
      return (
        <Typography>
          Schedule: {props.selected.advancedOptions[0].schedule[6].openingHours}
          {props.selected.advancedOptions[0].schedule[6].closingHours}
        </Typography>
      );
    }
    if (day === 1) {
      return (
        <Typography>
          Schedule: {props.selected.advancedOptions[0].schedule[0].openingHours}
          {props.selected.advancedOptions[0].schedule[0].closingHours}
        </Typography>
      );
    }
    if (day === 2) {
      return (
        <Typography>
          Schedule: {props.selected.advancedOptions[0].schedule[1].openingHours}
          {props.selected.advancedOptions[0].schedule[1].closingHours}
        </Typography>
      );
    }
    if (day === 3) {
      return (
        <Typography>
          Schedule: {props.selected.advancedOptions[0].schedule[2].openingHours}
          {props.selected.advancedOptions[0].schedule[2].closingHours}
        </Typography>
      );
    }
    if (day === 4) {
      return (
        <Typography>
          Schedule: {props.selected.advancedOptions[0].schedule[3].openingHours}
          {props.selected.advancedOptions[0].schedule[3].closingHours}
        </Typography>
      );
    }
    if (day === 5) {
      return (
        <Typography>
          Schedule: {props.selected.advancedOptions[0].schedule[4].openingHours}
          {props.selected.advancedOptions[0].schedule[4].closingHours}
        </Typography>
      );
    }
    if (day === 6) {
      return (
        <Typography>
          Schedule: {props.selected.advancedOptions[0].schedule[5].openingHours}
          {props.selected.advancedOptions[0].schedule[5].closingHours}
        </Typography>
      );
    }
  };

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        await sendRequest(`http://localhost:8080/api/places/${placeId}`);
      } catch (err) {}
    };
    fetchPlace();
  }, [sendRequest, placeId]);

  const handleTypeChange = (type) => {
    setTypeValue(type);
  };

  const handleNameChange = (event) => {
    const name = event.target.value;
    setNameEdited(name);
  };

  const wasNotEdited = (name, type) => {
    return name.trim().length === 0 && type.trim().length > 0;
  };

  const nameWasEdited = (name) => {
    return name.trim().length > 0;
  };

  const typeWasEdited = (type) => {
    return type.trim().length > 0;
  };

  const wasEdited = () => {
    return typeWasEdited(typeValue) || nameWasEdited(nameEdited);
  };

  const onEditHandler = () => {
    setOnEdit(!onEdit);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (wasNotEdited(nameEdited, typeValue)) {
      setOnEdit(false);
      return;
    }
    setOnEdit(false);

    if (wasEdited()) {
      props.selected.title = nameEdited;
      props.selected.type = typeValue;
      try {
        await sendRequest(
          `http://localhost:8080/api/places/${placeId}`,
          "PATCH",
          JSON.stringify({ title: nameEdited, type: typeValue }),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        );
        setEdited(true);
        props.setEdited(edited);
        history.push("/");
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  console.log(props.selected.type);

  const handleImage = async (image) => {
    setImage(image);
    try {
      const formData = new FormData();
      formData.append("image", image);
      await sendRequest(
        `http://localhost:8080/api/places/images/${placeId}`,
        "PATCH",
        formData,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
    } catch (err) {
      console.log(err);
      console.log(err.message);
    }
  };

  return (
    <div className={classes.modal}>
      <Box
        sx={{
          flexDirection: "row",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {/* {auth.isLoggedIn ? (
          <Button
            sx={{
              flexFlow: 1,
              backgroundColor: "#FFF",
              "&:hover": {
                backgroundColor: "#FFF",
              },
            }}
            onClick={onEditHandler}
          >
            {onEdit ? "Stop Editing" : "Edit"}
          </Button>
        ) : null} */}
        <Button
          sx={{
            backgroundColor: "#FFF",
            "&:hover": {
              backgroundColor: "#FFF",
            },
          }}
          onClick={props.onCloseModal}
        >
          X
        </Button>
      </Box>

      {onEdit ? (
        <Form>
          <Box sx={{ my: 1, maxWidth: "50%" }}>
            <Form.Group>
              <Form.Control
                id="name"
                type="text"
                size="lg"
                placeholder={props.selected.title}
                onChange={handleNameChange}
              />
            </Form.Group>
          </Box>
          <Box sx={{}}>
            <Form.Group>
              <MenuItemsForChoosingTypes type={handleTypeChange} />
            </Form.Group>
          </Box>

          <Button variant="contained" type="submit" onClick={onSubmitHandler}>
            Submit
          </Button>
        </Form>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "baseline",
            }}
          >
            <Typography variant="h1" color="primary">
              {props.selected.title}
            </Typography>

            <Box sx={{ flexGrow: 0.95 }} />
            <Typography align="right" variant="h2" color="primary">
              {props.selected.type}
            </Typography>
          </Box>
          {/* <Box display="flex">
            <Rating
              sx={{
                "& .MuiRating-decimal": { display: "flex" },
              }}
              value={starRating}
              defaultValue={starRating}
              onChange={handleStarRatingChange}
              icon={<StarRoundedIcon />}
              emptyIcon={<StarRoundedIcon />}
              precision={0.5}
              size="small"
            ></Rating>
          </Box> */}
          <Typography color="primary">
            Description: {props.selected.description}
          </Typography>
          {props.selected.type === "Museum" ? (
            <Box>
              {props.selected.advancedOptions?.map((options, index) => {
                console.log(props.selected.advancedOptions[0].schedule);

                return (
                  <Box>
                    <Box sx={{ display: "flex", alignItems: "baseline" }}>
                      <Typography>
                        Ticket Type:
                        {props.selected.advancedOptions[index].ticketType}
                      </Typography>
                      <Box sx={{ flexGrow: 0.05 }} />
                      <Typography>
                        Price:
                        {props.selected.advancedOptions[index].ticketPrice}€
                      </Typography>
                      <Box sx={{ flexGrow: 0.05 }} />
                    </Box>
                  </Box>
                );
              })}
              {props.selected.advancedOptions[0].schedule
                ? getSchedule(dayToday)
                : null}
              {getFamousWorks()}
            </Box>
          ) : null}
          <Typography>Latitude: {props.selected.location.lat}</Typography>
          <Typography>Longitude: {props.selected.location.lng}</Typography>
          <ImageUpload id="image" setImage={handleImage}></ImageUpload>
          <Box display="flex">
            <ModalImages items={props.selected.image} />
          </Box>
        </Box>
      )}
    </div>
  );
}

export default Modal;
