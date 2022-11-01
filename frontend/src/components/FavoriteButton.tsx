import { gql, useMutation } from "@apollo/client";
import { Box, IconButton} from "@mui/material";
import { useEffect, useState } from "react";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import {GetLikedMovies} from "./LikedMovies"

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
    const userID = sessionStorage.getItem("userID") 
    const [clicked, setClicked] = useState(false);
    
    const likedMovies = GetLikedMovies(userID)

    useEffect(()=>{
      if(likedMovies.filter(({movieName}: LikedMoviesProps) => movieName === movieTitle).length ){
        setClicked(true)
      }
    },[likedMovies, movieTitle])


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
                    <IconButton data-testid="FavoriteButton" onClick={handleClick}>
                        <StarIcon></StarIcon> 
                    </IconButton> Remove from favorites 
              </Box> :  <Box> 
                    <IconButton data-testid="FavoriteButton" onClick={handleClick}>
                        <StarBorderIcon></StarBorderIcon> 
                    </IconButton> Add to favorites
        </Box>}</>
    )
}