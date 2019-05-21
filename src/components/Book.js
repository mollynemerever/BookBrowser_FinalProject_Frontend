import React, { Component } from "react";

export default class Book extends Component {
  state = {
    inCollection: this.props.book.inCollection,
    readStatus: this.props.book.read_status
  };

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
    this.updateCollectionState(true);
  };

  updateCollectionState = status => {
    this.setState({ inCollection: status });
  };

  updateReadState = readStatus => {
    this.setState({ readStatus: readStatus });
  };

  removeBook = (e, userbookId) => {
    e.preventDefault();
    let url = `http://localhost:3001/userbooks/${userbookId}`;
    let config = {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: userbookId
      })
    };
    fetch(url, config).then(() => this.props.getBooks());
  };

  updateReadStatus = (e, userbookId) => {
    e.preventDefault();
    //console.log("userbookId", userbookId);
    let url = `http://localhost:3001/userbooks/${userbookId}`;
    let config = {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: userbookId,
        read_status: !this.state.readStatus
      })
    };
    fetch(url, config)
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        this.updateReadState(data.read_status);
      });
  };

  render() {
    let buttons;
    let image;
    let description;
    let text;
    let readStatus;

    if (
      this.state.inCollection === true &&
      !window.location.href.includes("searchbooks")
    ) {
      text = "Remove From Your Collection";
    } else if (this.state.inCollection === true) {
      text = "In Your Collection";
    } else {
      text = "Save Book";
    }

    if (this.state.readStatus === true) {
      readStatus = "Status: Read";
    } else {
      readStatus = "Status: Unread";
    }

    if (window.location.href.includes("mybooklist")) {
      //comes from db
      buttons = (
        <div>
          <button onClick={e => this.removeBook(e, this.props.book.userbookId)}>
            {" "}
            {text}{" "}
          </button>
          <button
            onClick={e => this.updateReadStatus(e, this.props.book.userbookId)}
          >
            {" "}
            {readStatus}{" "}
          </button>
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
