import { gql, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import DisplaySingleMovie from "../components/DisplaySingleMovie";

type MovieProps = {
    limit: number,
    offset: number,
    text: string
    filter: string
    sort: number,
    sortType: string
}

type DisplaySingleMovieProps ={
    poster_path: String;
    original_language: String;
    title: String;
    runtime: number;
    genres: [String]; 
    id: String
}

export const MovieFeed = gql`
query MovieQuery($offset: Int, $limit: Int, $text: String, $filter: String, $sort: Int, $sortType: String) {
    moviesBySearch(offset: $offset, limit: $limit, text: $text, filter: $filter, sort: $sort, sortType: $sortType) {
        id
        title
        genres
        revenue
        poster_path
        directors{
            name
        }
        cast{
            name
        }
    }
}`; 

export default function Movies( {offset, limit, filter, text, sort, sortType}: MovieProps) {

  const nav = useNavigate();
    // console.log("offset, limit, filter, text, sort, sortType", offset, limit, filter, text, sort, sortType)

    const {loading, error, data } = useQuery(MovieFeed, {
        variables: {offset: offset, limit: limit, filter: filter, text: text, sort: sort, sortType: sortType},
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error...</p>;

    return (
        <div data-testid="moviePage" style={{display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '100%'
        }}>
            {data.moviesBySearch && data.moviesBySearch.map(({ title, genres, poster_path, runtime, original_language, id }: DisplaySingleMovieProps) => { return (
                    
                <div onClick={()=> nav('/movie/' + id)} tabIndex={0} onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    e.key === "Enter" && nav('/movie/' + id) 
                  }} 
                  >
                <DisplaySingleMovie poster_path={poster_path} original_language={original_language} title={title} runtime={runtime} genres={genres}/>
                </div>
            )})}
        </div>
    )
}