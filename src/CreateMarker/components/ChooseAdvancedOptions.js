import { Box, Button, Modal, Switch } from "@mui/material";
import React, { useState } from "react";

function ChooseAdvancedOptions(props) {
  const [open, setOpen] = useState(false);
  const [closeModal, setCloseModal] = useState(true);
  const [tickets, setTickets] = useState(false);
  const [schedule, setSchedule] = useState(false);
  const [famousWorks, setFamousWorks] = useState(false);
  const handleClose = () => setOpen(false);
  const handleTickets = () => setTickets(!tickets);
  const handleSchedule = () => setSchedule(!schedule);
  const handleFamousWorks = () => setFamousWorks(!famousWorks);

  const bools = {
    tickets: tickets,
    schedule: schedule,
    famousWorks: famousWorks,
  };

  props.handleCloseChildModal(closeModal);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: 1,
  };

  return (
    <Modal open={props.open} onClose={handleClose}>
      <Box sx={style} display="flex" flexDirection="column">
        <Button onClick={handleTickets}>
          <Switch checked={tickets} onChange={null} />
          Tickets
        </Button>
        <Button onClick={handleSchedule}>
          <Switch checked={schedule} onChange={null} />
          Schedule
        </Button>
        <Button onClick={handleFamousWorks}>
          <Switch checked={famousWorks} onChange={null} />
          Famous Works
        </Button>
        <Button
          onClick={() => {
            props.advancedOptionsChoosedValues(bools);
            console.log(bools);
            setOpen(false);
            setCloseModal(false);
            props.handleCloseChildModal(closeModal);
            props.advancedOptionsChoosed(true);
          }}
        >
          I choosed already
        </Button>
        <Button
          onClick={() => {
            setOpen(false);
            setCloseModal(false);
            props.handleCloseChildModal(closeModal);
            props.advancedOptionsChoosed(false);
          }}
        >
          Close Modal
        </Button>
      </Box>
    </Modal>
  );
}

export default ChooseAdvancedOptions;
