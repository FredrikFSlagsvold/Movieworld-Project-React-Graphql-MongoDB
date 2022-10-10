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
	GraphQLObjectType
} = require("graphql");
var app = Express();
var cors = require("cors");

app.use(cors());

mongoose
	.connect("mongodb://it2810-20.idi.ntnu.no:27017/Project3")
	.then(() => console.log("Connected to database..."))
	.catch(err => console.error(err));

const UserModel = mongoose.model("movie", {
	title: String,
	type: String,
});

const UserType = new GraphQLObjectType({
	name: "Users",
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
			Users: {
				 // the type of response this query will return, here UserType
				type: GraphQLList(UserType),
				// resolver is required
				resolve: (root, args, context, info) => {
					// we are returning all persons available in the table in mongodb
					return UserModel.find().exec();
				}
			},
			// Query 2
			peopleByID: {
				// name of the query is people by id
				type: UserType,
				args: {
					// strong validation for graphqlid, which is mendatory for running this query
					id: { type: GraphQLNonNull(GraphQLID) }
				},
				resolve: (root, args, context, info) => {
					return UserModel.findById(args.id).exec();
				}
			},
			// Query 3
			peopleByName: {
				type: GraphQLList(UserType),
				args: { 
					firstName: { type: GraphQLString } 
				},
				resolve: (root, args, context, info) => {
					return UserModel.find({'firstName':args.firstName}).exec();
				}
			}
		}
	}),

	// Mutation 1
	mutation: new GraphQLObjectType({
		name: "Create",
		fields: {
			Users: {
				type: UserType,
				args: {
					firstName: { type: GraphQLString },
					lastName: { type: GraphQLString }
				},
				resolve: (root, args, context, info) => {
					var people = new UserModel(args);
					return people.save();
				}
			}
		}
	})
});

app.use("/user", ExpressGraphQL({schema, graphiql: true}));

app.listen(3001, () => {
	console.log("server running at 3001");
});