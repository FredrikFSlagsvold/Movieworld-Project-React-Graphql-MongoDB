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

    /*
    <div style={{ display: "flex", justifyContent: "space-between"}}>
                <p style={{padding:"0", marginBottom:"0", marginTop:"0"}}>{runtime} min</p>
                <p style={{padding:"0", marginBottom:"0", marginTop:"0"}}>{original_language} </p>
            </div>
    */
    



    return <>
    <div style={{
        width: 190,
        height: 370,
        padding: "48px",
        backgroundColor: "white",
        fontFamily: "Verdana, sans-serif, Areal",
        fontSize:"12px"
        
    }} >
        <img src={"https://image.tmdb.org/t/p/original/"+ poster_path} width="190px" height="284.8px"/>
            <div style={{textAlign:"center"}}>
            {(() => {
        if (title.length>24) {
          return (
            <div><strong>{title.substring(0,21)+ "..."}</strong></div>
          )
        } else {
          return (
            <div><strong>{title}</strong></div>
          )
        }
      })()}
            </div>
            
            <div style={{textAlign:"center"}}>
            {(() => {
                if (genresString.length>25) {
                    return (
                        <div>{genresString.substring(0,23)+ "..."}</div>
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