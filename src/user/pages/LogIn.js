import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Collapse,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState, useContext, useEffect } from "react";
import { Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

function LogIn() {
  const auth = useContext(AuthContext);

  let history = useHistory();

  const [errorData, setErrorData] = useState();
  const [open, setOpen] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formState, setFormState] = useState();
  const { isLoading, error, sendRequest } = useHttpClient();

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const formState = {
      email: { value: email, isValid: false },
      password: { value: password, isValid: false },
    };

    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/api/users/login",
        "POST",
        JSON.stringify({
          email: formState.email.value,
          password: formState.password.value,
        }),
        { "Content-Type": "application/json" }
      );
      setFormState(formState);
      auth.login(
        responseData.userId,
        responseData.token,
        responseData.email,
        responseData.username,
        responseData.firstName,
        responseData.lastName,
        responseData.avatar
      );
      history.push("/");
    } catch (err) {
      setErrorData(err.message);
      setOpen(true);
      console.log(err);
    }
  };

  useEffect(() => {}, [document.body.clientHeight, document.body.clientWidth]);

  const isPortraitMode = () => {
    return document.body.clientHeight > document.body.clientWidth;
  };

  return (
    <React.Fragment>
      {error && (
        <Collapse in={open}>
          <Alert
            severity="error"
            variant="filled"
            sx={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                  setErrorData(null);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {errorData}
          </Alert>
        </Collapse>
      )}
      <Container
        maxWidth={isPortraitMode() ? "90%" : "33.3%"}
        display="block"
        boxSizing="border-box"
        marginLeft="auto"
        marginRight="auto"
        sx={{ width: isPortraitMode() ? "90%" : "33.3%" }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Avatar
            sx={{
              marginTop: 4,
              marginBottom: 2,
              backgroundColor: "secondary.main",
            }}
          ></Avatar>
          <Typography variant="h2" fontWeight="400" color="text.primary">
            Log In
          </Typography>
          {isLoading && <CircularProgress />}
          <Form style={{ width: "100%", marginTop: 24 }} autoComplete="off">
            <Grid
              container
              sx={{
                width: "calc(100%+16px)",
                display: "flex",
                flexWrap: "wrap",
                boxSizing: "border-box",
              }}
              xs={12}
            >
              <Grid
                item
                xs={12}
                paddingTop={1}
                paddingBottom={1}
                sx={{ flexGrow: 0, maxWidth: "100%", flexBasis: "100%" }}
              >
                <Form.Group>
                  <TextField
                    id="email"
                    name="email"
                    label="Email Address"
                    variant="outlined"
                    sx={{
                      width: "100%",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "gray",
                        },
                        "&:hover fieldset": {
                          borderColor: "gray",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "gray",
                        },
                      },
                    }}
                    onChange={handleEmail}
                  ></TextField>
                </Form.Group>
              </Grid>
              <Grid
                item
                xs={12}
                paddingTop={1}
                paddingBottom={1}
                sx={{ flexGrow: 0, maxWidth: "100%", flexBasis: "100%" }}
              >
                <Form.Group>
                  <TextField
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    variant="outlined"
                    sx={{
                      width: "100%",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "gray",
                        },
                        "&:hover fieldset": {
                          borderColor: "gray",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "gray",
                        },
                      },
                    }}
                    onChange={handlePassword}
                  ></TextField>
                </Form.Group>
              </Grid>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                sx={{ margin: "24px 0px 16px", paddingY: 1 }}
                type="submit"
                value="Submit"
                onClick={onSubmitHandler}
              >
                Log In
              </Button>
              <Grid item xs={12}>
                <Link
                  to="/signup"
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  <Typography variant="body2" color="primary">
                    Don't have an account? Sign up
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Form>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default LogIn;
