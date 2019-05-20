import React, { Component } from "react";
import NavBar from "./navigationbar/NavBar.js";
import BookContainer from "./BookContainer.js";
import { Redirect } from "react-router-dom";

export default class MyBookList extends Component {
  state = { userbooks: "", source: "MyBookList", bookArray: "" };

  // componentDidMount() {
  //   this.getUserBooks();
  //   console.log("problem");
  // }

  onClick = e => {
    e.preventDefault();
    this.getUserBooks();
  };

  getUserBooks = () => {
    if (window.location.href.includes("profile")) {
      //comes from booklist
      let url = `http://localhost:3001/users/${
        this.props.state.state.currentUser.id
      }`;
      fetch(url)
        .then(resp => resp.json())
        .then(data => {
          console.log("user", data[0].userbooks);
          this.setState({ userbooks: data[0].userbooks });
          this.getArrayOfUserBooks();
        });
    } else {
      //comes from booklist
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
    let bookObjects = [];
    this.state.userbooks.forEach(function(object) {
      bookObjects.push(object.book);
    });
    this.setState({ bookArray: bookObjects });
  };

  render() {
    let books;
    if (this.props.state.isAuthenticated === false) {
      return <Redirect to="/" />;
    }
    if (this.state.bookArray !== "") {
      books = (
        <BookContainer
          state={this.props.state}
          source={this.state}
          getUserBooks={this.getUserBooks}
        />
      );
    } else {
      books = <h6> no books in your list! </h6>;
    }
    return (
      <div>
        <NavBar
          state={this.props.state}
          responseGoogle={this.responseGoogle}
          handleLogout={this.props.handleLogout}
        />
        <main>
          <p> book list detail page </p>
          <button onClick={this.onClick}> render </button>
          {books}
        </main>
      </div>
    );
  }
}
