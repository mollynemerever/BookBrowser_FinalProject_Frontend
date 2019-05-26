import React, { Component } from "react";
import NavBar from "./navigationbar/NavBar.js";
import BookContainer from "./BookContainer.js";
import { Redirect } from "react-router-dom";

export default class MyBookList extends Component {
  state = {
    selectedUserId: this.props.state.currentUser.id
  };

  componentDidMount() {
    this.getUserBooks();
    console.log("problem");
  }

  // onClick = e => {
  //   e.preventDefault();
  //   this.getUserBooks();
  // };

  getUserBooks = () => {
    if (window.location.href.includes("profile")) {
      //profile view of books
      let url = `http://localhost:3001/users/${this.state.selectedUserId}`;
      fetch(url)
        .then(resp => resp.json())
        .then(data => {
          console.log("user", data[0].userbooks);
          this.setState({ userbooks: data[0].userbooks });
          this.getArrayOfUserBooks();
        });
    } else {
      //comes from google search
      let url = `http://localhost:3001/users/${
        this.props.state.currentUser.id
      }`;
      fetch(url)
        .then(resp => resp.json())
        .then(data => {
          console.log("user", data[0].userbooks);
          //this.props.updateUserBooks(data);
          this.setState({ userbooks: data[0].userbooks });
          this.getArrayOfUserBooks();
        });
    }
  };

  getArrayOfUserBooks = () => {
    console.log("get array");
    let bookObjects = [];
    this.state.userbooks.forEach(function(object) {
      bookObjects.push(object.book);
    });
    this.setState({ bookArray: bookObjects });
  };

  render() {
    if (!window.localStorage.user) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <NavBar
          state={this.props.state}
          responseGoogle={this.responseGoogle}
          handleLogout={this.props.handleLogout}
        />
        <main>
          <BookContainer
            selectedUserId={this.state.selectedUserId}
            user={this.props.state}
          />
        </main>
      </div>
    );
  }
}
