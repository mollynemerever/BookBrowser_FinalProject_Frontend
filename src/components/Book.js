import React, { Component } from "react";

export default class Book extends Component {
  render() {
    let image;
    let description;
    if (this.props.book.volumeInfo) {
      image = <img src={this.props.book.volumeInfo.imageLinks.thumbnail} />;
    }

    if (this.props.book.volumeInfo.description) {
      description = <p>{this.props.book.volumeInfo.description}</p>;
    }
    return (
      <div className="book-box">
        <h4> {this.props.book.volumeInfo.title} </h4>
        {image}
        <h5> {this.props.book.volumeInfo.authors} </h5>
        {description}
      </div>
    );
  }
}
