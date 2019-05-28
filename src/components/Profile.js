import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import NavBar from "./navigationbar/NavBar.js";
import BookContainer from "./BookContainer.js";
import ProfilePic from "../profilepic.png";
import { withRouter } from "react-router";
import "semantic-ui-css/semantic.min.css";
import { Card, Image, Button } from "semantic-ui-react";

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
    let imageLink;

    if (this.state.selectedUser.image === null) {
      imageLink = ProfilePic;
    } else {
      imageLink = this.state.selectedUser.image;
    }

    if (!window.localStorage.user) {
      return <Redirect to="/" />;
    }

    let button;
    if (this.state.selectedUser.id !== this.props.state.currentUser.id) {
      if (this.state.follow_status !== true) {
        button = (
          <Button
            basic
            color="blue"
            onClick={e => this.handleClick(e, this.state.selectedUser.id)}
          >
            {" "}
            FOLLOW{" "}
          </Button>
        );
      } else {
        button = (
          <Button
            basic
            color="blue"
            onClick={e => this.handleClick(e, this.state.selectedUser.id)}
          >
            {" "}
            UNFOLLOW{" "}
          </Button>
        );
      }
    }

    return (
      <div>
        <NavBar
          state={this.props.state}
          responseGoogle={this.responseGoogle}
          handleLogout={this.props.handleLogout}
        />

        <Card centered raised className="profile-person">
          <Image src={imageLink} wrapped ui={true} />
          <Card.Content className="prof-card-content">
            <Card.Header>{this.state.selectedUser.full_name}</Card.Header>
            <Card.Meta>
              <span className="date">
                Joined in {this.state.selectedUser.join_year}
              </span>
            </Card.Meta>
            <Card.Description>
              {this.state.selectedUser.industry}
            </Card.Description>{" "}
            <br />
            {button}
          </Card.Content>
        </Card>
        <BookContainer
          selectedUserId={this.state.selectedUser.id}
          user={this.props.state}
        />
      </div>
    );
  }
}

export default withRouter(Profile);
