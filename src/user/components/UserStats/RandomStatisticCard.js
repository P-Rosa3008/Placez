import React from "react";
import { Box, Button, Card, CardActions, CardContent } from "@mui/material";
import { Link } from "react-router-dom";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";

export function RandomStatisticCard(props) {
  return (
    <Card
      sx={{
        height: 200,
        width: 400,
        marginTop: 3,
        marginLeft: 3,
        marginRight: 3,
        borderRadius: 4,
        backgroundColor: "primary.main",
      }}
    >
      <Box display="block" height="100%" position="relative">
        <CardContent>{props.randomCountryStatistic()}</CardContent>{" "}
        <CardActions
          sx={{
            position: "absolute",
            bottom: "0",
            left: "0",
          }}
        >
          {props.randomStatistic.typeAmount < 1 ? (
            <Link
              to="/"
              style={{
                color: "inherit",
                textDecoration: "inherit",
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                endIcon={<OpenInNewRoundedIcon />}
              >
                Help by creating a place
              </Button>
            </Link>
          ) : (
            <Link
              to="/"
              style={{
                color: "inherit",
                textDecoration: "inherit",
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                endIcon={<OpenInNewRoundedIcon />}
              >
                Do you know more?
              </Button>
            </Link>
          )}
        </CardActions>
      </Box>
    </Card>
  );
}
