import React, { Component } from "react";
import NavBar from "./navigationbar/NavBar.js";
import { Redirect } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Button } from "semantic-ui-react";

export default class Homepage extends Component {
  state = {
    bookCount: this.props.state.currentUser.userbooks,
    user_follows: ""
  };

  fetchFollowing = e => {
    e.preventDefault();
    console.log("need to get my followers");
    let url = "http://localhost:3001/userfollowerrelationships";
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        this.filterFollowing(data);
      });
  };

  filterFollowing = relationships => {
    let iFollow = [];
    relationships.forEach(object => {
      if (object.user_id === this.props.state.currentUser.id) {
        iFollow.push(object.following_id);
      }
    });
    this.setState({ user_follows: iFollow });
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
          <Button color="blue" onClick={this.fetchFollowing}>
            {" "}
            Get People I Follow{" "}
          </Button>
        </main>
      </div>
    );
  }
}
