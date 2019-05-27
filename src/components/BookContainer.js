import React, { Component } from "react";
import Book from "./Book.js";

export default class BookContainer extends Component {
  state = { arrayOfBooks: "" };

  componentDidMount = () => {
    console.log("book container mounted");
    if (window.location.href.includes("searchbooks")) {
      //bookarray passed from searchbooks component
      this.setState({ arrayOfBooks: this.props.bookArray });
    } else if (window.location.href.includes("profile")) {
      //comes profile save selecteduserId to local storage
      window.localStorage.setItem(
        "profile",
        JSON.stringify(this.props.selectedUserId)
      );
      let userId = JSON.parse(window.localStorage.getItem("profile"));
      console.log("userId from local storage", userId);
      this.getBooks(userId);
    } else {
      //mybooklist, use localstorage.user id to fetch
      let userId = JSON.parse(window.localStorage.getItem("user")).id;
      this.getBooks(userId);
    }
  };
  //lose props upon refresh - so must save the selected user id to local storage

  getBooks = userId => {
    console.log("inside get books line 22");
    let url = `http://localhost:3001/users/${userId}`;
    //debugger;
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        //debugger;
        console.log(data);
        this.updateArrayOfBooks(data[0].userbooks);
      });
  };

  updateArrayOfBooks = arrayOfObjects => {
    let array = [];

    arrayOfObjects.forEach(function(object) {
      let bookObject = Object.assign(
        { read_status: object.read_status },
        { userbookId: object.id },
        { inCollection: true }, //comes from db
        object.book
      );
      array.push(bookObject);
    });

    this.setState({ arrayOfBooks: array });
  };

  render() {
    let display;
    let books = this.state.arrayOfBooks;
    if (books !== "") {
      return (display = books.map((book, index) => {
        return (
          <Book
            key={index}
            book={book}
            user={this.props.user}
            getBooks={this.getBooks}
          />
        );
      }));
    }

    return <div>{display}</div>;
  }
}
