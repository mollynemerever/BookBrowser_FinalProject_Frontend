import React, { Component } from "react";
import NavBar from "./navigationbar/NavBar.js";
import PeopleContainer from "./PeopleContainer.js";
import { Redirect } from "react-router-dom";

export default class SearchInfluencers extends Component {
  render() {
    if (!window.localStorage.user) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <NavBar
          state={this.props.state}
          responseGoogle={this.responseGoogle}
          handleLogout={this.props.handleLogout}
        />

        <PeopleContainer state={this.props} />
      </div>
    );
  }
}
