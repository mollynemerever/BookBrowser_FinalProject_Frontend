import React, { Component } from "react";
import { GoogleLogout } from "react-google-login";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./NavBar.css";

export default class NavBar extends Component {
  render() {
    return (
      <header className="entire_navbar">
        <nav className="navbar_navtag">
          <div />
          <div className="navbar_logo">
            <Link to="/homepage">LOGO?</Link>
          </div>{" "}
          <div className="spacer" />
          <div className="navbar_items">
            <ul>
              <li>
                <Link to="/homepage">Homepage</Link>
              </li>
              <li>
                <Link to="/editaccount">Edit Account</Link>
              </li>
              <li>
                <Link to="/searchinfluencers">Search Influencers</Link>
              </li>
              <li>
                <Link to="/searchbooks">Search Books</Link>
              </li>
              <li>
                <Link to="/profile">My Profile?</Link>
              </li>
              <li>
                <Link to="/mybooklist">My Book List</Link>
              </li>
              <li>
                <GoogleLogout
                  buttonText="Logout"
                  onLogoutSuccess={this.props.handleLogout}
                />
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}
