import React, { Component } from "react";
import NavBar from "./navigationbar/NavBar.js";
import { Redirect } from "react-router-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Button, Card, Image, Header } from "semantic-ui-react";

export default class Homepage extends Component {
  state = {
    bookCount: this.props.state.currentUser.userbooks,
    user_followIds: "",
    userFollowsDetail: ""
  };

  componentDidMount = () => {
    this.fetchFollowing();
  };

  fetchFollowing = () => {
    let url = "http://localhost:3001/userfollowerrelationships";
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        this.filterFollowing(data);
      });
  };

  filterFollowing = relationships => {
    let iFollow = [];
    relationships.forEach(object => {
      if (object.user_id === this.props.state.currentUser.id) {
        iFollow.push(object.following_id);
      }
    });
    this.setState({ user_followIds: iFollow });
    this.getFollowingUserInfo(iFollow);
  };

  getFollowingUserInfo = array => {
    array.forEach(id => {
      let url = `http://localhost:3001/users/${id}`;
      fetch(url)
        .then(resp => resp.json())
        .then(data => {
          this.setState({
            userFollowsDetail: [...this.state.userFollowsDetail, data[0]]
          });
        });
    });
  };

  handleClick = (e, following_id) => {
    //remove following relationship in db
    e.preventDefault();
    this.setState({ user_followIds: "", userFollowsDetail: "" });
    let url = "http://localhost:3001/userfollowerrelationships";
    let config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: this.props.state.currentUser.id,
        following_id: following_id
      })
    };
    fetch(url, config)
      .then(resp => resp.json())
      .then(() => {
        this.fetchFollowing();
      });
  };

  render() {
    let people;
    if (!window.localStorage.user) {
      return <Redirect to="/" />;
    }
    if (this.state.userFollowsDetail !== "") {
      people = this.state.userFollowsDetail.map((person, index) => {
        return (
          <Card centered raised color="blue" className="person" key={index}>
            <Image src={person.image} className="prof-pic" wrapped ui={false} />
            <Card.Content className="person-info">
              <div className="person-card-text">
                <Card.Header
                  className="person-name"
                  as={Link}
                  to={{
                    pathname: "/profile",
                    state: {
                      selectedUser: person,
                      follow_status: true
                    }
                  }}
                >
                  {person.full_name}
                </Card.Header>
                <br />
                <Card.Meta>
                  <span className="person-card-date">
                    Joined in {person.join_year}
                  </span>
                </Card.Meta>
                <br />
                <Card.Description>{person.industry}</Card.Description>
                <br />
              </div>
            </Card.Content>
            <Card.Content extra>
              <Button
                onClick={e => this.handleClick(e, person.id)}
                color="blue"
              >
                {" "}
                UNFOLLOW{" "}
              </Button>
            </Card.Content>
          </Card>
        );
      });
    } else {
      people = null;
    }

    return (
      <div>
        <NavBar
          state={this.props.state}
          responseGoogle={this.responseGoogle}
          handleLogout={this.props.handleLogout}
        />
        <main>
          <div className="people-i-follow">
            <Card.Group itemsPerRow={3}>{people}</Card.Group>
          </div>
        </main>
      </div>
    );
  }
}
