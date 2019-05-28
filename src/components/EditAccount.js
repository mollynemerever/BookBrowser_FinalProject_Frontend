import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import NavBar from "./navigationbar/NavBar.js";
import "semantic-ui-css/semantic.min.css";
import { Dropdown, Button, Input, Form, Header, Icon } from "semantic-ui-react";

export default class EditAccount extends Component {
  state = {
    editedFullName: this.props.state.currentUser.full_name,
    editedIndustry: this.props.state.currentUser.industry,
    editedEmail: this.props.state.currentUser.email
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
    const industries = [
      { key: "Not Specified", text: "Not Specified", value: "Not Specified" },
      { key: "Consulting", text: "Consulting", value: "Consulting" },
      {
        key: "Financial Services",
        text: "Financial Services",
        value: "Financial Services"
      },
      { key: "Healthcare", text: "Healthcare", value: "Healthcare" },
      {
        key: "Higher Education",
        text: "Higher Education",
        value: "Higher Education"
      },
      {
        key: "Technology, Software, and Computer Services",
        text: "Technology, Software, and Computer Services",
        value: "Technology, Software, and Computer Services"
      },
      {
        key: "Marketing and Advertising",
        text: "Marketing and Advertising",
        value: "Marketing and Advertising"
      },
      { key: "Real Estate", text: "Real Estate", value: "Real Estate" },
      { key: "Retail", text: "Retail", value: "Retail" }
    ];
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

        <div className="edit-account">
          <Form.Group>
            <Header size="large">
              <Icon name="settings" />
              <Header.Content> Edit Account </Header.Content>
            </Header>
            <br />
            <Form
              className="edit-form"
              centered
              widths="equal"
              onSubmit={this.handleSubmit}
            >
              <Form.Field inline>
                <label>Name:</label>
                <Input
                  placeholder={this.props.state.currentUser.full_name}
                  name="editedFullName"
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field inline>
                <label>Email:</label>
                <Input
                  placeholder={this.props.state.currentUser.email}
                  name="editedEmail"
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label inline>Industry: </label>
                <Dropdown
                  inline={true}
                  name="editedIndustry"
                  onChange={this.handleChange}
                  selection
                  defaultValue={this.props.state.currentUser.industry}
                  options={industries}
                />
              </Form.Field>

              <Button color="blue" type="submit" value="Submit">
                Save Changes
              </Button>
            </Form>
          </Form.Group>
        </div>
      </div>
    );
  }
}
