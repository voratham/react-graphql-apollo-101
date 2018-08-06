import React, { Component } from "react";
// import logo from "./logo.svg";
import ApolloClinet from "apollo-boost";
import { ApolloProvider } from "react-apollo";

// components include
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";

// apollo clinet setup
const client = new ApolloClinet({
  uri: "http://localhost:4000/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>Book Store</h1>
          <BookList />
          <AddBook />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
