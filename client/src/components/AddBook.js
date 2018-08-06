import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery
} from "../queries/queries";

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      genre: "",
      authorId: ""
    };
  }

  _displayAuthors() {
    var data = this.props.getAuthorsQuery;
    if (data.loading) {
      return <option disabled={true}>Loading Authors...</option>;
    } else {
      return data.authors.map((author, index) => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  }

  _handleSubmit = e => {
    e.preventDefault();
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this._handleSubmit}>
          <div className="field">
            <label>BookName : </label>
            <input
              onChange={e => this.setState({ name: e.target.value })}
              type="text"
            />
          </div>
          <div className="field">
            <label>Genre : </label>
            <input
              onChange={e => this.setState({ genre: e.target.value })}
              type="text"
            />
          </div>

          <div className="field">
            <label>AuthorName : </label>
            <select onChange={e => this.setState({ authorId: e.target.value })}>
              <option value="">Please Select Author...</option>
              {this._displayAuthors()}
            </select>
          </div>
          <button type="submit">+</button>
        </form>
      </div>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
