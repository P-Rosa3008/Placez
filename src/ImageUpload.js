import { Box, Button, IconButton } from "@mui/material";
import React, { useRef } from "react";
import AddAPhotoRoundedIcon from "@mui/icons-material/AddAPhotoRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { resizeFile } from "./shared/utils/resizeFile";

function ImageUpload(props) {
  const filePickerRef = useRef();

  const pickedHandler = async (event) => {
    let pickedFileResized;
    if (event.target.files && event.target.files.length === 1) {
      pickedFileResized = await resizeFile(event.target.files[0]);
      props.setImage(pickedFileResized);
    }
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  if (props.component === "user-profile-image") {
    return (
      <Box
        right="0"
        top="0"
        sx={{
          position: "absolute",
          width: 43,
          height: 43,
          backgroundColor: "rgba(253,161,13,1)",
          borderRadius: "50%",
        }}
      >
        <IconButton
          aria-label="close"
          size="medium"
          color="primary"
          onClick={pickImageHandler}
        >
          {props.image ? <EditRoundedIcon /> : <AddAPhotoRoundedIcon />}
        </IconButton>
        <input
          id="image"
          ref={filePickerRef}
          name="image"
          type="file"
          style={{ display: "none" }}
          accept=".jpg,.png,.jpeg"
          onChange={pickedHandler}
        ></input>
      </Box>
    );
  }
  if (props.component === "create-marker") {
    return (
      <Box
        position="absolute"
        sx={{
          border: 1,
          borderRadius: 1,
          borderColor: "rgba(54,54,54,255)",
          marginTop: "8px",
        }}
      >
        <Button sx={{ textTransform: "none" }} onClick={pickImageHandler}>
          {props.image ? "Edit photo" : "Add photo"}
        </Button>
        <input
          id="image"
          ref={filePickerRef}
          name="image"
          type="file"
          style={{ display: "none" }}
          accept=".jpg,.png,.jpeg"
          onChange={pickedHandler}
        ></input>
      </Box>
    );
  }

  if (props.component === "marker-modal") {
    return (
      <Box
        sx={{
          height: 1,
          width: 1,
          backgroundColor: "rgba(220,220,220,0.9)",
          borderRadius: 2,
        }}
      >
        <Button sx={{ width: 1, height: 1 }} onClick={pickImageHandler}>
          <AddRoundedIcon fontSize="large" />
        </Button>
        <input
          id="image"
          ref={filePickerRef}
          name="image"
          type="file"
          style={{ display: "none" }}
          accept=".jpg,.png,.jpeg"
          onChange={pickedHandler}
        ></input>
      </Box>
    );
  }
}

export default ImageUpload;
