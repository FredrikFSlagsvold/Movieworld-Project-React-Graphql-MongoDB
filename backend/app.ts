import Express from "express";
import mongoose from "mongoose";
import { GraphQLID, GraphQLString, GraphQLList, GraphQLType, GraphQLSchema, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { movieSchema, personSchema } from "./schema";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";

var app = Express();

mongoose
  .connect("mongodb://it2810-20.idi.ntnu.no:27017/Project3")
  .then(() => console.log("Connected to database..."))
  .catch(err => console.error(err));

const movies = mongoose.model('movies', movieSchema);
const people = mongoose.model('person', personSchema);


const PersonType = new GraphQLObjectType({
  name: "Person",
  fields: {
    id: {type: GraphQLID},
    firstName: {type: GraphQLString},
    lastName: {type: GraphQLString}
  }
});


const schema = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: "Query",
		fields: {
			// Query 1

			// name of the query, people
			people: {
				 // the type of response this query will return, here PersonType
				type: GraphQLList(PersonType),
				// resolver is required
				resolve: (root, args, context, info) => {
					// we are returning all persons available in the table in mongodb
					return people.find().exec();
				}
			},
			// Query 2
			peopleByID: {
				// name of the query is people by id
				type: PersonType,
				args: {
					// strong validation for graphqlid, which is mandatory for running this query
					id: { type: GraphQLNonNull(GraphQLID) }
				},
				resolve: (root, args, context, info) => {
					return people.findById(args.id).exec();
				}
			},
			// Query 3
			peopleByName: {
				type: GraphQLList(PersonType),
				args: { 
					firstName: { type: GraphQLString } 
				},
				resolve: (root, args, context, info) => {
					return people.find({'firstName':args.firstName}).exec();
				}
			}
		}
	}),

	// Mutation 1
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
					var peopleQL = new people(args);
					return peopleQL.save();
				}
			}
		}
	})
});


app.use("/peopleByID", graphqlHTTP({
    schema,
    graphiql: true
})
);

app.listen(3001, () => {
    console.log("server running at 3001");
});
