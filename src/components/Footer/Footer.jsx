import React from "react";
import { Link } from "react-router-dom";
import style from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={`${style.footer}`}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12 text-center">
            <p className={`${style.menu}`}>
              <Link to="#">Home</Link>
              <Link to="#">Movies</Link>
              <Link to="#">TV Shows</Link>
              <Link to="#">Trending</Link>
              <Link to="#">Contact</Link>
            </p>
            <ul className={`${style.ftcoFooterSocial} p-0`}>
              <li className="ftco-animate text-white">
                <Link
                  to="#"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Twitter"
                >
                  <i className="fa-brands fa-twitter"></i>
                </Link>
              </li>
              <li className="ftco-animate text-white">
                <Link
                  to="#"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Facebook"
                >
                  <i className="fa-brands fa-facebook-f"></i>
                </Link>
              </li>
              <li className="ftco-animate text-white">
                <Link
                  to="#"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Instagram"
                >
                  <i className="fa-brands fa-instagram"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-12 text-center">
            <p className="copyright">Copyright © All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
