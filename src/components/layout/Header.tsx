import { NavLink } from "react-router-dom";
import "../../styles/Layout.sass";

const Header = () => {
  const links = [
    { path: "/", label: "Home" },
    { path: "/p", label: "Persons" },
    { path: "/m", label: "Movies" },
  ];

  return (
    <header className='header'>
      <div className='header__logo'>LOGO</div>
      <nav className='header__nav'>
        <ul className='header__nav-list'>
          {links.map((link, index) => (
            <li key={index} className='header__nav-item'>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `header__nav-link ${
                    isActive ? "header__nav-link--active" : ""
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
