const Express = require("express");
const ExpressGraphQL = require("express-graphql").graphqlHTTP;
const mongoose = require("mongoose");
const {
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLType,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLObjectType,
} = require("graphql");

var app = Express();
var cors = require("cors");

app.use(cors());

mongoose
  .connect("mongodb://it2810-20.idi.ntnu.no:27017/Project3")
  .then(() => console.log("Connected to database..."))
  .catch((err) => console.error(err));

const PersonModel = mongoose.model("person", {
  firstName: String,
  lastName: String,
});

const MovieModel = mongoose.model("movie", {
  show_id: String,
  title: String,
  director: String,
});

const UserModel = mongoose.model("user", {
  firstName: String,
  lastName: String,
});

const PersonType = new GraphQLObjectType({
  name: "Person",
  fields: {
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
  },
});

const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: {
    id: { type: GraphQLID },
    show_id: { type: GraphQLString },
    title: { type: GraphQLString },
    director: { type: GraphQLString },
  },
});

const Usertype = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
  },
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      people: {
        type: GraphQLList(PersonType),
        resolve: (root, args, context, info) => {
          return PersonModel.find().exec();
        },
      },
      movies: {
        type: GraphQLList(MovieType),
        resolve: (root, args, context, info) => {
          return MovieModel.find().exec();
        },
      },
      users: {
        type: GraphQLList(Usertype),
        resolve: (root, args, context, info) => {
          return UserModel.find().exec();
        },
      },
    },
  }),

  mutation: new GraphQLObjectType({
    name: "Create",
    fields: {
      people: {
        type: PersonType,
        args: {
          firstName: { type: GraphQLString },
          lastName: { type: GraphQLString },
        },
        resolve: (root, args, context, info) => {
          var people = new PersonModel(args);
          return people.save();
        },
      },
      movies: {
        type: MovieType,
        args: {
          show_id: { type: GraphQLString },
          title: { type: GraphQLString },
          director: { type: GraphQLString },
        },
        resolve: (root, args, context, info) => {
          var movies = new MovieModel(args);
          return movies.save();
        },
      },
      users: {
        type: Usertype,
        args: {
          firstName: { type: GraphQLString },
          lastName: { type: GraphQLString },
        },
        resolve: (root, args, context, info) => {
          var users = new UserModel(args);
          return users.save();
        },
      },
    },
  }),
});

app.use("/graphql", ExpressGraphQL({ schema, graphiql: true }));

app.listen(3001, () => {
  console.log("server running at 3001");
});
