import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";

function Nav({ user }) {
  const [open, setOpen] = useState(false);

  return (
    <Navbar bg="light" expand="lg" id="home">
      <Link className="navbar-brand" to="/">
        Climbing Routes Review
      </Link>

      <Navbar.Toggle
        aria-controls="navbarSupportedContent"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      />

      <Navbar.Collapse in={open} id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" onClick={() => setOpen(!open)} to="/">
              Home
            </Link>
          </li>

          <li className="nav-item dropdown">
            <a
              href="#"
              className="nav-link dropdown-toggle"
              id="reviewsDropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Reviews
            </a>

            <div className="dropdown-menu" aria-labelledby="reviewsDropdown">
              <Link
                to="/reviews"
                className="dropdown-item"
                onClick={() => setOpen(!open)}
              >
                Reviews
              </Link>

              {user ? (
                <Fragment>
                  <div className="dropdown-divider"></div>
                  <Link
                    to="/reviews/new"
                    className="dropdown-item"
                    onClick={() => setOpen(!open)}
                  >
                    New Review
                  </Link>
                </Fragment>
              ) : null}
            </div>
          </li>
        </ul>

        <ul className="navbar-nav">
          {user ? (
            <li className="nav-item">
              <Link
                to="/logout"
                className="nav-link"
                onClick={() => setOpen(!open)}
              >
                <i className="fa fa-sign-out"></i>
                Logout
              </Link>
            </li>
          ) : (
            <Fragment>
              <li className="nav-item">
                <Link
                  to="/register"
                  className="nav-link"
                  onClick={() => setOpen(!open)}
                >
                  <i className="fa fa-user-plus"></i>
                  Register
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="/login"
                  className="nav-link"
                  onClick={() => setOpen(!open)}
                >
                  <i className="fa fa-sign-in"></i>
                  Login
                </Link>
              </li>
            </Fragment>
          )}
        </ul>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Nav;
