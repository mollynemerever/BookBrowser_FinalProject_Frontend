import React, { Component } from "react";
import Comment from "./Comment.js";

export default class CommentContainer extends Component {
  state = {
    bookId: this.props.bookId,
    userId: this.props.userId,
    comments: ""
  };

  componentDidMount = () => {
    this.getBookCommentInstances();
  };

  getBookCommentInstances = () => {
    let url = "http://localhost:3001/bookcommentusers";
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        let commentIds = [];
        data.forEach(function(object) {
          commentIds.push(object.comment_id);
        });
        this.getExistingComments(commentIds);
      });
  };

  getExistingComments = (commentIds) => {
    commentIds.forEach(id => {
      let url = `http://localhost:3001/comments/${id}`;
      fetch(url)
        .then(resp => resp.json())
        .then(data => {
          console.log(this)
          console.log(data)
          this.setState({comments: [...this.state.comments, data]})
        });
    })
  }



  render() {
    let comments;

    if (this.state.comments.length >= 1) {
      comments = this.state.comments.map((comment, index) => {
        return (
          <Comment
            key={index}
            bookId={this.state.bookId}
            userId={this.state.userId}
            comment={comment}
          />
        );
      });
    } else {
      comments = "no existing comments";
    }

    return (
      <div>

        {comments}
      </div>
    );
  }
}
