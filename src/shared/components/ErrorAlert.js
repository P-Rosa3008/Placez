import { Alert, AlertTitle } from "@mui/material";

function ErrorAlert(props) {
  return (
    <Alert severity="error" color="error">
      <AlertTitle>Error</AlertTitle>
      {props.children}
    </Alert>
  );
}

export default ErrorAlert;
