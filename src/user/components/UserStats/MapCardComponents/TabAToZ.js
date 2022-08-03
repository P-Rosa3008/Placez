import { TabsCheckboxes } from "./TabsCheckboxes";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import React, { useEffect, useState } from "react";
import { filterCountrysAZ } from "./utils/filterCountrys";
import { countrys } from "./utils/countriesNamesOnly";

export const TabAToZ = (props) => {
  const [tabIndex, setTabIndex] = useState("1");

  const handleChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  const {
    filterCountryAD,
    filterCountryEH,
    filterCountryIL,
    filterCountryMP,
    filterCountryQT,
    filterCountryUZ,
  } = filterCountrysAZ(countrys);

  const [selectedCheckbox, setSelectedCheckbox] = useState(() =>
    props.countries.length > 0
      ? props.selectedCheckboxes
      : countrys.map((i) => false)
  );

  const [selectedCountry, setSelectedCountry] = useState(props.countries);

  useEffect(() => {}, [selectedCountry]);

  const isCountrySelected = (country, index, checked) => {
    const checkboxSelected = selectedCheckbox.map((bool, i) => {
      if (i === index) {
        return checked;
      }
      return bool;
    });

    let updatedCountryArray;
    updatedCountryArray = [...selectedCountry, country];
    if (updatedCountryArray.includes(country)) {
      updatedCountryArray = [...new Set(updatedCountryArray)];
    }
    if (!checked) {
      const removeUncheckedCountryFromArray = updatedCountryArray.filter(
        (c) => c !== country
      );
      setSelectedCountry(removeUncheckedCountryFromArray);
    } else {
      setSelectedCountry(updatedCountryArray);
    }
    setSelectedCheckbox(checkboxSelected);
  };

  props.handleSelectedCheckboxes(selectedCheckbox);
  props.handleSelectedCountries(selectedCountry);

  return (
    <TabContext value={tabIndex}>
      <TabList
        variant="scrollable"
        scrollButtons="auto"
        onChange={handleChange}
      >
        <Tab value="1" label="[A - D]" />
        <Tab value="2" label="[E - H]" />
        <Tab value="3" label="[I - L]" />
        <Tab value="4" label="[M - P]" />
        <Tab value="5" label="[Q - T]" />
        <Tab value="6" label="[U - Z]" />
      </TabList>
      <TabPanel value="1" sx={{ padding: 0 }}>
        <Box sx={{ height: 520, width: 410 }}>
          <TabsCheckboxes
            filter={filterCountryAD()}
            addToIndex={0}
            selectedCheckbox={selectedCheckbox}
            isCountrySelected={isCountrySelected}
          />
        </Box>
      </TabPanel>
      <TabPanel value="2" sx={{ padding: 0 }}>
        <TabsCheckboxes
          filter={filterCountryEH()}
          addToIndex={48}
          selectedCheckbox={selectedCheckbox}
          isCountrySelected={isCountrySelected}
        />
      </TabPanel>
      <TabPanel value="3" sx={{ padding: 0 }}>
        <TabsCheckboxes
          filter={filterCountryIL()}
          addToIndex={73}
          selectedCheckbox={selectedCheckbox}
          isCountrySelected={isCountrySelected}
        />
      </TabPanel>
      <TabPanel value="4" sx={{ padding: 0 }}>
        <TabsCheckboxes
          filter={filterCountryMP()}
          addToIndex={98}
          selectedCheckbox={selectedCheckbox}
          isCountrySelected={isCountrySelected}
        />
      </TabPanel>
      <TabPanel value="5" sx={{ padding: 0 }}>
        <TabsCheckboxes
          filter={filterCountryQT()}
          addToIndex={136}
          selectedCheckbox={selectedCheckbox}
          isCountrySelected={isCountrySelected}
        />
      </TabPanel>
      <TabPanel value="6" sx={{ padding: 0 }}>
        <TabsCheckboxes
          filter={filterCountryUZ()}
          addToIndex={180}
          selectedCheckbox={selectedCheckbox}
          isCountrySelected={isCountrySelected}
        />
      </TabPanel>
    </TabContext>
  );
};
