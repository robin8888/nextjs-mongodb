import { Children } from "react/cjs/react.production.min";
import { Navbar } from "./Navbar";
export const Layout = ({children}) => {
  return (
    <>
      <Navbar/>
      {children}
    </>
  );
};
