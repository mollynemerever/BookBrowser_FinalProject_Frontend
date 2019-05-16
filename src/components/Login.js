import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { GoogleLogin } from "react-google-login";

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
    if (this.props.isAuthenticated === true) {
      return <Redirect to="/homepage" />;
    }
    return (
      <div>
        <GoogleLogin
          clientId="672466450813-o7e2908klddv6vd6osf4442j4v2haefl.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    );
  }
}
