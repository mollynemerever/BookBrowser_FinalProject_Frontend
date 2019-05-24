import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import NavBar from "./navigationbar/NavBar.js";
import BookContainer from "./BookContainer.js";
import ProfilePic from '../profilepic.png'
import { withRouter } from "react-router";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUser: props.location.state.selectedUser,
      follow_status: props.location.state.follow_status
    };
  }

  handleClick(e, following_id) {
    //create or delete relationship
    e.preventDefault();
    let url = "http://localhost:3001/userfollowerrelationships";
    let config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: this.props.state.currentUser.id,
        following_id: following_id
      })
    };
    fetch(url, config)
      .then(resp => resp.json())
      .then(data => {
        this.updateFollowStatus(data);
      });
  }

  updateFollowStatus = relationship => {
    if (relationship.message) {
      this.setState({ follow_status: false });
    } else {
      this.setState({ follow_status: true });
    }
  };

  render() {
    let imageLink

    if(this.state.selectedUser.image === null){
      imageLink = ProfilePic
    } else {
      imageLink = this.state.selectedUser.image
    }

    if (this.props.state.isAuthenticated === false) {
      return <Redirect to="/" />;
    }

    let button;
    if (this.state.selectedUser.id !== this.props.state.currentUser.id) {
      if (this.state.follow_status !== true) {
        button = (
          <button
            onClick={e => this.handleClick(e, this.state.selectedUser.id)}
          >
            {" "}
            FOLLOW{" "}
          </button>
        );
      } else {
        button = (
          <button
            onClick={e => this.handleClick(e, this.state.selectedUser.id)}
          >
            {" "}
            UNFOLLOW{" "}
          </button>
        );
      }
    } else {
      button = undefined;
    }

    return (
      <div>
        <NavBar
          state={this.props.state}
          responseGoogle={this.responseGoogle}
          handleLogout={this.props.handleLogout}
        />
        <main>
          <img src={imageLink} alt="user" />
          <h3> {this.state.selectedUser.full_name}</h3>
          <h5> member since {this.state.selectedUser.join_year} </h5>
          {button}
          <BookContainer
            selectedUserId={this.state.selectedUser.id}
            user={this.props.state}
          />
        </main>
      </div>
    );
  }
}

export default withRouter(Profile);
