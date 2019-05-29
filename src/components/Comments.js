import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import { Comment, Divider, Confirm } from "semantic-ui-react";

export default class Comments extends Component {
  state = {
    bookId: this.props.bookId,
    userId: this.props.userId,
    commentId: this.props.commentObject.id,
    id: this.props.id,
    date: this.props.commentObject.updated_at,
    text: this.props.commentObject.text,
    confirmDelete: false
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  openConfirm = () => {
    //opens confirm modal
    this.setState({ confirmDelete: true });
  };

  closeConfirm = () => {
    //closes confirm modal
    this.setState({ confirmDelete: false });
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
    this.closeConfirm();
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
    let date = this.state.date.substring(0, 10);
    let existingComment = (
      <div>
        <Comment.Group>
          <Divider />
          <Comment>
            <Comment.Content>
              <Comment.Metadata>
                <div>{date}</div>
              </Comment.Metadata>
              <Comment.Text name="newCommentText" onChange={this.handleChange}>
                {this.state.text}
              </Comment.Text>
              <Comment.Actions>
                <Comment.Action onClick={e => this.editComment(e)}>
                  Edit
                </Comment.Action>{" "}
                <Comment.Action onClick={this.openConfirm}>
                  Delete
                </Comment.Action>
                <Confirm
                  open={this.state.confirmDelete}
                  onCancel={this.closeConfirm}
                  onConfirm={e => this.deleteComment(e)}
                />
              </Comment.Actions>
            </Comment.Content>
          </Comment>
          <Divider />
        </Comment.Group>
      </div>
    );

    return <div>{existingComment}</div>;
  }
}
