import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import Layout from './Layout';
import { AppContext } from '../contexts/AppContext';
import { useContext, useEffect, useState } from 'react';
import { Location } from '../typings/Types';

const Settings = () => {
  const { locations } = useContext(AppContext);
  console.log(locations);

  const [selectedLocation, setSelectedLocation] = useState<
    Location | undefined
  >();

  useEffect(() => {
    console.log(locations[0]);
    if (locations.length) {
      const selectedLocationId = localStorage.getItem('selectedLocation');
      if (!selectedLocationId) {
        localStorage.setItem('selectedLocation', String(locations[0].id));
        setSelectedLocation(locations[0]);
      } else {
        const selectedLocation = locations.find(
          (location) => String(location.id) === selectedLocationId,
        );
        setSelectedLocation(selectedLocation);
      }
    }
  }, [locations]);

  const handleOnChange = (evt: SelectChangeEvent<string>) => {
    const value = evt.target.value;
    console.log('he', typeof value);

    localStorage.setItem('selectedLocation', String(evt.target.value));
    const selectedLocation = locations.find(
      (location) => String(location.id) === String(evt.target.value),
    );
    console.log('selected Location:', selectedLocation);

    setSelectedLocation(selectedLocation);
  };

  // if (!selectedLocation) return null;

  return (
    <Layout>
      <Box sx={{ maxWidth: 400, margin: '0 auto', mt: 5 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Locations</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedLocation ? selectedLocation.id : ''}
            label={'Locations'}
            onChange={handleOnChange}
          >
            {locations.map((location) => (
              <MenuItem key={location.id} value={location.id}>
                {location.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Layout>
  );
};

export default Settings;
