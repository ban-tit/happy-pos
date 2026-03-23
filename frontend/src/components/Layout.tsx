import { JSX } from 'react';

interface Props {
  children: string | JSX.Element | JSX.Element[];
}

const Layout = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default Layout;
