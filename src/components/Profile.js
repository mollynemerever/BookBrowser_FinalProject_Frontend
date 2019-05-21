import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import MyBookList from "./MyBookList.js";
import { withRouter } from "react-router";

class Profile extends Component {
  constructor(props) {
    super(props);
    console.log("location props", props);
    this.state = {
      userId: "testing",
      state: props.location && props.location.state
    };
  }

  componentDidMount() {
    console.log("mounted location state", this.props);
  }

  handleClick = e => {
    e.preventDefault();
    this.getProfile();
  };

  getProfile = () => {
    console.log("inside get profile");
    console.log(this.props.state.currentUser.first_name);
    console.log(this.props.location);
    debugger;
  };

  render() {
    if (this.props.state.isAuthenticated === false) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <button onClick={this.handleClick}> get profile </button>
      </div>
    );
  }
}

export default withRouter(Profile);
