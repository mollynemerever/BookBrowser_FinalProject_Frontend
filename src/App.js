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
    isAuthenticated: false,
    userbooks: ""
  };

  handleLogin = user => {
    window.localStorage.setItem("user", JSON.stringify(user));
    window.localStorage.setItem("userbooks", JSON.stringify(user.userbooks));
    this.setState({
      currentUser: user,
      isAuthenticated: true,
      userbooks: user.userbooks
    });
  };

  handleLogout = () => {
    this.setState({ currentUser: "", isAuthenticated: false });
    window.localStorage.clear();
  };

  componentDidMount = () => {
    if (window.localStorage.user) {
      let user = JSON.parse(window.localStorage.getItem("user"));
      let userbooks = JSON.parse(window.localStorage.getItem("userbooks"));
      this.setState({
        isAuthenticated: true,
        currentUser: user,
        userbooks: userbooks
      });
    } else {
      window.localStorage.clear();
    }
  };

  updateUserBooks = userbook => {
    console.log("update userbooks");
    //address this later - has to do with saving from someone else's profile
    //this.setState({ userbooks: [...this.state.userbooks, userbook] });
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
              handleLogout={this.handleLogout}
              state={this.state}
            />
          )}
        />
        <Route
          exact
          path="/myinfluencers"
          component={() => (
            <Homepage state={this.state} handleLogout={this.handleLogout} />
          )}
        />
        <Route
          exact
          path="/editaccount"
          component={() => (
            <EditAccount
              state={this.state}
              handleLogin={this.handleLogin}
              handleLogout={this.handleLogout}
            />
          )}
        />
        <Route
          exact
          path="/searchinfluencers"
          component={() => (
            <SearchInfluencers
              state={this.state}
              handleLogout={this.handleLogout}
            />
          )}
        />
        <Route
          exact
          path="/searchbooks"
          component={() => (
            <SearchBooks state={this.state} handleLogout={this.handleLogout} />
          )}
        />
        <Route
          exact
          path="/profile"
          component={() => (
            <Profile
              state={this.state}
              updateUserBooks={this.updateUserBooks}
              handleLogout={this.handleLogout}
            />
          )}
        />
        <Route
          exact
          path="/mybooks"
          component={() => (
            <MyBookList
              state={this.state}
              handleLogout={this.handleLogout}
              updateUserBooks={this.updateUserBooks}
            />
          )}
        />
      </Router>
    );
  }
}
