import React, { Component } from "react";
import Book from "./Book.js";

export default class BookContainer extends Component {
  render() {
    debugger;
    return (
      <div>
        books will be mapped here
        {this.props.results.map((book, index) => {
          return <Book key={index} book={book} />;
        })}
      </div>
    );
  }
}
