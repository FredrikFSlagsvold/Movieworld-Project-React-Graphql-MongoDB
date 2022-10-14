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
    GraphQLScalarType,
    GraphQLInt
} = require("graphql");
var user = Express();
var cors = require("cors");

user.use(cors());

mongoose
	.connect("mongodb://it2810-20.idi.ntnu.no:27017/Project3")
	.then(() => console.log("Connected to database..."))
	.catch(err => console.error(err));

const UserModel = mongoose.model("user", {
	firstName: String,
	lastName: String,
});

const UserType = new GraphQLObjectType({
	name: "Users",
	fields: {
		id: { type: GraphQLID },
		firstName: { type: GraphQLString },
		lastName: { type: GraphQLString }
	}
});

const schema = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: "Query",
		fields: {
			// Query 1
			// name of the query, people
			UsersByLimit: {
				 // the type of response this query will return, here UserType
				type: GraphQLList(UserType),
				args: {
					limit: {type: GraphQLInt}
				},
				// resolver is required
				resolve: (root, args, context, info) => {
					// we are returning all persons available in the table in mongodb
					return UserModel.find().limit(args.limit).exec();
				}
			},
			// Query 2
			peopleByID: {
				// name of the query is people by id
				type: UserType,
				args: {
					// strong validation for graphqlid, which is mendatory for running this query
					id: { type: GraphQLNonNull(GraphQLID) },
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
			},
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

user.use("/user", ExpressGraphQL({schema, graphiql: true}));

user.listen(3001, () => {
	console.log("server running at user");
});