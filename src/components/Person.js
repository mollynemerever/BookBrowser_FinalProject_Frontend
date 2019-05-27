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
    let text;
    let imageLink;
    if (this.state.follow_status === true) {
      text = "UNFOLLOW";
    } else {
      text = "FOLLOW";
    }
    if (this.props.user.image === null) {
      imageLink = ProfilePic;
    } else {
      imageLink = this.props.user.image;
    }

    return (
      <Card>
        <Image src={imageLink} wrapped ui={false} />
        <Card.Content>
          <Card.Header
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
          <Card.Meta>
            <span className="date">Joined in {this.props.user.join_year}</span>
          </Card.Meta>
          <Card.Description>
            {this.props.user.industry} Industry.
          </Card.Description>

          <Button onClick={e => this.handleClick(e, this.props.user.id)}>
            {text}
          </Button>
        </Card.Content>
      </Card>
    );
  }
}
