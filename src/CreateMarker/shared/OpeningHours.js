import {
  Box,
  Checkbox,
  CircularProgress,
  IconButton,
  ListItem,
  ListItemIcon,
  Tooltip,
  Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";

import React, { useState } from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import Monday from "../../icons/monday.png";
import Tuesday from "../../icons/tuesday.png";
import Wednesday from "../../icons/wednesday.png";
import Thursday from "../../icons/thursday.png";
import Friday from "../../icons/friday.png";
import Saturday from "../../icons/saturday.png";
import Sunday from "../../icons/sunday.png";
import HelpTwoToneIcon from "@mui/icons-material/HelpTwoTone";
import { Alert } from "react-bootstrap";

function OpeningHours(props) {
  const daysOfTheWeekSchedule = [
    {
      icon: Monday,
      isClosed: null,
      openingHours: null,
      closingHours: null,
      invalidOpeningHours: null,
      invalidClosingHours: null,
    },
    {
      icon: Tuesday,
      isClosed: null,
      openingHours: null,
      closingHours: null,
      invalidOpeningHours: null,
      invalidClosingHours: null,
    },
    {
      icon: Wednesday,
      isClosed: null,
      openingHours: null,
      closingHours: null,
      invalidOpeningHours: null,
      invalidClosingHours: null,
    },
    {
      icon: Thursday,
      isClosed: null,
      openingHours: null,
      closingHours: null,
      invalidOpeningHours: null,
      invalidClosingHours: null,
    },
    {
      icon: Friday,
      isClosed: null,
      openingHours: null,
      closingHours: null,
      invalidOpeningHours: null,
      invalidClosingHours: null,
    },
    {
      icon: Saturday,
      isClosed: null,
      openingHours: null,
      closingHours: null,
      invalidOpeningHours: null,
      invalidClosingHours: null,
    },
    {
      icon: Sunday,
      isClosed: null,
      openingHours: null,
      closingHours: null,
      invalidOpeningHours: null,
      invalidClosingHours: null,
    },
  ];

  const [timeIsValid, setTimeIsValid] = useState(true);
  // const [open, setOpen] = useState(true);
  const [errorData, setErrorData] = useState();
  const [daysOfWeekData, setDaysOfTheWeekData] = useState(
    daysOfTheWeekSchedule
  );

  const timeHandler = (index, event) => {
    const values = daysOfWeekData;
    const isTimeValid = (time) => {
      const isValid = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(
        time
      );
      if (time.toString().length > 4) {
        return isValid;
      }
      return null;
    };

    if (isTimeValid(event.target.value)) {
      setTimeIsValid(true);
      if (event.target.name === "openinghours") {
        values[index].openingHours = event.target.value;
        values[index].invalidOpeningHours = false;
      }
      if (event.target.name === "closinghours") {
        values[index].closingHours = event.target.value;
        values[index].invalidClosingHours = false;
      }
    } else {
      setTimeIsValid(false);
      if (event.target.name === "openinghours") {
        values[index].openingHours = null;
        values[index].invalidOpeningHours = true;
      }
      if (event.target.name === "closinghours") {
        values[index].closingHours = null;
        values[index].invalidClosingHours = true;
      }
      setErrorData("Time invalid, please check again");
    }
    setDaysOfTheWeekData(values);
  };

  props.openingHoursAdvancedData(daysOfWeekData);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box paddingLeft={1.8} display="inline-block" width="75%">
        <Box display="flex">
          <Typography>Schedule</Typography>
          <Tooltip
            title={
              "Add the opening hours and the closing hours for each day of the week! Example: Open - 09:00 Close - 17:00"
            }
            placement="right"
            arrow
          >
            <IconButton sx={{ padding: 0, marginLeft: 1 }}>
              <HelpTwoToneIcon />
            </IconButton>
          </Tooltip>
        </Box>
        {daysOfTheWeekSchedule.map((day, index) => {
          return (
            <ListItem sx={{ paddingLeft: 0 }}>
              <ListItemIcon>
                <img
                  alt={<CircularProgress />}
                  width="42px !important"
                  src={day.icon}
                />
                <Checkbox></Checkbox>
              </ListItemIcon>
              <Box width="50%">
                <TextField
                  key={index.toString()}
                  id={index.toString()}
                  error={
                    daysOfWeekData[index].invalidOpeningHours === true
                      ? true
                      : false
                  }
                  name="openinghours"
                  placeholder="Open"
                  variant="standard"
                  style={{
                    width: "50px",
                    marginRight: "15%",
                    marginLeft: "5%",
                  }}
                  onChange={(event) => timeHandler(index, event)}
                />
                <TextField
                  key={index.toString() + "closing"}
                  id={index.toString()}
                  error={
                    daysOfWeekData[index].invalidClosingHours === true
                      ? true
                      : false
                  }
                  name="closinghours"
                  placeholder="Close"
                  variant="standard"
                  style={{ width: "50px" }}
                  onChange={(event) => timeHandler(index, event)}
                />
              </Box>
            </ListItem>
          );
        })}
        {!timeIsValid && (
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
                  // setOpen(false);
                  setErrorData(null);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {errorData}
          </Alert>
        )}
      </Box>
    </LocalizationProvider>
  );
}

export default OpeningHours;
