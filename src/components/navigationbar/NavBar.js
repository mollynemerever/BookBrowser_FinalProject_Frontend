import React, { Component } from "react";
import { GoogleLogin } from "react-google-login";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import "./NavBar.css";

class NavBar extends Component {
  render() {
    let greeting;
    if (this.props.state.isAuthenticated === false) {
      greeting = (
        <GoogleLogin
          clientId="672466450813-o7e2908klddv6vd6osf4442j4v2haefl.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={this.props.responseGoogle}
          onFailure={this.props.responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      );
    } else {
      greeting = (
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
                  <Link
                    to={{
                      pathname: "/profile",
                      state: {
                        selectedUser: this.props.state.currentUser,
                        follow_status: undefined
                      }
                    }}
                  >
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link to="/mybooklist">My Book List</Link>
                </li>
                <li>
                  <button  onClick={this.props.handleLogout}> google logout </button>
                </li>
              </ul>
            </div>
          </nav>
        </header>
      );
    }
    return <div>{greeting}</div>;
  }
}

export default withRouter(NavBar);
