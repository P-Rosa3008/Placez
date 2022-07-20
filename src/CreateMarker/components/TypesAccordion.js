import React from "react";
import {
  Accordion,
  AccordionSummary,
  Box,
  Divider,
  MenuItem,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function TypesAccordion(props) {
  return (
    <Accordion
      sx={{
        borderRadius: 1,
        my: 1,
        backgroundColor: "transparent",
        boxShadow: "0",
        "& .MuiAccordionSummary-root": {
          height: "80px",
          backgroundColor: "white",
          borderTopLeftRadius: "6px",
          borderBottomLeftRadius: "6px",
          marginTop: "8px",
          marginBottom: "8px",
          boxShadow:
            "1px 1px 2px 1px rgba(0, 0, 0, 0.2),1px 1px 2px 1px rgba(0, 0, 0, 0.2)",
        },
        "& .MuiMenuItem-root": {
          height: "72px !important",
          width: "100%",
          padding: "0",
          backgroundColor: "transparent",
        },
        "&::before": { height: 0 },
        "& .MuiDivider-root": { marginTop: 0, marginBottom: 0 },
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{props.nicheTitle}</Typography>
      </AccordionSummary>
      {props.niche.map((type, index, items) => {
        return (
          <React.Fragment>
            <MenuItem
              sx={{ width: 0.8, backgroundColor: "transparent" }}
              key={type.key}
              value={type.label}
              onClick={(event) => props.handleType(type.label, event)}
            >
              <Box
                display="flex"
                sx={{
                  width: "20%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(255,255,255,1)",
                  borderTopLeftRadius: "4px",
                  borderBottomLeftRadius: "4px",
                  paddingLeft: "32px",
                }}
              >
                {type.icon}
              </Box>
              <Box
                display="flex"
                sx={{
                  width: "80%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "start",
                  backgroundColor: "white",
                }}
              >
                <label style={{ marginLeft: 16 }}>{type.label}</label>
              </Box>
            </MenuItem>
            {!(index + 1 === items.length) ? (
              <Divider sx={{ my: 0, marginLeft: "40px", color: "lightgray" }} />
            ) : null}
          </React.Fragment>
        );
      })}
    </Accordion>
  );
}

export default TypesAccordion;
