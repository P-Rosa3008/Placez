import { Box, Button } from "@mui/material";
import React, { useRef, useState } from "react";

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

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Button onClick={pickImageHandler}>
        {props.image ? "Change Picture" : "Upload an image"}
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

export default ImageUpload;
