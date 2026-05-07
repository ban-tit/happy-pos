import {
  Button,
  SnackbarCloseReason,
  TextField,
  Snackbar,
  Box,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Layout from './Layout';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {config} from '../config/config'

const Register = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const register = async () => {
    const isValid =
      user.name &&
      user.name.length > 0 &&
      user.email &&
      user.email.length > 0 &&
      user.password &&
      user.password.length > 0;
    if (!isValid) return alert('Please provide name, email and password');
    
    const response = await fetch(`${config.apiBaseUrl}/auth/register`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <Layout>
      <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        maxWidth: '400px',
        margin: 'auto',
        mt: '1rem',
      }}>
      <TextField
        label="name"
        variant="outlined"
        onChange={(e) => setUser({ ...user, name: e.target.value })}
      />
      <TextField
        label="email"
        variant="outlined"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <TextField
        label="password"
        variant="outlined"
        type="password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <Button variant="contained" color="primary" onClick={register}>
          Register
        </Button>
        <Box sx={{textAlign: 'center'}}>
          <Link to="/login">Already account? Login</Link>
        </Box>

        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message="Please provide name, email and password"
          action={action}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        />
      </Box>
    </Layout>
  );
};

export default Register;
