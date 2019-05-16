import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Login from "./components/Login.js";
import Homepage from "./components/Homepage.js";
import EditAccount from "./components/EditAccount.js";
import SearchInfluencers from "./components/SearchInfluencers.js";
import SearchBooks from "./components/SearchBooks.js";
import Profile from "./components/Profile.js";
import MyBookList from "./components/MyBookList.js";

export default class App extends Component {
  state = {
    currentUser: "",
    isAuthenticated: false
  };

  handleLogin = user => {
    this.setState({ currentUser: user, isAuthenticated: true });
  };

  handleLogout = () => {
    this.setState({ currentUser: "", isAuthenticated: false });
  };

  render() {
    return (
      <Router>
        <Route
          exact
          path="/"
          component={() => (
            <Login
              handleLogin={this.handleLogin}
              isAuthenticated={this.state.isAuthenticated}
            />
          )}
        />
        <Route
          exact
          path="/homepage"
          component={() => <Homepage handleLogout={this.handleLogout} />}
        />
        <Route exact path="/editaccount" component={EditAccount} />
        <Route exact path="/searchinfluencers" component={SearchInfluencers} />
        <Route exact path="/searchbooks" component={SearchBooks} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/mybooklist" component={MyBookList} />
      </Router>
    );
  }
}
