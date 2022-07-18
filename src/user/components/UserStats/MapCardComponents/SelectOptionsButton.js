import { TabTypes } from "./TabTypes";
import { TabAToZ } from "./TabAToZ";
import React, { useState } from "react";
import { Box, Button, Menu, Tab } from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { TabContext, TabList, TabPanel } from "@mui/lab";

export function SelectOptionsButton(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [tabIndex, setTabIndex] = useState(1);

  const open = anchorEl;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  const menuSx = {
    width: 410,
    height: 520,
    overflow: "visible",
    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
    mt: 1.5,
    "& .MuiAvatar-root": {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    "&:before": {
      content: '""',
      display: "block",
      position: "absolute",
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: "background.paper",
      transform: "translateY(-50%) rotate(45deg)",
      zIndex: 0,
    },
  };

  return (
    <Box sx={{ marginLeft: 2 }}>
      <Button
        sx={{
          width: "0px",
          height: "32px",
        }}
        variant="contained"
        color="secondary"
        onClick={handleClick}
      >
        <MenuRoundedIcon />
      </Button>
      <Menu
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        PaperProps={{
          elevation: 0,
          sx: menuSx,
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <TabContext value={tabIndex}>
          <TabList
            variant="scrollable"
            scrollButtons="auto"
            onChange={handleChange}
          >
            <Tab value="1" label="Country" sx={{ width: "50%" }}></Tab>
            <Tab value="2" label="Type" sx={{ width: "50%" }}></Tab>
          </TabList>
          <TabPanel
            value="1"
            sx={{
              paddingTop: 1,
              paddingBottom: 0,
              paddingLeft: 0,
              paddingRight: 0,
            }}
          >
            <TabAToZ handleSelectedCountries={props.handleSelectedCountries} />
          </TabPanel>
          <TabPanel
            value="2"
            sx={{
              paddingTop: 1,
              paddingBottom: 0,
              paddingLeft: 0,
              paddingRight: 0,
            }}
          >
            <TabTypes handleSelectedTypes={props.handleSelectedTypes} />
          </TabPanel>
        </TabContext>
      </Menu>
    </Box>
  );
}
