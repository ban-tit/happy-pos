import { Box, Button, Chip, TextField } from '@mui/material';
import Layout from './Layout';
import { useContext, useState } from 'react';
import { Menu } from '../typings/Types';
import { AppContext } from '../contexts/AppContext';

import { config } from '../config/config';

const Menus = () => {
  const query = new URLSearchParams(window.location.search);
  const locationId = query.get('locationId');

  const [menu, setMenu] = useState<Menu>({
    name: '',
    price: 0,
  });

  const { fetchData, menus, menuLocations } = useContext(AppContext);
  console.log('menu location:', menuLocations);

  const createMenu = async () => {
    if (!menu.name) return console.log('Name is required!');

    try {
      const response = await fetch(`${config.apiBaseUrl}/menus`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(menu),
      });
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (menuId?: string) => {
    if (!menuId) return;
    try {
      const response = await fetch(`${config.apiBaseUrl}/menus/${menuId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      fetchData();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const validMenuLocations = menuLocations
    .filter((menuLocation) => String(menuLocation.locations_id) === locationId)
    .map((menuLocation) => menuLocation.menus_id);
  console.log('valid menu locations:', validMenuLocations);

  const filteredMenus = menus.filter((menu) =>
    validMenuLocations.includes(menu.id as unknown as number),
  );
  console.log('filtered menus:', filteredMenus);

  return (
    <Layout>
      {locationId ? (
        <Box>
          <TextField
            label="Name"
            variant="outlined"
            onChange={(e) => setMenu({ ...menu, name: e.target.value })}
          />
          <TextField
            label="price"
            variant="outlined"
            type="number"
            onChange={(e) =>
              setMenu({ ...menu, price: Number(e.target.value) })
            }
          />
          <Button variant="contained" color="primary" onClick={createMenu}>
            create
          </Button>
          <Box>
            {filteredMenus.map((menu) => (
              <Chip
                key={menu.id}
                label={menu.name}
                onDelete={() => handleDelete(menu.id)}
              />
            ))}
          </Box>
        </Box>
      ) : (
        <Box>
          <h2>Please select a location</h2>
        </Box>
      )}
    </Layout>
  );
};

export default Menus;
