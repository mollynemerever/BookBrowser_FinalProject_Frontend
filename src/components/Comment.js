import React, { Component } from "react";

export default class Comment extends Component {
  state = {
    bookId: this.props.bookId,
    userId: this.props.userId,
    commentId: this.props.comment.id,
    date: this.props.updated_at,
    text: this.props.comment.text
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createComment = e => {
    e.preventDefault();
    let url = "http://localhost:3001/comments";
    let config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: this.state.text
      })
    };
    fetch(url, config)
      .then(resp => resp.json())
      .then(data => {
        //console.log(data);
        this.createCommentBookInstance(data.id);
      });
    this.setState({ text: "" });
  };

  createCommentBookInstance = commentId => {
    let url = "http://localhost:3001/bookcommentusers";
    let config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: this.state.userId,
        book_id: this.state.bookId,
        comment_id: commentId
      })
    };
    fetch(url, config)
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        console.log(this);
      });
  };

  editComment = e => {
    e.preventDefault();
    console.log("inside edit comment");
  };

  deleteComment = e => {
    e.preventDefault();
    console.log("inside delete comment");
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
    let newComment = (
      <div>
        {" "}
        <textarea
          name="text"
          placeholder="new comment here"
          onChange={this.handleChange}
        />
        <button onClick={e => this.createComment(e)}> Add Comment </button>
        <button onClick={e => this.editComment(e)}> Edit Comment </button>
        <button onClick={e => this.deleteComment(e)}> Delete Comment </button>
      </div>
    );
    return (
      <div>
        {existingComment}
        {newComment}
      </div>
    );
  }
}
