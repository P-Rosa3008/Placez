import { Box, Button, IconButton } from "@mui/material";
import React, { useRef, useState } from "react";
import AddAPhotoRoundedIcon from "@mui/icons-material/AddAPhotoRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

function ImageUpload(props) {
  // const [file, setFile] = useState();
  // const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  const pickedHandler = (event) => {
    let pickedFile;
    // let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      console.log(pickedFile);
      props.setImage(pickedFile);
      setIsValid(true);
      // fileIsValid = true;
    } else {
      setIsValid(false);
      // fileIsValid = false;
    }
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  if (props.component === "user-profile-image") {
    return (
      <Box
        position="absolute"
        right="0"
        top="0"
        sx={{ backgroundColor: "rgba(253,161,13,1)", borderRadius: "50%" }}
      >
        <IconButton aria-label="close" size="medium" color="primary">
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
  } else {
    return (
      <Box
        position="absolute"
        sx={{ backgroundColor: "rgba(253,161,13,1)", borderRadius: 1 }}
      >
        <Button onClick={pickImageHandler}>
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
}

export default ImageUpload;
