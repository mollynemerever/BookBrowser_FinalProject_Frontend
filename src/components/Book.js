import React, { Component } from "react";

export default class Book extends Component {
  saveBook = e => {
    console.log("inside save book");
    e.preventDefault();
    let url = "http://localhost:3001/books";
    let config = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: this.props.book.volumeInfo.title,
        author: this.props.book.volumeInfo.authors,
        image: this.props.book.volumeInfo.imageLinks.thumbnail,
        description: this.props.book.volumeInfo.description,
        googleId: this.props.book.id
      })
    };

    fetch(url, config)
    .then(resp => resp.json())
    .then(data => {
      console.log(data);
    });
  };

  render() {
    let image;
    let description;
    
    if (this.props.book.volumeInfo.imageLinks !== undefined) {
      image = <img src={this.props.book.volumeInfo.imageLinks.thumbnail} />;
    } else {
      image = <h3>"image here"</h3>
    }

    if (this.props.book.volumeInfo.description !== undefined) {
      description = <p>{this.props.book.volumeInfo.description}</p>;
    } else {
      description = <h3>"description here" </h3>
    }
    return (
      <div className="book-box">
        <h4> {this.props.book.volumeInfo.title} </h4>
        {image}
        <h5> {this.props.book.volumeInfo.authors} </h5>
        {description}
        <button onClick={this.saveBook}> Save Book </button>
      </div>
    );
  }
}
