import React, { useContext, useEffect } from "react";
import { Button, Typography } from "@mui/material";

import { Box } from "@mui/system";

import classes from "./Modal.module.css";
import { AuthContext } from "../shared/context/auth-context";
import { useHttpClient } from "../shared/hooks/http-hook";
import ModalImages from "./ModalImages";

function Modal(props) {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();

  // useEffect(() => {
  //   const fetchPlace = async () => {
  //     try {
  //       await sendRequest(
  //         `${process.env.REACT_APP_BACKEND_URL}/api/places/${props.selected.id}`
  //       );
  //     } catch (err) {}
  //   };
  //   fetchPlace();
  // }, [sendRequest, props.selected.id]);

  const handleImage = async (image) => {
    try {
      const formData = new FormData();
      formData.append("image", image);
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/places/images/${props.selected.id}`,
        "PATCH",
        formData,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
    } catch (err) {}
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
          <Typography variant="h1" color="primary" lineHeight="1.2">
            {props.selected.title}
          </Typography>

          <Box sx={{ flexGrow: 0.95 }} />
          <Typography align="right" variant="h2" color="primary">
            {props.selected.type}
          </Typography>
        </Box>

        <Box paddingTop="24px" paddingBottom="24px" display="flex">
          <ModalImages items={props.selected.image} handleImage={handleImage} />
        </Box>
        <Box
          maxHeight="450px"
          marginTop="8px"
          paddingRight="8px"
          overflow="scroll"
        >
          <Typography textAlign="justify" color="primary">
            {props.selected.description}
          </Typography>
        </Box>
      </Box>
    </div>
  );
}

export default Modal;
