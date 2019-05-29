import React, { Component } from "react";
import NavBar from "./navigationbar/NavBar.js";
import { Redirect } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Button, Card, Image } from "semantic-ui-react";

export default class Homepage extends Component {
  state = {
    bookCount: this.props.state.currentUser.userbooks,
    user_followIds: "",
    userFollowsDetail: ""
  };

  fetchFollowing = e => {
    e.preventDefault();

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
    this.setState({ user_followIds: iFollow });
    this.getFollowingUserInfo(iFollow);
  };

  getFollowingUserInfo = array => {
    console.log("inside get user following info");
    array.forEach(id => {
      let url = `http://localhost:3001/users/${id}`;
      fetch(url)
        .then(resp => resp.json())
        .then(data => {
          console.log(data[0]);
          this.setState({
            userFollowsDetail: [...this.state.userFollowsDetail, data[0]]
          });
        });
    });
  };

  render() {
    let people;
    if (!window.localStorage.user) {
      return <Redirect to="/" />;
    }
    if (this.state.userFollowsDetail !== "") {
      people = this.state.userFollowsDetail.map(person => {
        return (
          <Card>
            <Card.Content>
              <Image src={person.image} size="tiny" />
              <Card.Header>{person.full_name}</Card.Header>
              <Card.Meta>{person.industry}</Card.Meta>
            </Card.Content>
          </Card>
        );
      });
    } else {
      people = null;
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
          {people}
        </main>
      </div>
    );
  }
}
