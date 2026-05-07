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
import { Link, useNavigate } from 'react-router-dom';
import { config } from '../config/config';

const Login = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({
    
    email: '',
    password: '',
  });

  const SignIn = async () => {
    const isValid =      
      user.email &&
      user.email.length > 0 &&
      user.password &&
      user.password.length > 0;
    if (!isValid) {
      setOpen(true);
      return;
    }

    const result = await fetch(`${config.apiBaseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    navigate('/menus?locationId=2');
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
        }}
      >
       
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
        <Button variant="contained" color="primary" onClick={SignIn}>
          Sign In
        </Button>
        <Box sx={{textAlign: 'center'}}>
          <Link to="/register">Don't have an account? Register</Link>
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

export default Login;
