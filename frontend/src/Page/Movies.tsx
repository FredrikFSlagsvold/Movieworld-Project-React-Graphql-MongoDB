import { gql, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import DisplaySingleMovie from "../components/DisplaySingleMovie";

type MovieProps = {
    limit: number,
    offset: number,
    text: string
    filter: string
}

type DisplaySingleMovieProps ={
    poster_path: String;
    original_language: String;
    title: String;
    runtime: number;
    genres: [String]; 
    id: String
}

    const MovieFeed = gql`
    query MovieQuery($offset: Int, $limit: Int, $text: String, $filter: String) {
        moviesBySearch(offset: $offset, limit: $limit, text: $text, filter: $filter) {
            id
            title
            genres
            poster_path
            directors{
                name
            }
            cast{
                name
            }
        }
    }`; 

export default function Movies( {offset, limit, filter, text}: MovieProps) {

  const nav = useNavigate();

    console.log(offset, filter, limit, text)

    const {loading, error, data } = useQuery(MovieFeed, {
        variables: {offset: offset, limit: limit, filter: filter, text: text},
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error...</p>;

    // const handleKeyDown = (event: any, id: String) => {
    //     if (event.key === 'Enter') {
    //         // nav('/movie/' + id)
    //         console.log
    //     }
    //     }

    console.log("data", data)
    return (
        <div style={{display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        }}>
            {data.moviesBySearch.map(({ title, genres, poster_path, runtime, original_language, id }: DisplaySingleMovieProps) => { return (
                    
                <div onClick={()=> nav('/movie/' + id)} tabIndex={0} onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    e.key === "Enter" && nav('/movie/' + id) 
                  }} 
                  onMouseEnter={()=>console.log("heiii")}
                  >
                <DisplaySingleMovie poster_path={poster_path} original_language={original_language} title={title} runtime={runtime} genres={genres}/>
                </div>
            )})}
        </div>
    )
}