import React, { Component } from "react";
import Comments from "./Comments.js";
import "semantic-ui-css/semantic.min.css";
import { Button, Input, Comment, Form } from "semantic-ui-react";

export default class CommentContainer extends Component {
  state = {
    bookId: this.props.bookId,
    userId: this.props.userId,
    comments: "",
    newCommentText: ""
  };

  componentDidMount = () => {
    this.getBookCommentInstances();
  };

  getBookCommentInstances = () => {
    this.setState({ comments: "" }); //clear out after create new comment
    let url = "http://localhost:3001/bookcommentusers";
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        let commentIds = [];
        data.forEach(object => {
          if (
            object.book_id === this.state.bookId &&
            object.user_id === this.state.userId
          ) {
            commentIds.push({
              commentId: object.comment_id,
              bookCommentId: object.id
            });
          }
        });
        this.getExistingComments(commentIds);
      });
  };

  getExistingComments = commentIds => {
    commentIds.forEach(object => {
      let test = {};
      let url = `http://localhost:3001/comments/${object.commentId}`;
      fetch(url)
        .then(resp => resp.json())
        .then(data => {
          //console.log(this);
          test.comment = data;
          test.id = object.bookCommentId;
          console.log(test);
          this.updateCommentState(test);
        });
    });
  };

  updateCommentState = test => {
    this.setState({
      comments: [...this.state.comments, test]
    });
    //debugger;
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
        text: this.state.newCommentText
      })
    };
    fetch(url, config)
      .then(resp => resp.json())
      .then(data => {
        this.createCommentBookInstance(data.id);
      });
    this.setState({ newCommentText: "" });
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
        this.getBookCommentInstances();
      });
  };

  render() {
    let comments;
    if (this.state.comments.length > 0) {
      comments = this.state.comments.map((comment, index) => {
        //debugger;
        return (
          <Comments
            key={index}
            bookId={this.state.bookId}
            userId={this.state.userId}
            commentObject={comment.comment}
            id={comment.id}
            getBookCommentInstances={this.getBookCommentInstances}
          />
        );
      });
    } else {
      comments = null;
    }

    return (
      <div>
        {comments}
        <Form>
          <Form.TextArea
            placeholder="New Comment"
            name="newCommentText"
            onChange={this.handleChange}
          />
          <Button
            icon="edit"
            content="Add Comment"
            color="blue"
            onClick={e => this.createComment(e)}
          />
        </Form>
      </div>
    );
  }
}
