import React, { Component } from "react";
import NavBar from "./navigationbar/NavBar.js";
import { Redirect } from "react-router-dom";

export default class MyBookList extends Component {
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
          <p> book list detail page </p>
        </main>
      </div>
    );
  }
}
