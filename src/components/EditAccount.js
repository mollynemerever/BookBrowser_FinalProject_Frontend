import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class EditAccount extends Component {
  state = {
    full_name: "",
    image: "",
    industry: "-"
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    if (this.props.state.isAuthenticated === false) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        Edit Account
        <form>
          <input
            type="text"
            name="full_name"
            value={this.props.state.currentUser.full_name}
            onChange={this.handleChange}
          />
          <label>
            Select your Professional Industry:
            <select
              name="industry"
              value={this.state.value}
              onChange={this.handleChange}
            >
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
          <input type="text" value={this.props.state.currentUser.full_name} />
          <input type="text" value={this.props.state.currentUser.full_name} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
