import React, { useMemo, useState } from "react";
import { gql, useQuery } from '@apollo/client';
import { Box, debounce, MenuItem, TextField } from "@mui/material";
import DisplaySingleMovie from "./DisplaySingleMovie";
import "../components/header.css"
import DisplayMovie from "./DisplayMovie";
import { Link, useNavigate } from "react-router-dom";
import MovieIcon from '@mui/icons-material/Movie';
import Face6Icon from '@mui/icons-material/Face6';
import CategoryIcon from '@mui/icons-material/Category';


// type MovieProps ={
//   id: String;
//   title: String; 
//   cast: [{id: String, name: String}];
//   genres: [String];
// }

const FILTER = [
  { 
    value: "Movie",
    icon: <MovieIcon sx={{ color:"#8b6363"}} />
  },
  { 
    value: "Actor",
    icon: <Face6Icon sx={{ color:"#8b6363"}} />
  },
  { 
    value: "Category",
    icon: <CategoryIcon sx={{ color:"#8b6363"}} />
  },
]

export default function SearchField(){
  const [filter, setFilter] = useState("Movie");
  const [text, setText] = useState("")

  const nav = useNavigate();
    
  
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
      return debounce(changeHandler, 1500);
    }, []);
   

    const searchMovies = gql` 
    query Query($text: String, $filter: String){
    moviesBySearch(text: $text, filter: $filter){
    id,
    title,
    genres,
    runtime,
    cast{ 
      id,
      name
      }
    poster_path,
    original_language
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
    console.log("data search", data.moviesBySearch)


    function changeBorderColor(e: any){
      e.target.style.borderColor = "gray"
    }

    return (
    
    <>
      <div> 
          <form>
            <input className="searchBar"
            onChange={debounceHandler}
            placeholder="Search"
            type="search"
            />
          <TextField
            id="outlined-select-currency"
            select
            label="Select"
            value={filter}
            onChange={handleChange}
            helperText="Please select your category"
            >
            {FILTER.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.icon} {option.value}
              </MenuItem>
            ))}
            
          </TextField>
          </form>

      </div>
        <Box  sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          padding: '56px',
        }}>
          {data.moviesBySearch.map((data: any) => {
            return(
              // <Link key={data.id} to="/DisplayMovie" id={data.movieByID}>
              //   <DisplaySingleMovie poster_path={data.poster_path} original_language={data.original_language} title={data.title} runtime={data.runtime} genres={data.genres} />
              // </Link>
              <div style={{margin:"8px"}} onMouseOver={changeBorderColor} onClick={()=> nav('/movie/' + data.id)}> 
                <DisplaySingleMovie 
                  key={data.id}
                  poster_path={data.poster_path} 
                  original_language={data.original_language} 
                  title={data.title} 
                  runtime={data.runtime} 
                  genres={data.genres} />
              </div>

            )
          })}
        </Box>
      </>
    );
}