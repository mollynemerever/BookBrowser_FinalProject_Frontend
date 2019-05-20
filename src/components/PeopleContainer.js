import React, { Component } from "react";
import Person from "./Person.js";

export default class PeopleContainer extends Component {
  state = {
    usersExceptCurrent: ""
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
        return <Person key={index} user={user} state={this.props.state} />;
      });
    } else {
      people = <h5> no users </h5>;
    }
    return (
      <div>
        People Container
        <button onClick={this.getAllUsers}> get people </button>
        {people}
      </div>
    );
  }
}
