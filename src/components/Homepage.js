import React, { Component } from "react";
import { GoogleLogout } from "react-google-login";

export default class Homepage extends Component {
  render() {
    return (
      <div>
        homepage
        <GoogleLogout buttonText="Logout" onLogoutSuccess={this.logout} />
      </div>
    );
  }
}
