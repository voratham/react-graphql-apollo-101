import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries/queries";

//components
import BookDeatil from "../components/BookDetail";

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };
  }

  _displayBooks() {
    var data = this.props.data;
    if (data.loading) {
      return <div>Loading ...</div>;
    } else {
      return data.books.map(book => (
        <li onClick={e => this.setState({ selected: book.id })} key={book.id}>
          {book.name}
        </li>
      ));
    }
  }

  render() {
    return (
      <div>
        <ul id="book-list">{this._displayBooks()}</ul>
        <BookDeatil bookId={this.state.selected} />
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
