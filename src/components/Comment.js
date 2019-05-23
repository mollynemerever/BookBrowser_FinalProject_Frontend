import React, { Component } from "react";

export default class Comment extends Component {
  state = {
    bookId: this.props.bookId,
    userId: this.props.userId,
    commentId: this.props.commentObject.id,
    id: this.props.id,
    date: this.props.commentObject.updated_at,
    text: this.props.commentObject.text
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  editComment = e => {
    //post to comments table
    e.preventDefault();
    let url = `http://localhost:3001/comments/${this.state.commentId}`;
    let config = {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        comment_id: this.state.commentId,
        text: this.state.text
      })
    };
    fetch(url, config)
      .then(resp => resp.json())
      .then(() => {
        this.props.getBookCommentInstances(); //trigger rerender of page
      });
  };

  deleteComment = e => {
    //patch to comments table
    e.preventDefault();
    let url = `http://localhost:3001/comments/${this.state.commentId}`;
    let config = {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ comment_id: this.state.commentId })
    };
    fetch(url, config)
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        this.deleteUserCommentInstance();
      });
  };

  deleteUserCommentInstance = () => {
    let url = `http://localhost:3001/bookcommentusers/${this.state.id}`;
    let config = {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: this.state.id })
    };
    fetch(url, config)
      .then(resp => resp.json())
      .then(() => {
        this.props.getBookCommentInstances(); //trigger rerender of page
      });
  };
  render() {
    let existingComment = (
      <div>
        {" "}
        <textarea
          name="text"
          defaultValue={this.state.text}
          onChange={this.handleChange}
        />
        <button onClick={e => this.editComment(e)}> Edit Comment </button>
        <button onClick={e => this.deleteComment(e)}> Delete Comment </button>
      </div>
    );

    return <div>{existingComment}</div>;
  }
}
