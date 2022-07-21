import React from "react";
import { Box, IconButton, ImageList, ImageListItem } from "@mui/material";
import ImageUpload from "../ImageUpload";

function ModalImages(props) {
  return (
    <Box
      sx={{
        width: 0.95,
        height: 140,
        margin: "0 auto",
      }}
    >
      <ImageList sx={{ height: 1, width: 1 }} cols={4}>
        {props.items.length <= 3 ? (
          <ImageUpload
            id="image"
            component="marker-modal"
            setImage={props.handleImage}
          ></ImageUpload>
        ) : null}
        {props.items?.slice(0, 4).map((item, index) => (
          <ImageListItem
            key={item.img}
            sx={{ "& .MuiImageListItem-img": { height: 0 }, borderRadius: 1 }}
          >
            <img
              style={{ borderRadius: "8px" }}
              height="100px"
              width="100px"
              src={`http://localhost:8080/${item}`}
              srcSet={`http://localhost:8080/${item}`}
              alt={item}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

export default ModalImages;
