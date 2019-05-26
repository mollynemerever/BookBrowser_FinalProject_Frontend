import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import NavBar from "./navigationbar/NavBar.js";

export default class EditAccount extends Component {
  state = {
    editedFullName: this.props.state.currentUser.full_name,
    editedIndustry: this.props.state.currentUser.industry
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    let url = `http://localhost:3001/users/${this.props.state.currentUser.id}`;
    let config = {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: this.props.state.currentUser.id,
        full_name: this.state.editedFullName,
        industry: this.state.editedIndustry
      })
    };
    fetch(url, config).then(resp => {
      if (resp.statusText !== "Accepted") {
        alert("Error - Could Not Update User");
      } else {
        alert("Account Info Updated!");
      }
    });
  };

  render() {
    if (!window.localStorage.user) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <NavBar
          state={this.props.state}
          responseGoogle={this.responseGoogle}
          handleLogout={this.props.handleLogout}
        />
        <main>
          Edit Account
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                name="editedFullName"
                defaultValue={this.props.state.currentUser.full_name}
                // value={this.}
                onChange={this.handleChange}
              />
            </label>
            <label>
              Select your Professional Industry:
              <select
                name="editedIndustry"
                onChange={this.handleChange}
                defaultValue={"CURRENT"}
              >
                <option value="CURRENT" disabled>
                  {this.props.state.currentUser.industry}
                </option>
                <option value="Not Specified">Not Specified</option>
                <option value="Consulting">Consulting</option>
                <option value="Financial Services">Financial Services</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Higher Education">Higher Education</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Technology, Software, and Computer Services">
                  Technology, Software, and Computer Services
                </option>
                <option value="Marketing and Advertising">
                  Marketing and Advertising
                </option>
                <option value="Real Estate">Real Estate</option>
                <option value="Retail">Retail</option>
              </select>
            </label>

            <input type="submit" value="Submit" />
          </form>
        </main>
      </div>
    );
  }
}
