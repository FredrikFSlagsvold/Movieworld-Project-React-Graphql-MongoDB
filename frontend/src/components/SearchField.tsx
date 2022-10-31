import React, { useEffect, useMemo } from "react";
import { gql, useQuery } from '@apollo/client';
import { debounce, MenuItem, TextField } from "@mui/material";
import "./header.css"
import { useNavigate } from "react-router-dom";
import MovieIcon from '@mui/icons-material/Movie';
import Face6Icon from '@mui/icons-material/Face6';
import CategoryIcon from '@mui/icons-material/Category';
import { MOVIESPERPAGE } from "../Page/HomePage";


type SearchProps ={
  setSearchText: React.Dispatch<React.SetStateAction<string>>
  setSearchFilter: React.Dispatch<React.SetStateAction<string>>
  setNumberOfPages: React.Dispatch<React.SetStateAction<number>>
  searchText: String
  filter: String
}


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

const GetNumberOfResults = gql`
    query Query($filter: String, $text: String){
      moviesCountBySearch(filter: $filter, text: $text)
    }`

//TODO MOVIECOUNT QUERY MÅ TA INN PARAMETERE OGSÅ

export default function SearchField({setSearchFilter, setSearchText, searchText, setNumberOfPages, filter}: SearchProps){
  const nav = useNavigate();
  
  const {loading, error, data} = useQuery(GetNumberOfResults, {
    variables: {filter: filter, text: searchText}
  });

  useEffect(()=>{
    setNumberOfPages(Math.ceil(data?.moviesCountBySearch/MOVIESPERPAGE));
  },[data])


  //Search on Movie, Actor or Category
  const handleChange = (event: any) => {
    setSearchFilter(event.target.value);
  };


    //Every title starts with a big letter, this function makes sure the search is on correct form
    const changeHandler = (event: any) => {
      const search = event.target.value;
      setSearchText(search)
    };
    
    //Debounce to wait the search
    const debounceHandler = useMemo(() => {
      return debounce(changeHandler, 1500);
    }, []);
   

    return (
          <form data-testid="searchField">
            <input className="searchBar"
            onChange={debounceHandler}
            placeholder="Search"
            type="search"
            />
          <TextField
            id="outlined-select-currency"
            select
            label="Select"
            onChange={handleChange}
            helperText="Please select your category"
            >
            {FILTER.map((option) => (
              <MenuItem data-testid="filterOption" key={option.value} value={option.value}>
                {option.icon} {option.value}
              </MenuItem>
            ))}
            
          </TextField>
          </form>
    );
}