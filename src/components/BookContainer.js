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

  componentDidUpdate = prevProps => {
    if (this.props.filter !== prevProps.filter && this.props.filter !== "all") {
      let userId = JSON.parse(window.localStorage.getItem("user")).id;
      this.getBooks(userId);
    }
  };

  getBooks = userId => {
    console.log("inside get books");
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
    console.log("filtered unread", unread);
    this.setState({ unreadBooks: unread });

    let read = unfiltered.filter(book => book.read_status === true);
    console.log("filtered read", read);
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
    } else if (this.state.arrayOfBooks !== "") {
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
      display = <h6> no books </h6>;
    }

    // if (this.props.filter !== "all" && this.state.filteredArray !== "") {
    //   books = this.state.filteredArray;
    //   console.log("filter", this.props.filter);
    //   console.log("filtered array state", this.state.filteredArray);
    //   console.log("books variable to be mapped", books);
    //   return (display = books.map((book, index) => {
    //     return (
    //       <Book
    //         key={index}
    //         book={book}
    //         user={this.props.user}
    //         getBooks={this.getBooks}
    //         updateUserBooks={this.props.updateUserBooks}
    //       />
    //     );
    //   }));
    // }

    return <div>{display}</div>;
  }
}
