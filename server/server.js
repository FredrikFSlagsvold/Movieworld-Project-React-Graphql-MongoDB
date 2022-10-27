const express = require("express");
const expressGraphQL = require('express-graphql').graphqlHTTP
var app = express();

var cors = require("cors");

const mongoose = require("mongoose");

const {
    GraphQLID, 
    GraphQLString,
    GraphQLList,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInt
} = require("graphql");
const { sortAndDeduplicateDiagnostics } = require("typescript");

mongoose
    .connect("mongodb://it2810-20.idi.ntnu.no:27017/Project3")
    .then(() => console.log("Connected to database..."))
    .catch(err => console.log(err));

const PersonType = new GraphQLObjectType({
    name: "Person",
    fields: () => ({
        id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString }
    })
});

const MovieType = new GraphQLObjectType({
    name: "Movie",
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        genres: { type: GraphQLList(GraphQLString) },
        cast: {type: GraphQLList(CastType)},
        directors: {type: GraphQLList(DirectorType) },
        poster_path: {type: GraphQLString}
    })
});

const CastType = new GraphQLObjectType({
    name: "Cast",
    fields: () => ({
        id: { type: GraphQLID },
        name: {type: GraphQLString }
    })
})

const DirectorType = new GraphQLObjectType({
    name: "Director",
    fields: () => ({
        id: { type: GraphQLID },
        name: {type: GraphQLString }
    })
})

const UserType = new GraphQLObjectType({
    name: "Users",
    fields: () => ({
        id: { type: GraphQLID},
        firstName: { type: GraphQLString},
        lastName: { type: GraphQLString}
    })
});

const PersonModel = mongoose.model("person", {
    firstName: String,
    lastName: String,
});

const MovieModel = mongoose.model("Movie", {
    title: String,
    directors: [{
        id: String,
        name: String
    }],
    cast: [{ id: String, name: String }],
    genres: [String],
    poster_path: String
});

const UserModel = mongoose.model("user", {
    firstName: String,
    lastName: String
})

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Query",
        fields: {

            movies: {
                args: {
                    limit: { type: GraphQLInt },
                    offset: { type: GraphQLInt},
                },
                type: new GraphQLList(MovieType),
                resolve: (root, args, context, info) => {
                    return MovieModel.find().skip(args.offset).limit(args.limit).exec()
                }
            },

            moviesCountBySearch: {
				args: {
				  filter: { type: GraphQLString },
				  text: { type: GraphQLString }
				},
                type: GraphQLInt,
				resolve: (root, args, context, info) => {
				  if (args.filter === "Movie") {
					return MovieModel.countDocuments({ title: { $regex: args.text }});
				  } 
                  else if (args.filter === "Actor") {
					return MovieModel.countDocuments({ "cast.name": { $regex: args.text }});
				  } 
                  else if (args.filter === "Category") {
					return MovieModel.countDocuments({ genres: { $regex: args.text } });
				  }
				},
			  },

            people: {
                type: new GraphQLList(PersonType),
                resolve: (root, args, context, info) => {
                    return PersonModel.find().exec();
                }
            },

            users: {
                type: new GraphQLList(UserType),
                resolve: (root, args, context, info) => {
                    return UserModel.find().exec();
                }
            },

            moviesBySearch: {
				type: GraphQLList(MovieType),
				args: {
				  filter: { type: GraphQLString },
				  text: { type: GraphQLString },
				  offset: { type: GraphQLInt },
				  limit: { type: GraphQLInt },
				},
				resolve: (root, args, context, info) => {
				  if (args.filter === "Movie") {
					return MovieModel.find({ title: { $regex: args.text } }).skip(args.offset).limit(args.limit).exec();
				  } else if (args.filter === "Actor") {
					return MovieModel.find({ "cast.name": { $regex: args.text } }).skip(args.offset).limit(args.limit).exec();
				  } else if (args.filter === "Category") {
					return MovieModel.find({ genres: { $regex: args.text } }).skip(args.offset).limit(args.limit).exec();
				  }
				},
			  },
        }
    }),

    mutation: new GraphQLObjectType({
        name: "Create",
        fields: {
            people: {
                type: PersonType,
                args: {
                    firstName: { type: GraphQLString },
                    lastName: { type: GraphQLString }
                },
                resolve: (root, args, context, info) => {
                    var people = new PersonModel(args);
                    return people.save();
                }
            }
        }
    })
});



app.use(cors());
app.use('/graphql', expressGraphQL({
        schema: schema,
        graphiql: true
    })
);
app.listen(5001., () => 
    console.log('Server Running'));