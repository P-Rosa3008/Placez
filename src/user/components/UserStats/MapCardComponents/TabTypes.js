import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import React, { useEffect, useState } from "react";
import { types } from "../../../../CreateMarker/components/Types";
import { TabsCheckboxes } from "./TabsCheckboxes";
import { filterTypes } from "./utils/filterTypes";

export function TabTypes(props) {
  const [tabIndex, setTabIndex] = useState("1");

  const handleChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  const {
    filterTypeCulture,
    filterTypeFoodsAndDrinks,
    filterTypeHealth,
    filterTypeHousing,
    filterTypeNature,
    filterTypeTourism,
    filterTypeOther,
  } = filterTypes(types);

  const [selectedCheckbox, setSelectedCheckbox] = useState(() =>
    props.types.length > 0 ? props.selectedCheckboxes : types.map((i) => false)
  );
  const [selectedType, setSelectedType] = useState(props.types);

  useEffect(() => {}, [selectedType]);

  const isTypeSelected = (type, index, checked) => {
    const checkboxSelected = selectedCheckbox.map((bool, i) => {
      if (i === index) {
        return checked;
      }
      return bool;
    });

    // const typeSelected = selectedCheckbox.map((bool, i) => {
    //   if (i === index) {
    //     return type;
    //   }
    //   if (checked !== false) {
    //     return type;
    //   }
    // });

    let updatedTypeArray;
    updatedTypeArray = [...selectedType, type];
    if (updatedTypeArray.includes(type)) {
      updatedTypeArray = [...new Set(updatedTypeArray)];
    }
    if (!checked) {
      const removeUncheckedTypeFromArray = updatedTypeArray.filter(
        (t) => t !== type
      );
      setSelectedType(removeUncheckedTypeFromArray);
    } else {
      setSelectedType(updatedTypeArray);
    }
    setSelectedCheckbox(checkboxSelected);
  };

  props.handleSelectedCheckboxes(selectedCheckbox);
  props.handleSelectedTypes(selectedType);

  return (
    <TabContext value={tabIndex}>
      <TabList
        variant="scrollable"
        scrollButtons="auto"
        onChange={handleChange}
      >
        <Tab value="1" label="Culture" />
        <Tab value="2" label="Foods and Drinks" />
        <Tab value="3" label="Health" />
        <Tab value="4" label="Housing" />
        <Tab value="5" label="Nature" />
        <Tab value="6" label="Tourism" />
        <Tab value="7" label="Other" />
      </TabList>
      <TabPanel value="1" sx={{ padding: 0 }}>
        <Box sx={{ height: 520, width: 410 }}>
          <TabsCheckboxes
            filter={filterTypeCulture()}
            addToIndex={0}
            selectedCheckbox={selectedCheckbox}
            isCountrySelected={isTypeSelected}
          />
        </Box>
      </TabPanel>
      <TabPanel value="2" sx={{ padding: 0 }}>
        <Box sx={{ height: 520, width: 410 }}>
          <TabsCheckboxes
            filter={filterTypeFoodsAndDrinks()}
            addToIndex={13}
            selectedCheckbox={selectedCheckbox}
            isCountrySelected={isTypeSelected}
          />
        </Box>
      </TabPanel>
      <TabPanel value="3" sx={{ padding: 0 }}>
        <Box sx={{ height: 520, width: 410 }}>
          <TabsCheckboxes
            filter={filterTypeHealth()}
            addToIndex={26}
            selectedCheckbox={selectedCheckbox}
            isCountrySelected={isTypeSelected}
          />
        </Box>
      </TabPanel>
      <TabPanel value="4" sx={{ padding: 0 }}>
        <Box sx={{ height: 520, width: 410 }}>
          <TabsCheckboxes
            filter={filterTypeHousing()}
            addToIndex={27}
            selectedCheckbox={selectedCheckbox}
            isCountrySelected={isTypeSelected}
          />
        </Box>
      </TabPanel>
      <TabPanel value="5" sx={{ padding: 0 }}>
        <Box sx={{ height: 520, width: 410 }}>
          <TabsCheckboxes
            filter={filterTypeNature()}
            addToIndex={33}
            selectedCheckbox={selectedCheckbox}
            isCountrySelected={isTypeSelected}
          />
        </Box>
      </TabPanel>
      <TabPanel value="6" sx={{ padding: 0 }}>
        <Box sx={{ height: 520, width: 410 }}>
          <TabsCheckboxes
            filter={filterTypeTourism()}
            addToIndex={40}
            selectedCheckbox={selectedCheckbox}
            isCountrySelected={isTypeSelected}
          />
        </Box>
      </TabPanel>
      <TabPanel value="7" sx={{ padding: 0 }}>
        <Box sx={{ height: 520, width: 410 }}>
          <TabsCheckboxes
            filter={filterTypeOther()}
            addToIndex={68}
            selectedCheckbox={selectedCheckbox}
            isCountrySelected={isTypeSelected}
          />
        </Box>
      </TabPanel>
    </TabContext>
  );
}
