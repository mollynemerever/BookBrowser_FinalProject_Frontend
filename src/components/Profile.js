import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import MyBookList from "./MyBookList.js";

export default class Profile extends Component {
  render() {
    if (this.props.state.isAuthenticated === false) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        Profile Page
        <img src={this.props.state.currentUser.image} alt="profile picture" />
        <h3>{this.props.state.currentUser.full_name} </h3>
        <h5> member since {this.props.state.currentUser.join_year} </h5>
        <button> follow </button>
        <MyBookList state={this.props} />
      </div>
    );
  }
}
