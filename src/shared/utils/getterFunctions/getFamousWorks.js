import React from "react";
import { Typography } from "@mui/material";

function getFamousWorks(props) {
  return () => {
    return (
      <Typography>
        {props.selected.advancedOptions[0].famousWorks ? (
          <ul>
            {props.selected.advancedOptions[0].famousWorks.firstWork ? (
              <li>{props.selected.advancedOptions[0].famousWorks.firstWork}</li>
            ) : null}
            {props.selected.advancedOptions[0].famousWorks.secondWork ? (
              <li>
                {props.selected.advancedOptions[0].famousWorks.secondWork}
              </li>
            ) : null}
            {props.selected.advancedOptions[0].famousWorks.thirdWork ? (
              <li>{props.selected.advancedOptions[0].famousWorks.thirdWork}</li>
            ) : null}
          </ul>
        ) : null}
      </Typography>
    );
  };
}
