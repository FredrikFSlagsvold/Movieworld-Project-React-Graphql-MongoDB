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
	GraphQLInt,
	GraphQLEnumType,
	GraphQLInputObjectType,
	GraphQLScalarType
} = require("graphql");
var app = Express();
var cors = require("cors");
const { resolve } = require("path");

app.use(cors());

mongoose
	.connect("mongodb://it2810-20.idi.ntnu.no:27017/Project3")
	.then(() => console.log("Connected to database..."))
	.catch(err => console.error(err));

const MovieModel = mongoose.model("movie", {
	title: String,
	cast: [{
		id: String,
		name: String
	}],
	genres: [String],
	vote_average: Number,
	runtime: Number,
	vote_count: Number,
	overview: String,
	directors: [{
		id: String,
		name: String
	}],
	release_date: String,
	poster_path: String,
	trailer_yt: String,
	original_language: String
});

const CastType = new GraphQLObjectType({
	name: "cast",
	fields: {
		id: { type: GraphQLID },
		name: { type: GraphQLString}
	}
})

const MovieType = new GraphQLObjectType({
	name: "Movies",
	fields: {
		id: { type: GraphQLID },
		title: 	{ type: GraphQLString },
		genres: { type: GraphQLString },
		vote_average: {type: GraphQLInt},
		runtime: {type: GraphQLString},
		vote_count: {type: GraphQLInt},
		overview: {type: GraphQLString},
		release_date: {type: GraphQLString},
		poster_path: {type: GraphQLString},
		trailer_yt: {type: GraphQLString},
		original_language: {type: GraphQLString},
		cast: { type: GraphQLList(CastType)},
		directors: { type: GraphQLList(CastType) }
		/*
		directors: {type: {
			id: {type: GraphQLID},
			name: {type: GraphQLString}
		}},
		
		
	}
	*/
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
			movieByID: {
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
					// return MovieModel.find().skip(args.skip).limit(args.limit).exec()
					return MovieModel.find().skip(args.skip).limit(args.limit).exec();
				}
			},
			//TODO: Fix the default pagnation 
			moviesBySearch: {
				type: GraphQLList(MovieType),
				args: {
					filter: { type: GraphQLString }, 
					text: { type: GraphQLString },
				},
				resolve: (root, args, context, info) => {
					if(args.filter==="Movie"){
						return MovieModel.find({ "title": { $regex: args.text }}).exec()
					}else if(args.filter === "Actor"){
						return MovieModel.find({"cast.name":{ $regex: args.text } })
					}else if(args.filter === "Category"){
						return MovieModel.find({"genres":{ $regex: args.text } })
					}
				}
			},
			moviesPagination: {
				type: GraphQLList(MovieType),
                args: {
                    skip: { type: GraphQLInt},
                    limit: { type: GraphQLInt },
                },
                type: new GraphQLList(MovieType),
                resolve: (root, args, context, info) => {
                    return MovieModel.find().skip(args.skip).limit(args.limit).exec()
                }
            },
			
			movieByID: {
				// name of the query is people by id
				type: MovieType,
				args: {
					// strong validation for graphqlid, which is mendatory for running this query
					id: { type: GraphQLNonNull(GraphQLID) }
				},
				resolve: (root, args, context, info) => {
					return MovieModel.findById(args.id).exec();
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

