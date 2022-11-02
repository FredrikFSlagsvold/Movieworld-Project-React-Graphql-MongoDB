const Express = require("express");
const ExpressGraphQL = require("express-graphql");
const mongoose = require("mongoose");
const {
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLFloat,
} = require("graphql");
var app = Express();
var cors = require("cors");

app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/Project3")
  .then(() => console.log("Connected to database..."))
  .catch((err) => console.error(err));

const MovieModel = mongoose.model("movie", {
  title: String,
  id: Number,
  cast: [
    {
      id: String,
      name: String,
    },
  ],
  genres: [String],
  vote_average: Number,
  runtime: Number,
  revenue: Number,
  vote_count: Number,
  overview: String,
  directors: [
    {
      id: String,
      name: String,
    },
  ],
  similar: [
    {
      id: Number,
      title: String,
    },
  ],
  release_date: String,
  poster_path: String,
  trailer_yt: String,
  original_language: String,
});

const CastType = new GraphQLObjectType({
  name: "cast",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  },
});

const SimilarType = new GraphQLObjectType({
  name: "similar",
  fields: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
  },
});

const MovieType = new GraphQLObjectType({
  name: "Movies",
  fields: {
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    genres: { type: GraphQLList(GraphQLString) },
    similar: { type: GraphQLList(SimilarType) },
    vote_average: { type: GraphQLFloat },
    runtime: { type: GraphQLString },
    revenue: { type: GraphQLString },
    vote_count: { type: GraphQLInt },
    overview: { type: GraphQLString },
    release_date: { type: GraphQLString },
    poster_path: { type: GraphQLString },
    trailer_yt: { type: GraphQLString },
    original_language: { type: GraphQLString },
    cast: { type: GraphQLList(CastType) },
    directors: { type: GraphQLList(CastType) },
  },
});

const UserModel = mongoose.model("user", {
  firstName: String,
  lastName: String,
  userName: String,
  password: String,
  likedMovies: [
    {
      movieName: String,
    },
  ],
});

const LikedMoviesType = new GraphQLObjectType({
  name: "likedMovies",
  fields: {
    movieName: { type: GraphQLString },
  },
});

const UserType = new GraphQLObjectType({
  name: "Users",
  fields: {
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    userName: { type: GraphQLString },
    password: { type: GraphQLString },
    likedMovies: { type: GraphQLList(LikedMoviesType) },
  },
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      movieByID: {
        type: MovieType,
        args: {
          id: { type: GraphQLNonNull(GraphQLInt) },
        },
        resolve: (root, args, context, info) => {
          return MovieModel.findOne({ id: args.id }).exec();
        },
      },
      movieByName: {
        type: GraphQLList(MovieType),
        args: {
          title: { type: GraphQLString },
        },
        resolve: (root, args, context, info) => {
          return MovieModel.find({ title: args.title }).exec();
        },
      },
      movieListByIDs: {
        type: GraphQLList(MovieType),
        args: {
          ids: { type: new GraphQLList(GraphQLInt) },
        },
        type: new GraphQLList(MovieType),
        resolve: (root, args, context, info) => {
          return MovieModel.find({ id: { $in: args.ids } }).exec();
        },
      },
      moviesBySearch: {
        type: GraphQLList(MovieType),
        args: {
          filter: { type: GraphQLString },
          text: { type: GraphQLString },
          offset: { type: GraphQLInt },
          limit: { type: GraphQLInt },
          sortType: {type: GraphQLString},
          sort: {type: GraphQLInt},
        },
        resolve: (root, args, context, info) => {
            return MovieModel.find({[args.filter]: { $regex: args.text, $options: "i" }})
              .skip(args.offset)
              .limit(args.limit)
              .sort({[args.sortType]: args.sort} )
              .exec();
        },
      },
      moviesCountBySearch: {
        args: {
          filter: { type: GraphQLString },
          text: { type: GraphQLString },
        },
        type: GraphQLInt,
        resolve: (root, args, context, info) => {
          return MovieModel.countDocuments({[args.filter]: { $regex: args.text, $options: "i" }})
        }
      },
      login: {
        type: GraphQLList(UserType),
        args: {
          userName: { type: GraphQLString },
          password: { type: GraphQLString },
        },
        resolve: (root, args, context, info) => {
          return UserModel.find({
            userName: args.userName,
            password: args.password,
          }).exec();
        },
      },
      userByUserName: {
        type: GraphQLList(UserType),
        args: {
          userName: { type: GraphQLString },
        },
        resolve: (root, args, context, info) => {
          return UserModel.find( {userName: args.userName} ).exec();
        },
      },
      userByID: {
        type: GraphQLList(UserType),
        args: {
          id: { type: GraphQLString },
        },
        resolve: (root, args, context, info) => {
          return UserModel.find({ _id: args.id }).exec();
        },
      },
    },
  }),

  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: {
      RemoveMovie: {
        type: UserType,
        args: {
          id: { type: GraphQLID },
          movieName: { type: GraphQLString },
        },
        resolve: (root, args, context, info) => {
          return UserModel.findByIdAndUpdate(
            { _id: args.id },
            { $pull: { likedMovies: { movieName: args.movieName } } }
          );
        },
      },

      AddMovie: {
        type: UserType,
        args: {
          id: { type: GraphQLID },
          movieName: { type: GraphQLString },
        },
        resolve: (root, args, context, info) => {
          return UserModel.findByIdAndUpdate(
            { _id: args.id },
            { $push: { likedMovies: { movieName: args.movieName } } }
          );
        },
      },

      Users: {
        type: UserType,
        args: {
          likedMovies: { type: GraphQLString },
          firstName: { type: GraphQLString },
          lastName: { type: GraphQLString },
          password: { type: GraphQLString },
          userName: { type: GraphQLString },
        },
        resolve: (root, args, context, info) => {
          var people = new UserModel(args);
          return people.save()
        },
      },
    },
  }),
});

app.use("/movie", ExpressGraphQL({ schema, graphiql: true }));

app.listen(3001, () => {
  console.log("server running at app");
});
