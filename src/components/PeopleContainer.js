import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Person from "./Person.js";
import Profile from "./Profile.js";

export default class PeopleContainer extends Component {
  state = {
    usersExceptCurrent: "",
    following: "",
    selectedUser: ""
  };

  handleClick = e => {
    e.preventDefault();
    this.getFollowing();
    this.getAllUsers();
  };

  updateSelectedUser = selectedUser => {
    console.log("inside selected user");
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
    //debugger;
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
    // if (this.state.selectedUser !== "") {
    //   console.log(this.state.selectedUser);
    //   return (
    //     <Redirect
    //       to={{
    //         pathname: "/profile"
    //       }}
    //       state={{ hi: 99 }}
    //     />
    //   );
    // }

    console.log("render");
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
      <div>
        People Container
        <button onClick={this.handleClick}> get people </button>
        {people}
      </div>
    );
  }
}
