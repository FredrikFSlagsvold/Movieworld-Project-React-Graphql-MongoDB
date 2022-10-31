import { gql, useMutation } from "@apollo/client";
import { Box, IconButton} from "@mui/material";
import { useEffect, useState } from "react";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import {GetLikedMovies} from "./LikedMovies"
import { useRecoilState, useRecoilValue } from "recoil";
import { userIDAtom } from "../shared/globalState";

//TODO FLYTT DENNE INN
type LikedMoviesProps = {
  movieName: String
}

type UserProps= {
  firstName: String;
  lastName: String;
  password: String;
  userName: String;
  likedMovies: [{movieName: String}];
}

type FavoriteButtonProps ={
    movieTitle: string;
}

const addFavoriteMutation = gql`
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

  const removeFavoriteMutation = gql`
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

export default function FavoriteButton({movieTitle}: FavoriteButtonProps) {
    const [clicked, setClicked] = useState(false);
    const userID = useRecoilValue(userIDAtom);
    
    const likedMovies = GetLikedMovies(userID)

    console.log('UserID: ', userID)

    useEffect(()=>{
      if(likedMovies.filter(({movieName}: LikedMoviesProps) => movieName === movieTitle).length ){
        setClicked(true)
        console.log("denne filmen er likt", likedMovies.filter(({movieName}: LikedMoviesProps) => movieName === movieTitle))
      }
    },[likedMovies])


    const [addMovie] = useMutation<{ user: UserProps}>( addFavoriteMutation, {
      variables: { id: userID, movieName: movieTitle } 
    });

    const [removeMovie] = useMutation<{ user: UserProps}>( removeFavoriteMutation, {
      variables: { id: userID, movieName: movieTitle } 
    });


    const handleClick = () => {
      clicked ? removeMovie() : addMovie()
      setClicked((prev)=> !prev)
  }

    return (

<>         {clicked ? <Box> 
        <IconButton onClick={handleClick}>
        <StarIcon></StarIcon> 
        </IconButton> Remove from favorites 
        </Box> :  <Box> 
        <IconButton onClick={handleClick}>
        <StarBorderIcon></StarBorderIcon> 
        </IconButton> Add to favorites
        </Box>}</>
    )
}