import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Person extends Component {
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
        console.log(data);
        this.props.getFollowing();
      });
  };

  handleClick = () => {
    console.log("inside get profile");
  };

  render() {
    let user = this.props.user.id;
    let text;
    if (
      this.props.following.filter(relation => relation.following_id === user)
        .length > 0
    ) {
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
            state: { state: 99, foo: 88 }
          }}
        >
          {this.props.user.full_name}
        </Link>
        <img src={this.props.user.image} alt="chris" />
        <h5> industry: {this.props.user.industry} </h5>
        <h6> member since: {this.props.user.join_year} </h6>
        <button
          value={this.props.user.id}
          onClick={e => this.handleClick(e, this.props.user.id)}
        >
          {" "}
          {text}{" "}
        </button>
      </div>
    );
  }
}
