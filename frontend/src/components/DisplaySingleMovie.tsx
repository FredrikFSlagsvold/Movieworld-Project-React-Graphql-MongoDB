import { gql, useQuery } from '@apollo/client';
import Box from '@mui/material/Box';

type DisplaySingleMovieProps ={
    id: String;
    poster_path: String;
    original_language: String;
    title: String;
    runtime: number;
    genres: [String]; //må endres
}


export default function DisplaySingleMovie({id, poster_path, original_language, title, runtime, genres}: DisplaySingleMovieProps){

    return <>
    <Box sx={{
        width: 190,
        height: 290,
        textAlign: "center"
    }}>
        <img src={"https://image.tmdb.org/t/p/w600_and_h900_bestv2/"+ poster_path} width="190px" height="230px"/>
        <Box sx={{
               typography: {
                fontFamily: [
                  '"Helvetica Neue"'],
                  fontSize: 10
                },
                alignItems: "center"
        }}>
            <div>{title}</div>
            <div>
                <div>{runtime}min </div>
                <div>{original_language} </div>
            </div>
            {genres.map((type: String) => <div>{type}</div> )}
        </Box>
    </Box>
    </>
}