import { gql, useQuery } from "@apollo/client";
import DisplaySingleMovie from "./DisplaySingleMovie";
import { useNavigate } from "react-router-dom";


type DisplayLikedMovieProps ={
    movieName: String
}

type DisplaySingleMovieProps ={
    poster_path: String;
    original_language: String;
    title: String;
    runtime: number;
    genres: [String]; 
    id: String
}

const GET_MOVIEBYNAME = gql`
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
}
}
`;

export default function DisplayLikedMovie({movieName}: DisplayLikedMovieProps){
    const nav = useNavigate();


    const { loading, error, data } = useQuery(GET_MOVIEBYNAME, {
        variables: { title: movieName },
      });


    return (
        <>
            {data && data.movieByName.map(({ title, genres, poster_path, runtime, original_language, id }: DisplaySingleMovieProps) => { return (
                    
                <div onClick={()=> nav('/movie/' + id)} tabIndex={0} onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    e.key === "Enter" && nav('/movie/' + id) 
                  }} 
                  >
                <DisplaySingleMovie poster_path={poster_path} original_language={original_language} title={title} runtime={runtime} genres={genres}/>
                </div>
            )})}
        </>
        )
}