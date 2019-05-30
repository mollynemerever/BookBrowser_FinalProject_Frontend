import React, { Component } from "react";
import CommentContainer from "./CommentContainer.js";
import BookPic from "../book.png";
import "semantic-ui-css/semantic.min.css";
import { Image, Item, Button, Modal, Confirm, Radio } from "semantic-ui-react";

export default class Book extends Component {
  state = {
    inCollection: this.props.book.inCollection,
    confirmDelete: false,
    inCurrentUserbooks: false,
    readStatus: this.props.book.read_status
  };

  componentDidMount = () => {
    let currentUserbooks = this.props.user.userbooks;
    currentUserbooks.forEach(book => {
      if (book.book_id === this.props.book.id) {
        this.setState({ inCurrentUserbooks: true });
      }
    });
  };

  componentDidUpdate = prevProps => {
    if (this.props.book.read_status !== prevProps.book.read_status) {
      this.setState({ readStatus: this.props.book.read_status });
    }
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

  updateInCurrentUsersBooks = () => {
    this.setState({ inCurrentUserbooks: true });
  };

  updateCollectionState = status => {
    this.setState({ inCollection: status });
  };

  updateReadState = () => {
    this.setState({ readStatus: !this.state.readStatus });
  };

  openConfirm = () => {
    //opens confirm modal
    this.setState({ confirmDelete: true });
  };

  closeConfirm = () => {
    //closes confirm modal
    this.setState({ confirmDelete: false });
  };

  removeBook = (e, userbookId) => {
    e.preventDefault();
    this.closeConfirm();
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
    fetch(url, config).then(() =>
      this.props.getBooks(this.props.user.currentUser.id)
    );
  };

  updateReadStatus = (e, userbookId) => {
    e.preventDefault();
    this.updateReadState();
    let url = `http://localhost:3001/userbooks/${userbookId}`;
    let config = {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: userbookId,
        read_status: !this.props.book.read_status
      })
    };
    fetch(url, config);
    //call get books to rerender entire book list after updating state
  };

  saveBookToAnotherUser = e => {
    //fired when user saves book to their list from another profile
    let currentUser = this.props.user.currentUser.id;
    let url = "http://localhost:3001/userbooks";
    let config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: currentUser,
        book_id: this.props.book.id,
        read_status: false
      })
    };
    fetch(url, config)
      .then(resp => resp.json())
      .then(data => {
        this.props.updateUserBooks(data);
        this.updateInCurrentUsersBooks();
      });
    //need to fetch current users list so when they come back to this page
    //the buttons will render correctly
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
      readStatus = (
        <Button
          color="blue"
          onClick={e => this.updateReadStatus(e, this.props.book.userbookId)}
        >
          Read
        </Button>
      );
    } else {
      readStatus = (
        <Button
          basic
          color="blue"
          onClick={e => this.updateReadStatus(e, this.props.book.userbookId)}
        >
          Unread
        </Button>
      );
    }

    if (this.props.book.image === null) {
      imageLink = BookPic;
    } else {
      imageLink = this.props.book.image;
    }

    if (window.location.href.includes("mybooks")) {
      //comes from db
      buttons = (
        <div>
          <br />
          {readStatus}
          <br />
          <br />
          <Button color="blue" onClick={this.openConfirm}>
            {" "}
            {text}{" "}
          </Button>
          <Confirm
            open={this.state.confirmDelete}
            onCancel={this.closeConfirm}
            onConfirm={e => this.removeBook(e, this.props.book.userbookId)}
          />
          <br />
          <br />
          <CommentContainer
            bookId={this.props.book.id}
            userId={this.props.user.currentUser.id}
          />
        </div>
      );
    } else if (
      window.location.href.includes("profile") &&
      this.props.user.currentUser.id !== this.props.selectedUserId
    ) {
      //you are viewing someone elses prof

      if (this.state.inCurrentUserbooks === false) {
        buttons = (
          <Button color="blue" onClick={this.saveBookToAnotherUser}>
            {" "}
            Save To My List{" "}
          </Button>
        );
      } else {
        buttons = <Button color="blue"> In Your Collection </Button>;
      }
    } else if (window.location.href.includes("profile")) {
      buttons = null; //you are viewing your own profile
    } else {
      //comes from google
      buttons = (
        <Button color="blue" id="saveBook" onClick={this.saveBook}>
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
            <Item.Image size="small" src={imageLink} />
            <Item.Content verticalAlign="middle">
              <Item.Header>{this.props.book.title}</Item.Header>
              <Item.Meta> {this.props.book.author}</Item.Meta>

              <Modal
                trigger={<Button color="blue">Description</Button>}
                centered={true}
              >
                <Modal.Header>{this.props.book.title}</Modal.Header>
                <Modal.Content image>
                  <Image wrapped size="medium" src={imageLink} />
                  <Modal.Description>
                    <Modal.Header>{this.props.book.authors}</Modal.Header>
                    <p>{description} </p>
                  </Modal.Description>
                </Modal.Content>
              </Modal>
              <Item.Extra>{buttons} </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </div>
    );
  }
}
