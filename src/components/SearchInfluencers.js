import React, { Component } from "react";
import NavBar from "./navigationbar/NavBar.js";
import PeopleContainer from "./PeopleContainer.js";
import { Redirect } from "react-router-dom";

export default class SearchInfluencers extends Component {
  render() {
    if (this.props.state.isAuthenticated === false) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <NavBar
          state={this.props.state}
          responseGoogle={this.responseGoogle}
          handleLogout={this.props.handleLogout}
        />
        <main>
          <p> search influencers </p>
          <PeopleContainer state={this.props} />
        </main>
      </div>
    );
  }
}
