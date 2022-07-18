import React from "react";
import { Box, ImageList, ImageListItem } from "@mui/material";

function ModalImages(props) {
  return (
    <Box
      sx={{
        width: 0.95,
        height: 140,
        overflowY: "scroll",
        margin: "0 auto",
      }}
    >
      <ImageList sx={{ height: 1, width: 1 }} cols={4}>
        {props.items?.map((item, index) => (
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
        <Box
          sx={{
            height: 1,
            width: 1,
            backgroundColor: "rgba(220,220,220,0.9)",
            borderRadius: 2,
          }}
        ></Box>
      </ImageList>
    </Box>
  );
}

export default ModalImages;
