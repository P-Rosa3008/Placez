import { Box } from "@mui/material";
import { useState } from "react";
import { Form } from "react-bootstrap";
import FamousWorks from "../shared/FamousWorks";
import OpeningHours from "../shared/OpeningHours";
import { TicketsOption } from "../shared/TicketsOption";

function AdvancedOptions(props) {
  const [openingHoursState, setOpeningHours] = useState();
  const [famousWorks, setFamousWorks] = useState();

  const [advancedData, setAdvancedData] = useState([
    {
      ticketType: "",
      ticketPrice: "",
      schedule: null,
      famousWorks: null,
    },
  ]);

  const handleOpeningHours = (hours) => {
    setOpeningHours(hours);
  };

  const handleFamousWorks = (works) => {
    setFamousWorks(works);
  };

  const handleInputChange = (index, event) => {
    const values = [...advancedData];
    if (event.target.name === "tickettype") {
      values[index].ticketType = event.target.value;
    }
    if (event.target.name === "ticketprice") {
      values[index].ticketPrice = event.target.value;
    }
    values[0].schedule = openingHoursState;
    values[0].famousWorks = famousWorks;
    if (event.target.name === "description") {
      values[0].description = event.target.value;
    }
    setAdvancedData(values);
  };

  const handleAddFields = () => {
    const values = [...advancedData];
    if (values.length <= 3) {
      setAdvancedData([...advancedData, { ticketType: "", ticketPrice: "" }]);
    }
  };
  const handleRemoveFields = (index) => {
    const values = [...advancedData];
    if (values.length > 1) {
      values.splice(index, 1);
      setAdvancedData(values);
    }
  };

  props.advancedOptionsData(advancedData);

  const values = props.advancedOptionsChoosedValues;

  let advancedOptions = [];

  if (values.tickets === true) {
    advancedOptions.push(
      advancedData?.map((field, index) => {
        return (
          <Box sx={{ mb: 4 }}>
            <Form.Group key={index}>
              <TicketsOption
                handleInputChange={handleInputChange}
                index={index}
                handleRemoveFields={handleRemoveFields}
                handleAddFields={handleAddFields}
              />
            </Form.Group>
          </Box>
        );
      })
    );
  }
  if (values.schedule === true) {
    advancedOptions.push(
      <OpeningHours openingHoursAdvancedData={handleOpeningHours} />
    );
  }
  if (values.famousWorks === true) {
    advancedOptions.push(
      <FamousWorks famousWorksAdvancedData={handleFamousWorks} />
    );
  }
  if (advancedOptions) {
    return <Box>{advancedOptions}</Box>;
  }
  return null;
}

export default AdvancedOptions;
