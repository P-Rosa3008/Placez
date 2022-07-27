import React, { useState } from "react";

import TypesAccordion from "./TypesAccordion";
import { types } from "../components/Types.js";
import SearchBar from "../../Layout/Header/components/SearchBar";
import { Box } from "@mui/material";

function MenuItemsForChoosingTypes(props) {
  const [typeValue, setTypeValue] = useState("");

  const [search, setTypeSearch] = useState("");

  const handleType = (value, event) => {
    setTypeValue(value);
    props.closeDrawer();
  };

  const searchHandler = (search) => {
    setTypeSearch(search);
  };

  let filteredArray = [];

  const filteredType = types.filter((type) => {
    if (search === "") {
      return types;
    } else {
      filteredArray.push(type.key.toLowerCase().includes(search));
      return type.key.toLowerCase().includes(search);
    }
  });

  props.type(typeValue);

  const cultureNiche = types.filter((type) => type.niche === "Culture");
  const foodsAndDrinksNiche = types.filter(
    (type) => type.niche === "Foods and Drinks"
  );
  const natureNiche = types.filter((type) => type.niche === "Nature");
  const tourismNiche = types.filter((type) => type.niche === "Tourism");
  const entertainmentNiche = types.filter(
    (type) => type.niche === "Entertainment"
  );
  const housingNiche = types.filter((type) => type.niche === "Housing");
  const healthNiche = types.filter((type) => type.niche === "Health");
  const otherNiche = types.filter((type) => type.niche === "Other");

  return (
    <React.Fragment>
      <Box paddingTop={3} paddingBottom={2}>
        <SearchBar search={searchHandler} />
      </Box>

      {filteredType.filter((item) => item.niche === "Housing").length ===
      0 ? null : (
        <TypesAccordion
          nicheTitle={"Housing"}
          niche={
            filteredArray
              ? filteredType.filter((item) => item.niche === "Housing")
              : housingNiche
          }
          handleType={handleType}
        />
      )}
      {filteredType.filter((item) => item.niche === "Foods and Drinks")
        .length === 0 ? null : (
        <TypesAccordion
          nicheTitle={"Foods and Drinks"}
          niche={
            filteredArray
              ? filteredType.filter((item) => item.niche === "Foods and Drinks")
              : foodsAndDrinksNiche
          }
          handleType={handleType}
        />
      )}
      {filteredType.filter((item) => item.niche === "Nature").length ===
      0 ? null : (
        <TypesAccordion
          nicheTitle={"Nature"}
          niche={
            filteredArray
              ? filteredType.filter((item) => item.niche === "Nature")
              : natureNiche
          }
          handleType={handleType}
        />
      )}
      {filteredType.filter((item) => item.niche === "Culture").length ===
      0 ? null : (
        <TypesAccordion
          nicheTitle={"Culture"}
          niche={
            filteredArray
              ? filteredType.filter((item) => item.niche === "Culture")
              : cultureNiche
          }
          handleType={handleType}
        />
      )}
      {filteredType.filter((item) => item.niche === "Tourism").length ===
      0 ? null : (
        <TypesAccordion
          nicheTitle={"Tourism"}
          niche={
            filteredArray
              ? filteredType.filter((item) => item.niche === "Tourism")
              : tourismNiche
          }
          handleType={handleType}
        />
      )}
      {filteredType.filter((item) => item.niche === "Health").length ===
      0 ? null : (
        <TypesAccordion
          nicheTitle={"Health"}
          niche={
            filteredArray
              ? filteredType.filter((item) => item.niche === "Health")
              : healthNiche
          }
          handleType={handleType}
        />
      )}
      {filteredType.filter((item) => item.niche === "Other").length ===
      0 ? null : (
        <TypesAccordion
          nicheTitle={"Other"}
          niche={
            filteredArray
              ? filteredType.filter((item) => item.niche === "Other")
              : otherNiche
          }
          handleType={handleType}
        />
      )}
    </React.Fragment>
  );
}
export default MenuItemsForChoosingTypes;
