import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import style from "./Navbar.module.css";
import cookie from "react-cookies";

const Navbar = ({ logUser, setLogUser }) => {
  const logout = () => {
    setLogUser(null);
    cookie.remove("token");
  };
  const [stickyClass, setStickyClass] = useState('transp');

  useEffect(() => {
    window.addEventListener('scroll', stickNavbar);

    return () => {
      window.removeEventListener('scroll', stickNavbar);
    };
  }, []);

  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight > 500 ? setStickyClass('sticky shadow') : setStickyClass('transp');
    }
  };

  return (
    <nav className={`navbar navbar-expand-lg ${stickyClass}`}>
      <div className="container">
        <Link className="navbar-brand text-white fw-bolder" to="/">
          A-Movies
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className={`nav-link text-capitalize`}
                aria-current="page"
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={`nav-link text-capitalize`}
                to="/movies"
              >
                Movies
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={`nav-link text-capitalize`} to="/tv">
                TV Shows
              </NavLink>
            </li>
            {logUser ? (
              <>
                <li className="nav-item">
                  <NavLink
                    className={`nav-link text-capitalize`}
                    to="/"
                    onClick={logout}
                  >
                    Logout
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className={`nav-link text-capitalize`} to="/login">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={`nav-link text-capitalize`}
                    to="/register"
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
