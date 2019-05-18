import React, { Component } from "react";
import NavBar from "./navigationbar/NavBar.js";
import BookContainer from "./BookContainer.js";
import { Redirect } from "react-router-dom";

export default class SearchBooks extends Component {
  state = { searchTerm: "", searchResults: "", source: "SearchBooks" };

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
        this.setState({ searchResults: data.items, searchTerm: "" });
      });
  };

  render() {
    if (this.props.state.isAuthenticated === false) {
      return <Redirect to="/" />;
    }
    let books;
    if (this.state.searchResults !== "") {
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
