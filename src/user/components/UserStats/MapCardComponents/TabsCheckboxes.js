import { Box, Checkbox, FormControlLabel, List, ListItem } from "@mui/material";
import React from "react";

export function TabsCheckboxes({
  filter,
  addToIndex,
  selectedCheckbox,
  isCountrySelected,
}) {
  return (
    <Box maxHeight={390} maxWidth={380} overflow="auto">
      <List>
        {filter.map((country, index) => {
          return (
            <ListItem>
              <FormControlLabel
                key={"index " + index}
                control={
                  <Checkbox
                    checked={selectedCheckbox[index + addToIndex]}
                    onChange={(e) =>
                      isCountrySelected(
                        country,
                        index + addToIndex,
                        e.target.checked
                      )
                    }
                  />
                }
                label={country}
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
