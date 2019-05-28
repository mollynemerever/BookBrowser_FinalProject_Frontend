import React, { Component } from "react";
import NavBar from "./navigationbar/NavBar.js";
import { Redirect } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Feed, Icon } from "semantic-ui-react";

export default class Homepage extends Component {
  state = {
    bookCount: this.props.state.currentUser.userbooks
  };
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
        <main>
          <p> homepage </p>
        </main>
      </div>
    );
  }
}
