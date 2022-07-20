import {
  Avatar,
  Box,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ImageUpload from "../../ImageUpload";
import { AuthContext } from "../../shared/context/auth-context";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import EmailRoundedIcon from "@mui/icons-material/AlternateEmailRounded";

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
    <Box>
      {user ? (
        <Container
          maxWidth="33.3%"
          display="block"
          boxSizing="border-box"
          marginLeft="auto"
          marginRight="auto"
          sx={{ width: "33.3%", paddingTop: 4 }}
        >
          <Box display="flex" alignItems="center" flexDirection="column">
            <Box position="relative" height="250px" width="250px">
              <Avatar
                sx={{
                  position: "relative",
                  height: 250,
                  width: 250,
                  marginBottom: 2,
                }}
                src={user.avatar ? `http://localhost:8080/${user.avatar}` : ""}
              />
              <Box>
                <ImageUpload
                  id="image"
                  component="user-profile-image"
                  setImage={handleImage}
                  image={user.avatar}
                />
              </Box>
            </Box>
            <Box>
              <Box
                sx={{
                  width: 527,
                  borderColor: "black",
                  alignItems: "center",
                  marginTop: 4,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "75%",
                    backgroundColor: "rgba(20,33,61,0.15)",
                    margin: "auto",
                    borderRadius: 2,
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: "rgba(20,33,61,1)",
                      borderTopLeftRadius: 8,
                      borderBottomLeftRadius: 8,
                    }}
                  >
                    <PersonRoundedIcon
                      fontSize="large"
                      sx={{ color: "white", marginX: 0.5 }}
                    />
                  </Box>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: "500",
                      paddingLeft: 2,
                    }}
                  >
                    {user.username}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "75%",
                    backgroundColor: "rgba(20,33,61,0.15)",
                    margin: "auto",
                    borderRadius: 2,
                    marginTop: 2,
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: "rgba(20,33,61,1)",
                      borderTopLeftRadius: 8,
                      borderBottomLeftRadius: 8,
                    }}
                  >
                    <EmailRoundedIcon
                      fontSize="large"
                      sx={{ color: "white", marginX: 0.5 }}
                    />
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: "500",
                      paddingLeft: 2,
                    }}
                  >
                    {user.email}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      ) : (
        //           <Typography>{user.places.length} Places</Typography>
        <Box paddingLeft="16%">
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default UserProfile;
