import { gql } from "@apollo/client";

export const SIGNUP_MUTATION = gql`
    mutation
        Users(
        $firstName: String! 
        $lastName: String!
        $password:String!
        $userName:String!
        ) {
        Users( 
        firstName: $firstName,
        lastName: $lastName,
        password:$password, 
        userName:$userName, 
        ) {
        id
        firstName
        lastName
        password
        userName
        }
        }
    `;

export const FIND_USER = gql`
    query ($userName: String){
        userByUserName(userName: $userName){
            userName
            id
        }
        } 
    `;

export const GET_MOVIEBYNAME = gql`
    query Query (
        $title: String!
        ) {
        movieByName( 
        title: $title,
        ) {
        title
        id
        runtime
        poster_path
        original_language
        genres
        vote_average
        release_date
        }
    }
`;


export const GET_MOVIE = gql`
    query Query($id: Int!) {
        movieByID(id: $id) {
            title
            overview
            poster_path
            trailer_yt
            release_date
            original_language
            runtime
            genres
            cast {
            name
            id
            }
            directors {
            name
            id
            }
            similar {
            title
            id
            }
        }
    }
`;

export const GET_SIMILAR_MOVIES = gql`
    query Query($ids: [Int]) {
        movieListByIDs(ids: $ids) {
            id
            title
            genres
            poster_path
            original_language
            runtime
            vote_average
            release_date
        }
    }
`;


export const addFavoriteMutation = gql`
    mutation Mutation (
        $id:ID
        $movieName: String
    ) {
        AddMovie( 
        id:$id,
        movieName: $movieName
        ) {
        id
        firstName
        lastName
        password
        userName
        likedMovies{
            movieName
        }
        }
    }
  `;

export const removeFavoriteMutation = gql`
  mutation Mutation (
        $id:ID
        $movieName: String
    ) {
        RemoveMovie( 
        id:$id,
        movieName: $movieName
        ) {
        id
        firstName
        lastName
        password
        userName
        likedMovies{
            movieName
        }
        }
  }
  `;



export const LOGIN_MUTATION = gql`
    query Query (
        $userName: String!
        $password:String!
        ) {
        login( 
        userName: $userName,
        password: $password
        ) {
        id
        firstName
        lastName
        userName
        password
        }
    }
`;


export const GetNumberOfResults = gql`
    query Query($filter: String, $text: String){
        moviesCountBySearch(filter: $filter, text: $text)
}
`;

export const MovieFeed = gql`
    query MovieQuery($offset: Int, $limit: Int, $text: String, $filter: String, $sort: Int, $sortType: String) {
        moviesBySearch(offset: $offset, limit: $limit, text: $text, filter: $filter, sort: $sort, sortType: $sortType) {
            id
            title
            genres
            revenue
            runtime
            poster_path
            vote_average
            release_date
            directors{
                name
            }
            cast{
                name
            }
        }
    }
`; 

