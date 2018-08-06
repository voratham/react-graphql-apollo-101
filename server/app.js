const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

// setting cors allow
app.use(cors());

mongoose.connect("mongodb://localhost:27017/bookstore");
mongoose.connection.once("open", () => {
  console.log("----------------------------------------");
  console.log("MongoDB Connected to database port 27017");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log("----------------------------------------");
  console.log("Express start server listening port 4000 !");
});
