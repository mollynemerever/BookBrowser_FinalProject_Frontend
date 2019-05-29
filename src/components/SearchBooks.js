import React, { Component } from "react";
import NavBar from "./navigationbar/NavBar.js";
import BookContainer from "./BookContainer.js";
import { Redirect } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Button, Form, Input, Header, Icon } from "semantic-ui-react";

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
    searchResults.forEach(object => {
      let bookObject = {};
      bookObject.title = object.volumeInfo.title;
      //debugger;
      //bookObject.authors = object.volumeInfo.authors[0];
      bookObject.description = object.volumeInfo.description;
      bookObject.googleId = object.id;

      if (object.volumeInfo.authors !== undefined) {
        bookObject.authors = object.volumeInfo.authors[0];
      } else {
        bookObject.authors = null;
      }

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
        <div className="search-header">
          <Form.Group centered className="search-form">
            <Header size="large">
              <Icon name="search" />
              <Header.Content>
                {" "}
                Search for books by Author or Title{" "}
              </Header.Content>
            </Header>
            <br />
            <Form centered>
              <Form.Field centered inline>
                <label>Search Here:</label>
                <Input
                  inline
                  placeholder="author or title"
                  onChange={this.handleChange}
                  value={this.state.searchTerm}
                  width={5}
                />
              </Form.Field>

              <Form.Field>
                <Button color="blue" type="submit" onClick={this.searchGoogle}>
                  Search
                </Button>
              </Form.Field>
            </Form>
          </Form.Group>
        </div>
        {books}
      </div>
    );
  }
}
