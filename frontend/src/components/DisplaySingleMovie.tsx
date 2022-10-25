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
    let genresString = genres.join(', ');
    // while (genresString.length<28)

    return <>
    <div style={{
        width: 190,
        height: 370,
        backgroundColor: "white",
    }}>
        <img src={"https://image.tmdb.org/t/p/original/"+ poster_path} width="190px" height="284.8px"/>
            <div style={{textAlign:"center"}}>
            {(() => {
        if (title.length>28) {
          return (
            <div>{title.substring(0,25)+ "..."}</div>
          )
        } else {
          return (
            <div>{title}</div>
          )
        }
      })()}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between"}}>
                <p>{runtime} min</p>
                <p>{original_language} </p>
            </div>
            <div style={{textAlign:"center"}}>
            {(() => {
                if (genresString.length>28) {
                    return (
                        <div>{genresString.substring(0,27)+ "..."}</div>
                    )
                } else {
                    return (
                        <div>{genresString}</div>
                    )
                }
            })()}
            </div>
    </div>
    </>
}