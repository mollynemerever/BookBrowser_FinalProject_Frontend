import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Person extends Component {
  state = {
    follow_status: ""
  };

  handleClick = (e, following_id) => {
    //create new relationship in db
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
        this.props.getFollowing();
      });
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
    if (this.state.follow_status === true) {
      text = "UNFOLLOW";
    } else {
      text = "FOLLOW";
    }

    return (
      <div className="person">
        {" "}
        persons:
        <Link
          to={{
            pathname: "/profile",
            state: {
              selectedUser: this.props.user,
              follow_status: this.state.follow_status
            }
          }}
        >
          {this.props.user.full_name}
        </Link>
        <img src={this.props.user.image} alt="user" />
        <h5> industry: {this.props.user.industry} </h5>
        <h6> member since: {this.props.user.join_year} </h6>
        <button onClick={e => this.handleClick(e, this.props.user.id)}>
          {" "}
          {text}{" "}
        </button>
      </div>
    );
  }
}
