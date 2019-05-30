import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ProfilePic from "../profilepic.png";
import "semantic-ui-css/semantic.min.css";
import { Card, Image, Button } from "semantic-ui-react";

export default class Person extends Component {
  state = {
    follow_status: ""
  };

  handleClick = (e, following_id) => {
    //create new following relationship in db
    e.preventDefault();
    let url = "http://localhost:3001/userfollowerrelationships";
    let config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: this.props.state.state.currentUser.id,
        following_id: following_id
      })
    };
    fetch(url, config)
      .then(resp => resp.json())
      .then(data => {
        if (data.id) {
          this.updateFollowState(true);
        } else {
          this.updateFollowState(false);
        }
      });
  };

  updateFollowState = status => {
    this.setState({ follow_status: status });
  };

  componentDidMount = () => {
    //set follow status
    let user = this.props.user.id;
    if (
      this.props.following.filter(relation => relation.following_id === user)
        .length > 0
    ) {
      this.setState({ follow_status: true });
    } else {
      this.setState({ follow_status: false });
    }
  };

  render() {
    let button;

    let imageLink;
    if (this.state.follow_status === true) {
      button = (
        <Button
          color="blue"
          onClick={e => this.handleClick(e, this.props.user.id)}
        >
          UNFOLLOW
        </Button>
      );
    } else {
      button = (
        <Button
          basic
          color="blue"
          onClick={e => this.handleClick(e, this.props.user.id)}
        >
          FOLLOW
        </Button>
      );
    }
    if (this.props.user.image === null) {
      imageLink = ProfilePic;
    } else {
      imageLink = this.props.user.image;
    }

    return (
      <Card color="blue" centered raised className="person">
        <Image className="prof-pic" src={imageLink} wrapped ui={false} />
        <Card.Content className="person-info">
          <div className="person-card-text">
            <Card.Header
              className="person-name"
              as={Link}
              to={{
                pathname: "/profile",
                state: {
                  selectedUser: this.props.user,
                  follow_status: this.state.follow_status
                }
              }}
            >
              {this.props.user.full_name}
            </Card.Header>
            <br />
            <Card.Meta>
              <span className="person-card-date">
                Joined in {this.props.user.join_year}
              </span>
            </Card.Meta>
            <br />
            <Card.Description>{this.props.user.industry}</Card.Description>
            <br />
          </div>
        </Card.Content>
        <Card.Content extra>{button}</Card.Content>
      </Card>
    );
  }
}
