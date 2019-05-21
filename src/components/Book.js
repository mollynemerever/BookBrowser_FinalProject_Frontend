import React, { Component } from "react";

export default class Book extends Component {
  state = { inCollection: false };

  saveBook = e => {
    e.preventDefault();
    let url = "http://localhost:3001/books";
    let config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: this.props.book.title,
        author: this.props.book.authors,
        image: this.props.book.image,
        description: this.props.book.description,
        googleId: this.props.book.googleId
      })
    };

    fetch(url, config)
      .then(resp => resp.json())
      .then(data => {
        this.newUsersBooksInstance(data);
      });
  };

  newUsersBooksInstance = book => {
    //save to usersbooks table
    let url = "http://localhost:3001/userbooks";
    let config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: this.props.user.currentUser.id,
        book_id: book.id,
        read_status: false
      })
    };
    fetch(url, config);
    this.updateCollectionState();
  };

  updateCollectionState = () => {
    this.setState({ inCollection: true });
  };

  removeBook = deleteBook => {
    console.log(deleteBook);
    let url = `http://localhost:3001/userbooks/${deleteBook.id}`;
    let config = {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: deleteBook.id,
        user_id: this.props.state.currentUser.id
      })
    };
    fetch(url, config).then(() => {
      this.props.getUserBooks();
    });
  };

  getUserBookId = e => {
    e.preventDefault();
    let usersbooksArray = this.props.state.currentUser.userbooks;
    let book = this.props.book.id;
    let deleteBook;
    usersbooksArray.forEach(function(userbook) {
      if (userbook.book_id === book) deleteBook = userbook;
    });
    this.removeBook(deleteBook);
  };

  render() {
    let buttons;
    let image;
    let description;
    let text;

    if (this.state.inCollection === false) {
      text = "Save Book";
    } else {
      text = "In Your Collection";
    }

    if (window.location.href.includes("mybooklist")) {
      //comes from db
      buttons = (
        <div>
          <button onClick={this.getUserBookId}> Remove From List </button>
          <button> Read Book </button>
          <button> Add Comment </button>
        </div>
      );
    } else if (window.location.href.includes("profile")) {
      buttons = <h6> what should go here? </h6>;
    } else {
      //comes from google
      buttons = (
        <button id="saveBook" onClick={this.saveBook}>
          {" "}
          {text}{" "}
        </button>
      );
    }

    if (this.props.book.image !== undefined) {
      image = <img src={this.props.book.image} alt="book" />;
    } else {
      image = <h3>"image here"</h3>;
    }

    if (this.props.book.description !== undefined) {
      description = <p>{this.props.book.description}</p>;
    } else {
      description = <h3>"description here" </h3>;
    }
    return (
      <div className="book-box">
        <h4> {this.props.book.title} </h4>
        {image}
        <h5> {this.props.book.authors} </h5>
        {description}
        {buttons}
      </div>
    );
  }
}
