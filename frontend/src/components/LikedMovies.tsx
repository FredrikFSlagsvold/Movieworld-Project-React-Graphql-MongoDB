import { gql, useQuery } from "@apollo/client";
import { Box } from "@mui/material"
import DisplaySingleMovie from "./DisplaySingleMovie"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DisplayLikedMovie from "./DisplayLikedMovie";
import { ApolloClient } from "@apollo/client";





    const GET_USER = gql`
    query Query($id: String) {
    userByID( 
      id: $id
    ) {
      likedMovies{
        movieName
      }
    }
  }
  `;

export function GetLikedMovies(userID: String | null){
  const [likedMovies, setLikedMovies] = useState([])
    
  const { data } = useQuery(GET_USER, {
    variables: { id:  userID},
  });

  useEffect(()=>{
    data && setLikedMovies(data?.userByID[0].likedMovies)
  },[data])
  return likedMovies

}


export default function LikedMovies(){
  const userID = sessionStorage.getItem("userID") 
  const likedMovies = GetLikedMovies(userID);
  

    return (
    <div>  
      <h1>DINE LIKTE FILMER</h1>
      <div style={{display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        }}> 
      {likedMovies.map((movie: any) => <DisplayLikedMovie movieName={movie.movieName}/> )}
        </div>
        </div>)
}