import React, { useMemo, useState } from "react";
import { gql, useQuery } from '@apollo/client';
import { debounce, MenuItem, TextField } from "@mui/material";

type MovieProps ={
  id: String;
  title: String; 
  cast: [{id: String, name: String}];
  genres: [String];
}

const FILTER = [
  { 
    value: "Movie",
    icon: "!"
  },
  { 
    value: "TV Show",
    icon: "?"
  },
  { 
    value: "Actor",
    icon: "&"
  },
  { 
    value: "Category",
    icon: "^"
  },
]

export default function SearchField(){
  const [filter, setFilter] = useState("Movie");
  const [text, setText] = useState("")
    
  
  const handleChange = (event: any) => {
    setFilter(event.target.value);
  };
  console.log(filter, "filter")

    //Every title starts with a big letter, this function makes sure the search is on correct form
    const changeHandler = (event: any) => {
      const search = event.target.value;
      if (search !== ""){
        const words = search.toLowerCase().split(" ");
        
        for (let i = 0; i < words.length; i++) {
          words[i] = words[i][0].toUpperCase() + words[i].substring(1);
        }
        setText(words.join(" "))
      }else{
        setText("")
      }
    };
    
    
    //Debounce to wait the search
    const debounceHandler = useMemo(() => {
      return debounce(changeHandler, 500);
    }, []);
   

    const searchMovies = gql` 
    query Query($text: String, $filter: String){
    moviesBySearch(text: $text, filter: $filter){
    id,
    title,
    genres,
    cast{ 
      id,
      name
      }
    }
    }
    `;
    
    const { loading, error, data } = useQuery(searchMovies, {
      variables: {text, filter}
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;
    console.log("text", text)
    console.log("filter", filter)
    console.log("data", data)
    return (
    <>
    <div>
        <TextField
          id="outlined-select-currency"
          select
          label="Select"
          value={filter}
          onChange={handleChange}
          helperText="Please select your currency"
        >
          {FILTER.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.icon} {option.value}
            </MenuItem>
          ))}
        </TextField>
      </div>
       <input
        onChange={debounceHandler}
        placeholder="Search"
        type="search"
      />
      <div>
      </div>
      {data.moviesBySearch.map(({ title, cast, genres}: MovieProps, index: any) => {
        return( <table key={index} className="">
          <thead>
          <tr>
            {/* <td>Title</td>
            <td>Cast</td>
            <td>Genres</td>  */}
          </tr>
          </thead>
          <tbody>
            <tr><h1>{title}</h1></tr>
            <tr>{cast.map((actor)=> {return <tr><td>NAVN:{actor.name}</td>ID:{actor.id}</tr>})}</tr>
            <tr>{genres.map((genres)=> {return <li>{genres}</li>})}</tr> 
          </tbody>
        </table>)
      })}
    </>
  );
}