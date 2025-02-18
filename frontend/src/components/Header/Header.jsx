import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <img src="/logo.svg" className="App-logo" alt="logo" />
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/about">About</Link>
          </li>
          <li className="nav-item">
            <Link to="/searchpatient">Search</Link>
          </li>
          <li className="nav-item">
            <Link to="/signin">Signin</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
