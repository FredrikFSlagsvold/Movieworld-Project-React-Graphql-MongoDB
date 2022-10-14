const Express = require("express");
const ExpressGraphQL = require("express-graphql");
const mongoose = require("mongoose");
const {
	GraphQLID,
	GraphQLString,
	GraphQLList,
	GraphQLType,
	GraphQLSchema,
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLInt
} = require("graphql");
var app = Express();
var cors = require("cors");

app.use(cors());

mongoose
	.connect("mongodb://it2810-20.idi.ntnu.no:27017/Project3")
	.then(() => console.log("Connected to database..."))
	.catch(err => console.error(err));

const MovieModel = mongoose.model("movie", {
	title: String,
	type: String,
});

const MovieType = new GraphQLObjectType({
	name: "Movies",
	fields: {
		id: { type: GraphQLID },
		title: { type: GraphQLString },
		type: { type: GraphQLString }
	}
});

const schema = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: "Query",
		fields: {
			// Query 1
			// name of the query, people
			Movies: {
				 // the type of response this query will return, here UserType
				type: GraphQLList(MovieType),
				// resolver is required
				resolve: (root, args, context, info) => {
					// we are returning all persons available in the table in mongodb
					return MovieModel.find().exec();
				}
			},
			// Query 2
			peopleByID: {
				// name of the query is people by id
				type: MovieType,
				args: {
					// strong validation for graphqlid, which is mendatory for running this query
					id: { type: GraphQLNonNull(GraphQLID) }
				},
				resolve: (root, args, context, info) => {
					return MovieModel.findById(args.id).exec();
				}
			},
			// Query 3
			peopleByName: {
				type: GraphQLList(MovieType),
				args: { 
					firstName: { type: GraphQLString } 
				},
				resolve: (root, args, context, info) => {
					return MovieModel.find({'firstName':args.firstName}).exec();
				}
			},
			moviesByLimit: {
				type: GraphQLList(MovieType),
				args: {
					limit: { type: GraphQLInt},
					skip: { type: GraphQLInt}
				},
				resolve: (root, args, context, info) => {
					return MovieModel.find().skip(args.skip).limit(args.limit).exec()
				}
			}
		}
	}),

	// Mutation 1
	mutation: new GraphQLObjectType({
		name: "Create",
		fields: {
			Movies: {
				type: MovieType,
				args: {
					firstName: { type: GraphQLString },
					lastName: { type: GraphQLString }
				},
				resolve: (root, args, context, info) => {
					var people = new MovieModel(args);
					return people.save();
				}
			}
		}
	})
});

app.use("/movie", ExpressGraphQL({schema, graphiql: true}));


app.listen(3001, () => {
	console.log("server running at app");
});