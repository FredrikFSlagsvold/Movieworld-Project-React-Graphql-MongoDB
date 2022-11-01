import { useQuery } from "@apollo/client";
import DisplaySingleMovie from "./DisplaySingleMovie";
import { useNavigate } from "react-router-dom";
import { GET_MOVIEBYNAME } from "../utils/Queries";


type DisplayLikedMovieProps ={
    movieName: String
}

type DisplaySingleMovieProps ={
    poster_path: String;
    original_language: String;
    title: String;
    runtime: number;
    genres: [String]; 
    id: String,
    vote_average: number,
    release_date: String
}



export default function DisplayLikedMovie({movieName}: DisplayLikedMovieProps){
    const nav = useNavigate();
    const {data } = useQuery(GET_MOVIEBYNAME, {
        variables: { title: movieName },
      });

    return (
        <>
            {data && data.movieByName.map(({ title, genres, poster_path, runtime, original_language, id, vote_average, release_date }: DisplaySingleMovieProps) => { return (
                    
                <div onClick={()=> nav('/movie/' + id)} tabIndex={0} onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    e.key === "Enter" && nav('/movie/' + id) 
                  }} 
                  >
                <DisplaySingleMovie release_date={release_date} vote_average={vote_average} poster_path={poster_path} title={title} runtime={runtime} genres={genres}/>
                </div>
            )})}
        </>
        )
}