import React, { Component } from "react";
import NavBar from "./navigationbar/NavBar.js";
import BookContainer from "./BookContainer.js";
import { Redirect } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Button, Form } from "semantic-ui-react";

export default class SearchBooks extends Component {
  state = { searchTerm: "", bookArray: "" };

  handleChange = event => {
    //handle user input for searchTerm
    this.setState({ searchTerm: event.target.value });
  };

  searchGoogle = e => {
    //pull from google api
    e.preventDefault();
    let url = `https://www.googleapis.com/books/v1/volumes?q=${
      this.state.searchTerm
    }&maxResults=40`;
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        this.setState({ searchTerm: "" });
        this.formatBookArray(data.items);
      });
  };

  formatBookArray = searchResults => {
    let array = [];
    searchResults.forEach(function(object) {
      let bookObject = {};
      bookObject.title = object.volumeInfo.title;
      bookObject.authors = object.volumeInfo.authors;
      bookObject.description = object.volumeInfo.description;
      bookObject.googleId = object.id;
      if (object.volumeInfo.imageLinks !== undefined) {
        bookObject.image = object.volumeInfo.imageLinks.thumbnail;
      } else {
        bookObject.image = null;
      }
      array.push(bookObject);
    });
    this.setState({ bookArray: array });
  };

  render() {
    if (!window.localStorage.user) {
      return <Redirect to="/" />;
    }
    let books;
    if (this.state.bookArray !== "") {
      books = (
        <BookContainer
          bookArray={this.state.bookArray}
          user={this.props.state}
        />
      );
    } else {
      books = undefined;
    }
    return (
      <div>
        <NavBar
          state={this.props.state}
          responseGoogle={this.responseGoogle}
          handleLogout={this.props.handleLogout}
        />
        <main>
          <Form className="search-form">
            <Form.Input
              label="Search Here:"
              placeholder="author or title"
              onChange={this.handleChange}
              value={this.state.searchTerm}
              width={5}
            />
            <Button type="submit" onClick={this.searchGoogle}>
              Search
            </Button>
          </Form>

          {books}
        </main>
      </div>
    );
  }
}
