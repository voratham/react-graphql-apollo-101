import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBookQuery } from "../queries/queries";

class BookDetail extends Component {
  _displayBookDetail() {
    const { book } = this.props.data;
    if (book) {
      return (
        <div>
          <h2>{book.name}</h2>
          <hr />
          <p>
            <strong>Category :</strong>
            {book.genre}
          </p>
          <p>
            <strong>Author Name :</strong>
            {book.author.name}
          </p>
          <p>
            <strong>Book Other</strong>
          </p>
          <ul className="other-books">
            {book.author.books.map(item => {
              return <li key={item.id}>{item.name}</li>;
            })}
          </ul>
        </div>
      );
    } else {
      return <div>No book selected...</div>;
    }
  }

  render() {
    console.log("this.props", this.props);
    console.log("---------------");
    return <div id="book-detail">{this._displayBookDetail()}</div>;
  }
}

export default graphql(getBookQuery, {
  options: props => {
    return {
      variables: {
        id: props.bookId
      }
    };
  }
})(BookDetail);
