import React, { Component } from "react";
import Book from "./Book.js";
import "semantic-ui-css/semantic.min.css";
import { Radio, Form, Grid } from "semantic-ui-react";

export default class BookContainer extends Component {
  state = {
    arrayOfBooks: "",
    filteredArray: "",
    readBooks: "",
    unreadBooks: ""
  };

  componentDidMount = () => {
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
      this.getBooks(userId);
    } else {
      //mybooklist, use localstorage.user id to fetch
      let userId = JSON.parse(window.localStorage.getItem("user")).id;
      this.getBooks(userId);
    }
  };
  //lose props upon refresh - so must save the selected user id to local storage

  componentDidUpdate = prevProps => {
    if (this.props.filter !== prevProps.filter && this.props.filter !== "all") {
      let userId = JSON.parse(window.localStorage.getItem("user")).id;
      this.getBooks(userId);
    }
  };

  getBooks = userId => {
    let url = `http://localhost:3001/users/${userId}`;
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
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
    this.filterBooks(array);
  };

  filterBooks = array => {
    let unfiltered = array;
    let unread = unfiltered.filter(book => book.read_status === false);
    this.setState({ unreadBooks: unread });
    let read = unfiltered.filter(book => book.read_status === true);
    this.setState({ readBooks: read });
  };

  render() {
    let display;
    let books;
    if (this.props.filter === "unread") {
      books = this.state.unreadBooks;
      return (display = books.map((book, index) => {
        return (
          <Book
            key={index}
            book={book}
            user={this.props.user}
            getBooks={this.getBooks}
            updateUserBooks={this.props.updateUserBooks}
          />
        );
      }));
    } else if (this.props.filter === "read") {
      books = this.state.readBooks;
      return (display = books.map((book, index) => {
        return (
          <Book
            key={index}
            book={book}
            user={this.props.user}
            getBooks={this.getBooks}
            updateUserBooks={this.props.updateUserBooks}
          />
        );
      }));
    } else if (this.state.arrayOfBooks.length > 0) {
      books = this.state.arrayOfBooks;
      return (display = books.map((book, index) => {
        return (
          <Book
            key={index}
            book={book}
            user={this.props.user}
            getBooks={this.getBooks}
            selectedUserId={this.props.selectedUserId}
            updateUserBooks={this.props.updateUserBooks}
          />
        );
      }));
    } else {
      display = <div className="book-box">No Books - Get Searchin'!</div>;
    }

    return <div>{display}</div>;
  }
}
