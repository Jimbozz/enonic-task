import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer>
        <p>© 2024 Enonic task</p>
      </footer>
    </>
  );
};

export default Layout;
