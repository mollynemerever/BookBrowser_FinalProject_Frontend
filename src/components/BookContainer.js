import React, { Component } from "react";
import Book from "./Book.js";

export default class BookContainer extends Component {
  render() {
    let display;

    if (this.props.source.source === "MyBookList") {
      display = <h2> will render from my booklist </h2>;
    }

    if (this.props.source.source === "SearchBooks") {
      display = <h2> will render from my searchbooks </h2>;
    }
    return (
      <div>
        books will be mapped here
        {display}
        {this.props.source.bookArray.map((book, index) => {
          return <Book key={index} book={book} />;
        })}
      </div>
    );
  }
}
