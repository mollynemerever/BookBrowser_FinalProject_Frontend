import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import Homepage from "./Homepage.js";
import NavBar from "./navigationbar/NavBar.js";

export default class Login extends Component {
  responseGoogle = response => {
    let profile = response.getBasicProfile();
    let userObj = {};
    userObj.full_name = profile.getName();
    userObj.first_name = response.profileObj.givenName;
    userObj.email = profile.getEmail();
    userObj.image = profile.getImageUrl();
    userObj.join_year = new Date().getFullYear();
    userObj.industry = "";
    userObj.token = response.Zi.id_token;
    this.googleAPI(userObj);
  };

  googleAPI = userObj => {
    let url = `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${
      userObj.token
    }`;
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        if (data.email_verified) {
          this.checkExistingUser(userObj);
        } else {
          alert("error"); //need to revise this
        }
      });
  };

  checkExistingUser = userObj => {
    let url = "http://localhost:3001/users";
    let config = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userObj)
    };

    fetch(url, config)
      .then(resp => resp.json())
      .then(data => {
        this.props.handleLogin(data);
      });
  };

  render() {
    return (
      <NavBar
        state={this.props.state}
        responseGoogle={this.responseGoogle}
        handleLogout={this.props.handleLogout}
      />
    );
  }
}
