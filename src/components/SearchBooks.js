import React, { Component } from "react";
import NavBar from "./navigationbar/NavBar.js";
import BookContainer from "./BookContainer.js";
import { Redirect } from "react-router-dom";

export default class SearchBooks extends Component {
  state = { searchTerm: "", bookArray: "", source: "SearchBooks" };

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
        let searchResults = data.items;
        this.formatBookArray(searchResults);
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
    if (this.props.state.isAuthenticated === false) {
      return <Redirect to="/" />;
    }
    let books;
    if (this.state.bookArray !== "") {
      books = <BookContainer state={this.props.state} source={this.state} />;
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
          <p> search books </p>
          <form>
            <input
              type="text"
              value={this.state.searchTerm}
              onChange={this.handleChange}
              placeholder="author or title"
            />
            <input type="submit" value="Search" onClick={this.searchGoogle} />
          </form>
          {books}
        </main>
      </div>
    );
  }
}
