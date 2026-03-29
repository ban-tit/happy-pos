import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/Inbox';
import Drawer from '@mui/material/Drawer';
import { useState } from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import { Link } from 'react-router-dom';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import CategoryIcon from '@mui/icons-material/Category';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import ClassIcon from '@mui/icons-material/Class';
import SettingsIcon from '@mui/icons-material/Settings';

const sideBarMenuItems = [
  { id: 1, label: 'Menus', icon: <RestaurantMenuIcon />, route: '/menus' },
  {
    id: 2,
    label: 'Menu Categories',
    icon: <CategoryIcon />,
    route: '/menu-categories',
  },
  { id: 3, label: 'Addons', icon: <LunchDiningIcon />, route: '/addons' },
  {
    id: 4,
    label: 'Addon Categories',
    icon: <ClassIcon />,
    route: '/addon-categories',
  },
  { id: 5, label: 'Settings', icon: <SettingsIcon />, route: '/settings' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setOpen(open);
    };

  const drawer = () => {
    return (
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          {sideBarMenuItems.slice(0, 4).map((item) => (
            <Link
              to={item.route}
              key={item.id}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          {sideBarMenuItems.slice(-1).map((item) => (
            <Link
              to={item.route}
              key={item.id}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Box>
    );
  };

  const pageTitle = sideBarMenuItems.find(
    (item) => item.route === window.location.pathname,
  )?.label;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <IconButton
              onClick={() => setOpen(true)}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Box>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {pageTitle || 'Happy POS'}
            </Typography>
          </Box>

          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        {drawer()}
      </Drawer>
    </Box>
  );
};

export default Navbar;
