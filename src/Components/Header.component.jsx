import React from "react";
import { auth } from "../Services/firebase.service";
import { Link, useLocation } from "react-router-dom";

export default function HeaderComponent() {
  const location = useLocation();
  return (
    <div>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <span
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </span>
        </div>

        <div
          id="navbarBasicExample"
          className="navbar-menu"
          style={{ cursor: "pointer", padding: "1%" }}
        >
          <div className="navbar-start">
            <Link to="/addShloka">
              <span
                className={
                  location.pathname === "/addShloka"
                    ? "navbar-item has-background-link has-text-white"
                    : "navbar-item"
                }
                style={{ borderRadius: 5 }}
              >
                Add Shloka
              </span>
            </Link>
            <Link to="/addThought">
              <span
                className={
                  location.pathname === "/addThought"
                    ? "navbar-item has-background-link has-text-white"
                    : "navbar-item"
                }
                style={{ borderRadius: 5 }}
              >
                Add Thought of the Day
              </span>
            </Link>
            <Link to="/addEvent">
              <span
                className={
                  location.pathname === "/addEvent"
                    ? "navbar-item has-background-link has-text-white"
                    : "navbar-item"
                }
                style={{ borderRadius: 5 }}
              >
                Add Event
              </span>
            </Link>
            <Link to="/addLink">
              <span
                className={
                  location.pathname === "/addLink"
                    ? "navbar-item has-background-link has-text-white"
                    : "navbar-item"
                }
                style={{ borderRadius: 5 }}
              >
                Add Link
              </span>
            </Link>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <button
                  className="button is-danger"
                  onClick={(event) => {
                    event.preventDefault();
                    auth.signOut();
                  }}
                >
                  Log out
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
