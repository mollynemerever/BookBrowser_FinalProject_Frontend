import React, { Component } from "react";
import Person from "./Person.js";
import Profile from "./Profile.js";
import "semantic-ui-css/semantic.min.css";
import { Card, Divider } from "semantic-ui-react";

export default class PeopleContainer extends Component {
  state = {
    usersExceptCurrent: "",
    following: "",
    selectedUser: ""
  };

  componentDidMount = () => {
    this.getFollowing();
    this.getAllUsers();
  };

  updateSelectedUser = selectedUser => {
    this.setState({ selectedUser: selectedUser });
  };

  getFollowing = () => {
    let url = "http://localhost:3001/userfollowerrelationships";
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        this.filterCurrentUserFollowing(data);
      });
  };

  filterCurrentUserFollowing = relationships => {
    let filtered = relationships.filter(
      relation => relation.user_id === this.props.state.state.currentUser.id
    );
    this.setState({ following: filtered });
  };

  getAllUsers = () => {
    let url = "http://localhost:3001/users";
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        this.filterUsers(data);
      });
  };

  filterUsers = users => {
    let filteredUsers = users.filter(
      user => user.id !== this.props.state.state.currentUser.id
    );
    this.setState({ usersExceptCurrent: filteredUsers });
  };

  render() {
    let people;

    if (this.state.usersExceptCurrent !== "") {
      people = this.state.usersExceptCurrent.map((user, index) => {
        return (
          <Person
            key={index}
            user={user}
            state={this.props.state}
            following={this.state.following}
            getFollowing={this.getFollowing}
            updateSelectedUser={this.updateSelectedUser}
          />
        );
      });
    } else {
      people = <h5> no users </h5>;
    }
    return (
      <div className="people-grid">
        <Card.Group itemsPerRow={3}>{people}</Card.Group>
        <Divider />
      </div>
    );
  }
}
