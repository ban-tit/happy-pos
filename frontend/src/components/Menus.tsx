import { Box, Button, TextField } from '@mui/material';

const Menus = () => {
  return (
    <Box>
      <TextField label="Name" variant="outlined" />
      <TextField label="price" variant="outlined" type="number" />
      <Button variant="contained" color="primary">
        create
      </Button>
    </Box>
  );
};

export default Menus;
