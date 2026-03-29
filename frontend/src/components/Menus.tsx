import { Box, Button, TextField } from '@mui/material';
import Layout from './Layout';

const Menus = () => {
  return (
    <Layout>
      <Box>
        <TextField label="Name" variant="outlined" />
        <TextField label="price" variant="outlined" type="number" />
        <Button variant="contained" color="primary">
          create
        </Button>
      </Box>
    </Layout>
  );
};

export default Menus;
