import React, { Component } from "react";
import { NavLink as Link } from "react-router-dom";

class Navbar extends React.Component {
  state = {
    imageUrl: "https://konte.pages.labranet.jamk.fi/vue-weather-app/img/weatherapplogo.36014a54.png",
  };
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ color: "white" }}>
        <div className="container-fluid" style={{ display: "flex", justifyContent: "center" }}>
          <a className="navbar-brand" href="#">
            <img src={this.state.imageUrl}></img>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav" style={{ textAlign: "center", justifyContent: "center" }}>
            <ul className="navbar-nav" style={{ gap: 42 }}>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  style={{
                    color: "white",
                    backgroundColor: "#686767",
                    minWidth: 64,
                    paddingLeft: 16,
                    paddingRight: 16,
                    paddingTop: 10,
                    paddingBottom: 10,
                    borderRadius: 8,
                  }}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={{
                    color: "white",
                    backgroundColor: "#686767",
                    minWidth: 64,
                    paddingLeft: 16,
                    paddingRight: 16,
                    paddingTop: 10,
                    paddingBottom: 10,
                    borderRadius: 8,
                  }}
                  to="/favourite"
                >
                  Favorites
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }

  styles = {
    fontSize: 10,
    fontWeight: "bold",
  };
}

export default Navbar;
