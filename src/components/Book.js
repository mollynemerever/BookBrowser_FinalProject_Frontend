import React, { Component } from "react";
import CommentContainer from "./CommentContainer.js";
import BookPic from "../book.png";
import "semantic-ui-css/semantic.min.css";
import { Image, Item, Button, Divider } from "semantic-ui-react";

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
    let description;
    let text;
    let readStatus;
    let imageLink;

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

    if (this.props.book.image === null) {
      imageLink = BookPic;
    } else {
      imageLink = this.props.book.image;
    }

    if (window.location.href.includes("mybooklist")) {
      //comes from db
      buttons = (
        <div>
          <Button
            basic
            color="blue"
            onClick={e => this.removeBook(e, this.props.book.userbookId)}
          >
            {" "}
            {text}{" "}
          </Button>
          <Button
            basic
            color="blue"
            onClick={e => this.updateReadStatus(e, this.props.book.userbookId)}
          >
            {" "}
            {readStatus}{" "}
          </Button>
          <br />
          <CommentContainer
            bookId={this.props.book.id}
            userId={this.props.user.currentUser.id}
          />
        </div>
      );
    } else if (window.location.href.includes("profile")) {
      buttons = null;
    } else {
      //comes from google
      buttons = (
        <Button basic color="blue" id="saveBook" onClick={this.saveBook}>
          {" "}
          {text}{" "}
        </Button>
      );
    }

    if (this.props.book.description !== undefined) {
      description = <p>{this.props.book.description}</p>;
    } else {
      description = <h3>"description here" </h3>;
    }
    return (
      <div className="book-box">
        <Item.Group divided>
          <Item>
            <Item.Image size="tiny" src={imageLink} />
            <Item.Content verticalAlign="middle">
              <Item.Header>{this.props.book.title}</Item.Header>
              <Item.Meta>{this.props.book.author}</Item.Meta>
              <Item.Description> {description} </Item.Description>
              <Item.Extra>{buttons} </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
        <Divider />
      </div>
    );
  }
}
