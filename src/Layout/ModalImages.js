import React, { useContext, useEffect } from "react";
import { Box, ImageList, ImageListItem } from "@mui/material";
import ImageUpload from "../ImageUpload";
import { AuthContext } from "../shared/context/auth-context";

function ModalImages(props) {
  const auth = useContext(AuthContext);

  useEffect(() => {}, [document.body.clientHeight, document.body.clientWidth]);

  const isPortraitMode = () => {
    return document.body.clientHeight > document.body.clientWidth;
  };

  let image = new Image();

  return (
    <Box
      sx={{
        width: 0.95,
        height: isPortraitMode() ? 91 : 140,
        margin: "0 auto",
      }}
    >
      <ImageList sx={{ height: 1, width: 1 }} cols={4}>
        {props.items.length <= 3 && auth.isLoggedIn ? (
          <ImageUpload
            id="image"
            component="marker-modal"
            setImage={props.handleImage}
          ></ImageUpload>
        ) : null}
        {props.items?.slice(0, 4).map((item, index) => {
          image.src = item;
          console.log(item);
          return (
            <ImageListItem
              key={item.img}
              sx={{
                "& .MuiImageListItem-img": { height: 0 },
                borderRadius: 1,
              }}
            >
              <img
                key={"image" + index}
                style={{ borderRadius: "8px" }}
                height="100px"
                width="100px"
                src={item}
                srcSet={item}
                alt={item}
                loading="lazy"
              />
            </ImageListItem>
          );
        })}
      </ImageList>
    </Box>
  );
}

export default ModalImages;
