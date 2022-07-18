import { Avatar, Box, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ImageUpload from "../../ImageUpload";
import { AuthContext } from "../../shared/context/auth-context";

const UserProfile = () => {
  const auth = useContext(AuthContext);
  const username = useParams().username;

  const [user, setUser] = useState();
  const [image, setImage] = useState();
  const { sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:8080/api/users/${username}`
        );
        setUser(responseData.user);
        // console.log(responseData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPlaces();
  }, [sendRequest, username]);

  const handleImage = async (image) => {
    setImage(image);
    try {
      const formData = new FormData();
      formData.append("image", image);
      console.log(formData);
      await sendRequest(
        `http://localhost:8080/api/users/${username}`,
        "PATCH",
        formData,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box display="flex" flexDirection="column">
      {user ? (
        <Grid container spacing={2}>
          <Grid item>
            <Box paddingX={2} paddingTop={2} paddingBottom={1}>
              <Avatar
                sx={{ position: "relative", height: 200, width: 200 }}
                src={user.avatar ? `http://localhost:8080/${user.avatar}` : ""}
              />
            </Box>
            <Grid item>
              <ImageUpload
                id="image"
                setImage={handleImage}
                image={user.avatar}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Box
                position="absolute"
                paddingTop={4}
                paddingLeft={4}
                width={0.7}
                height={0.5}
              >
                <Grid item xs>
                  <Typography>{user.username}</Typography>
                  <Typography>{user.email}</Typography>
                </Grid>
                <Grid item>
                  <Typography>{user.places.length} Places</Typography>
                </Grid>
                <Box
                  border={1}
                  padding={1}
                  borderRadius={1}
                  borderColor="rgba(0, 0, 0, 0.54)"
                  width={0.5}
                  height={0.5}
                >
                  <Typography>
                    Hi I'm Pedro from Portugal, I love to travel and explore!
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Box paddingLeft="16%">
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default UserProfile;
