import React, { Component } from "react";
import { GoogleLogin } from "react-google-login";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import "./NavBar.css";
import "semantic-ui-css/semantic.min.css";
import { Menu } from "semantic-ui-react";

class NavBar extends Component {
  handleItemClick = (e, { name }) => {
    this.setState({ active: name });
    window.localStorage.setItem("active", JSON.stringify(name));
  };

  render() {
    const activeItem = JSON.parse(window.localStorage.getItem("active"));
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
        <Menu secondary>
          <header className="entire_navbar">
            <nav className="navbar_navtag">
              <div className="spacer" />
              <div className="navbar_items">
                <ul>
                  <li>
                    <Menu.Item
                      active={activeItem === "Homepage"}
                      onClick={this.handleItemClick}
                      as={Link}
                      to="/homepage"
                      name="Homepage"
                    />
                  </li>
                  <li>
                    <Menu.Item
                      active={activeItem === "Edit Account"}
                      onClick={this.handleItemClick}
                      as={Link}
                      to="/editaccount"
                      name="Edit Account"
                    />
                  </li>
                  <li>
                    <Menu.Item
                      active={activeItem === "Search Influencers"}
                      onClick={this.handleItemClick}
                      as={Link}
                      to="/searchinfluencers"
                      name="Search Influencers"
                    />
                  </li>
                  <li>
                    <Menu.Item
                      active={activeItem === "Search Books"}
                      onClick={this.handleItemClick}
                      as={Link}
                      to="/searchbooks"
                      name="Search Books"
                    />
                  </li>
                  <li>
                    <Menu.Item
                      active={activeItem === "My Profile"}
                      onClick={this.handleItemClick}
                      as={Link}
                      to={{
                        pathname: "/profile",
                        state: {
                          selectedUser: this.props.state.currentUser,
                          follow_status: undefined
                        }
                      }}
                      name="My Profile"
                    />
                  </li>
                  <li>
                    <Menu.Item
                      active={activeItem === "My Books"}
                      onClick={this.handleItemClick}
                      as={Link}
                      to="/mybooklist"
                      name="My Books"
                    />
                  </li>
                  <li>
                    <Menu.Item
                      onClick={this.props.handleLogout}
                      name="Log Out"
                    />
                  </li>
                </ul>
              </div>
            </nav>
          </header>
        </Menu>
      );
    }
    return <div>{greeting}</div>;
  }
}

export default withRouter(NavBar);
