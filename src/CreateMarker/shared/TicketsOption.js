import { Box, IconButton, TextField, Typography } from "@mui/material";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

export function TicketsOption({
  event,
  handleInputChange,
  index,
  handleRemoveFields,
  handleAddFields,
}) {
  return (
    <>
      <Typography
        sx={{
          paddingLeft: 2,
          mb: 0.5,
        }}
      >
        Tickets
      </Typography>
      <Box
        sx={{
          display: "flex",
          paddingLeft: 2,
          paddingRight: 2,
        }}
      >
        <TextField
          id="ticketType"
          name="tickettype"
          type="text"
          variant="standard"
          label="Type"
          InputLabelProps={{
            shrink: true,
          }}
          style={{
            width: 75,
          }}
          onChange={(event) => handleInputChange(index, event)}
        />
        <Box
          sx={{
            flexGrow: 0.1,
          }}
        />
        <TextField
          id="ticketType"
          name="ticketprice"
          type="number"
          variant="standard"
          label="Price"
          InputLabelProps={{
            shrink: true,
          }}
          style={{
            width: 75,
          }}
          onChange={(event) => handleInputChange(index, event)}
        />
        <Box
          sx={{
            flexGrow: 0.15,
          }}
        />
        <IconButton
          onClick={() => {
            handleRemoveFields(index);
          }}
          sx={{
            borderRadius: 16,
          }}
        >
          <RemoveIcon />
        </IconButton>
        <IconButton
          onClick={handleAddFields}
          sx={{
            borderRadius: 16,
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>
    </>
  );
}
