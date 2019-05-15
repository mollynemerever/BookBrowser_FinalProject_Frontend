import React, { Component } from "react";
import { GoogleLogin } from "react-google-login";

export default class Welcome extends Component {
  responseGoogle = response => {
    let profile = response.getBasicProfile();
    let userObj = {};
    userObj.full_name = profile.getName();
    userObj.first_name = response.profileObj.givenName;
    userObj.email = profile.getEmail();
    userObj.image = profile.getImageUrl();
    userObj.join_year = new Date().getFullYear();
    userObj.industry = undefined;
    userObj.token = response.Zi.id_token;
    console.log(userObj);
  };

  render() {
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
