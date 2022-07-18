import React from "react";
import { Typography } from "@mui/material";

export const getToday = (props) => {
  const day = new Date();
  const dayToday = day.getDay();

  const getSchedule = (day) => {
    if (day === 0) {
      return (
        <Typography>
          Schedule: {props.selected.advancedOptions[0].schedule[6].openingHours}
          {props.selected.advancedOptions[0].schedule[6].closingHours}
        </Typography>
      );
    }
    if (day === 1) {
      return (
        <Typography>
          Schedule: {props.selected.advancedOptions[0].schedule[0].openingHours}
          {props.selected.advancedOptions[0].schedule[0].closingHours}
        </Typography>
      );
    }
    if (day === 2) {
      return (
        <Typography>
          Schedule: {props.selected.advancedOptions[0].schedule[1].openingHours}
          {props.selected.advancedOptions[0].schedule[1].closingHours}
        </Typography>
      );
    }
    if (day === 3) {
      return (
        <Typography>
          Schedule: {props.selected.advancedOptions[0].schedule[2].openingHours}
          {props.selected.advancedOptions[0].schedule[2].closingHours}
        </Typography>
      );
    }
    if (day === 4) {
      return (
        <Typography>
          Schedule: {props.selected.advancedOptions[0].schedule[3].openingHours}
          {props.selected.advancedOptions[0].schedule[3].closingHours}
        </Typography>
      );
    }
    if (day === 5) {
      return (
        <Typography>
          Schedule: {props.selected.advancedOptions[0].schedule[4].openingHours}
          {props.selected.advancedOptions[0].schedule[4].closingHours}
        </Typography>
      );
    }
    if (day === 6) {
      return (
        <Typography>
          Schedule: {props.selected.advancedOptions[0].schedule[5].openingHours}
          {props.selected.advancedOptions[0].schedule[5].closingHours}
        </Typography>
      );
    }
  };
  return { getSchedule, dayToday };
};
