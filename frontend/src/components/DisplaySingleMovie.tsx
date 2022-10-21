import { gql, useQuery } from '@apollo/client';
import Box from '@mui/material/Box';

type DisplaySingleMovieProps ={
    poster_path: String;
    original_language: String;
    title: String;
    runtime: number;
    genres: [String]; 
}


export default function DisplaySingleMovie({poster_path, original_language, title, runtime, genres}: DisplaySingleMovieProps){
    
    return <>
    <div style={{
        width: 190,
        height: 290,
    }}>
        <img src={"https://image.tmdb.org/t/p/original/"+ poster_path} width="190px" height="230px"/>
            <div style={{textAlign:"center"}}>{title}</div>
            <div style={{ display: "flex", justifyContent: "space-between"}}>
                <p>{runtime}min </p>
                <p>{original_language} </p>
            </div>
            {genres.map((type: String) => <p>{type}</p> )}
    </div>
    </>
}