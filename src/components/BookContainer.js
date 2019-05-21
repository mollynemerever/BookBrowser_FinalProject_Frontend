import React, { Component } from "react";
import Book from "./Book.js";

export default class BookContainer extends Component {
  state = { arrayOfBooks: "" };

  handleClick = e => {
    e.preventDefault();
    if (window.location.href.includes("searchbooks")) {
      this.setState({ arrayOfBooks: this.props.bookArray });
    } else {
      this.getBooks();
    }
  };

  getBooks = () => {
    let url = `http://localhost:3001/users/${this.props.selectedUserId}`;
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        this.updateArrayOfBooks(data[0].userbooks);
        console.log(data[0]);
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

    return (
      <div>
        books will be mapped here
        <button onClick={e => this.handleClick(e)}> get books </button>
        {display}
      </div>
    );
  }
}
