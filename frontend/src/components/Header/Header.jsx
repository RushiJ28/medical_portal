import "./Header.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { makeGETrequest } from "../../utils/api";
import { login, logout } from "../../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { isTokenExpired } from "../../utils/isTokenExpired";
import { jwtDecode } from "jwt-decode";

const Header = () => {
  const dispatch = useDispatch();
  const userSelector = useSelector((state) => state.user);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const checkIfLoggedIn = async () => {
        const res = await makeGETrequest(
          "http://localhost:5000/users/checkifloggedin",
          localStorage.getItem("token")
        );

        if (res.status === 200 && res.admin === true) {
          dispatch(
            login({
              username: "admin",
              admin: res.admin,
              tokenexpiration: jwtDecode(localStorage.getItem("token")).exp,
            })
          );
        }

        if (res.status === 200 && res.doctor === true) {
          dispatch(
            login({
              idnumber: res.idnumber,
              phone: res.phone,
              email: res.email,
              username: res.username,
              doctor: res.doctor,
              tokenexpiration: jwtDecode(localStorage.getItem("token")).exp,
            })
          );

          //Convert base64 string to data URL and store in local storage,
          const dataUrl = `data:image/jpeg;base64,${res.image}`;
          localStorage.setItem("image", dataUrl);
        }
      };
      checkIfLoggedIn();
    }
  }, [dispatch, userSelector.username]);

  function removeLocalStorageAndRedux() {
    //This will clear all local storage data
    localStorage.clear();
    //we need to clear the redux store too
    dispatch(logout());
  }

  //Every time, user clicks on a link, we take the JwT from local storgae and check if exp in JWT is expired, if it did then clear redux store and the local storgae
  function checkIfTokenExpired() {
    if (isTokenExpired(localStorage.getItem("token"))) {
      removeLocalStorageAndRedux();
    }
  }

  return (
    <header className="header">
      <nav className="navbar">
        <img src="/logo.svg" className="App-logo" alt="logo" />
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" onClick={checkIfTokenExpired}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" onClick={checkIfTokenExpired}>
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/searchpatient" onClick={checkIfTokenExpired}>
              Search Patient
            </Link>
          </li>

          {userSelector.username && (
            <li className="nav-item">
              <Link to="/profile" onClick={checkIfTokenExpired}>
                Profile
              </Link>
            </li>
          )}

          {userSelector.username ? (
            <li className="nav-item">
              <Link to="/" onClick={removeLocalStorageAndRedux}>
                Sign Out
              </Link>
            </li>
          ) : (
            <li className="nav-item">
              <Link to="/signin">Sign In</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
