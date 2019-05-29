import React, { Component } from "react";
import NavBar from "./navigationbar/NavBar.js";
import BookContainer from "./BookContainer.js";
import { Redirect } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Radio, Form, Icon, Header } from "semantic-ui-react";

export default class MyBookList extends Component {
  state = {
    selectedUserId: this.props.state.currentUser.id,
    //selected user is current user bc list only viewable to user
    value: "all"
    //value of books selected to view (read, unread, all)
  };

  handleChange = (e, { value }) => {
    this.setState({ value });
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
          <div className="booklist-actions">
            <Form.Group className="booklist-form">
              <Header size="large">
                <Icon name="book" />
                <Header.Content> My Books </Header.Content>
              </Header>
              <br />
              <Form centered>
                <Form.Field>
                  <b>Display Books:</b>
                </Form.Field>
                <Form.Field>
                  <Radio
                    label="All Books"
                    value="all"
                    checked={this.state.value === "all"}
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    label="Read Books"
                    value="read"
                    checked={this.state.value === "read"}
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    label="Unread Books"
                    value="unread"
                    checked={this.state.value === "unread"}
                    onChange={this.handleChange}
                  />
                </Form.Field>
              </Form>
            </Form.Group>
          </div>
          <BookContainer
            selectedUserId={this.state.selectedUserId}
            user={this.props.state}
            filter={this.state.value}
          />
        </main>
      </div>
    );
  }
}
