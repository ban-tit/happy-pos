import { Link } from 'react-router-dom';
const Routes = () => {
  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/menus">Menus</Link>
      <Link to="/menu-categories">Menu Categories</Link>
      <Link to="/addons">Addons</Link>
      <Link to="/addon-categories">Addon Categories</Link>
    </>
  );
};

export default Routes;
