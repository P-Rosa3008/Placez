import React, { useState, useContext } from "react";
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
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import EmailRoundedIcon from "@mui/icons-material/AlternateEmailRounded";
import KeyRoundedIcon from "@mui/icons-material/VpnKeyRounded";
import CloseIcon from "@mui/icons-material/Close";
import { Form } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import validator from "validator";

import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

function SignUp() {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest } = useHttpClient();
  const [errorData, setErrorData] = useState();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formState, setFormState] = useState();
  const [submitWasPressed, setSubmitWasPressed] = useState(false);
  const [open, setOpen] = useState(true);

  let history = useHistory();

  const handleFirstName = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastName = (event) => {
    setLastName(event.target.value);
  };

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const emailIsValid = () => {
    const emailValidator = validator.isEmail(email);
    return emailValidator;
  };

  const passwordIsValid = () => {
    const passwordValidator = validator.isStrongPassword(password);
    return passwordValidator;
  };

  const handleFormIsValid = () => {
    return emailIsValid() && passwordIsValid();
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setSubmitWasPressed(true);
    if (handleFormIsValid() === true) {
      const formStateValid = {
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: { value: email.toLowerCase(), isValid: false },
        password: { value: password, isValid: false },
      };
      setFormState(formStateValid);

      try {
        const responseData = await sendRequest(
          "http://localhost:8080/api/users/signup",
          "POST",
          JSON.stringify({
            firstName: formStateValid.firstName,
            lastName: formStateValid.lastName,
            username: formStateValid.username,
            email: formStateValid.email.value,
            password: formStateValid.password.value,
          }),
          { "Content-Type": "application/json" }
        );
        auth.login(
          responseData.userId,
          responseData.token,
          responseData.email,
          responseData.username,
          responseData.firstName,
          responseData.lastName
        );
        history.push("/");
      } catch (err) {
        setErrorData(err.message);
        setOpen(true);
      }
    }
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
        maxWidth="33.3%"
        display="block"
        boxSizing="border-box"
        marginLeft="auto"
        marginRight="auto"
        sx={{ width: "33.3%" }}
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
            Sign Up
          </Typography>
          {isLoading && <CircularProgress />}
          <Form
            onSubmit={onSubmitHandler}
            style={{ width: "100%", marginTop: 24 }}
          >
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
                sm={6}
                paddingTop={1}
                paddingBottom={1}
                paddingRight={1}
                sx={{ flexGrow: 0, maxWidth: "50%", flexBasis: "50%" }}
              >
                <TextField
                  id="first name"
                  label="First Name"
                  variant="outlined"
                  sx={{
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
                  onChange={handleFirstName}
                ></TextField>
              </Grid>
              <Grid item sm={6} paddingTop={1} paddingBottom={1}>
                <TextField
                  id="last name"
                  label="Last Name"
                  variant="outlined"
                  sx={{
                    borderColor: "red !important",
                    borderWidth: "1px",
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
                  onChange={handleLastName}
                ></TextField>
              </Grid>
              <Grid
                item
                xs={12}
                paddingTop={1}
                paddingBottom={1}
                sx={{ flexGrow: 0, maxWidth: "100%", flexBasis: "100%" }}
              >
                <TextField
                  required
                  id="username"
                  label="Username"
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
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonRoundedIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={handleUsername}
                ></TextField>
              </Grid>
              <Grid
                item
                xs={12}
                paddingTop={1}
                paddingBottom={1}
                sx={{ flexGrow: 0, maxWidth: "100%", flexBasis: "100%" }}
              >
                <TextField
                  required
                  id="email"
                  label="Email Address"
                  variant="outlined"
                  error={!emailIsValid() && submitWasPressed}
                  helperText={
                    !emailIsValid() && submitWasPressed
                      ? "Please enter valid email"
                      : null
                  }
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
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailRoundedIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={handleEmail}
                ></TextField>
              </Grid>
              <Grid
                item
                xs={12}
                paddingTop={1}
                paddingBottom={1}
                sx={{ flexGrow: 0, maxWidth: "100%", flexBasis: "100%" }}
              >
                <TextField
                  required
                  id="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  error={!passwordIsValid() && submitWasPressed}
                  helperText={
                    !passwordIsValid() && submitWasPressed
                      ? "Please enter valid password"
                      : null
                  }
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
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <KeyRoundedIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={handlePassword}
                ></TextField>
              </Grid>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                type="submit"
                sx={{ margin: "24px 0px 16px", paddingY: 1 }}
              >
                Sign Up
              </Button>
              <Grid item xs={12}>
                <Link
                  to="/login"
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  <Typography variant="body2" color="primary">
                    Already have an account? Log in
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

export default SignUp;
