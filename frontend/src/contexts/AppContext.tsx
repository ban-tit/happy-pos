import { createContext } from 'react';
import {
  Addon,
  AddonCategory,
  Menu,
  MenuCategory,
  MenuLocation,
  Location,
} from '../typings/Types';
import { useState, useEffect } from 'react';
import { config } from '../config/config';

interface AppContextType {
  menus: Menu[];
  menuCategories: MenuCategory[];
  addons: Addon[];
  addonCategories: AddonCategory[];
  menuLocations: MenuLocation[];
  locations: Location[];
  updateData: (value: any) => void;
  fetchData: () => void;
}

const defaultContext: AppContextType = {
  menus: [],
  menuCategories: [],
  addons: [],
  addonCategories: [],
  menuLocations: [],
  locations: [],
  updateData: () => {},
  fetchData: () => {},
};

export const AppContext = createContext<AppContextType>(defaultContext);

const AppProvider = (props: any) => {
  const [data, updateData] = useState(defaultContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch(`${config.apiBaseUrl}/data`);
    const responseJson = await response.json();
    const {
      menus,
      menuCategories,
      addons,
      addonCategories,
      menuLocations,
      locations,
    } = responseJson;
    updateData({
      ...data,
      menus,
      menuCategories,
      addons,
      addonCategories,
      menuLocations,
      locations,
    });
  };

  return (
    <AppContext.Provider value={{ ...data, updateData, fetchData }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
