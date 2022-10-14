import mongoose from "mongoose";

export const actorSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    }
})

export const movieSchema = new mongoose.Schema({
    title: {
        type: String
    },
    releaseYear: {
        type: Number
    },
    director: {
        type: String
    },
    country: {
        type: String
    }
})

export const personSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    id: {
        type: Number
    }
})

