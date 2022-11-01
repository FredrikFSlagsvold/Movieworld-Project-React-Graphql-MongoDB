import React, { useEffect, useMemo } from "react";
import { gql, useQuery } from '@apollo/client';
import { Box, debounce, InputAdornment, MenuItem, TextField } from "@mui/material";
// import "./header.css";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import { MOVIESPERPAGE } from "../Page/HomePage";
import "../css/searchField.css";
import MovieIcon from '@mui/icons-material/Movie';
import Face6Icon from '@mui/icons-material/Face6';
import CategoryIcon from '@mui/icons-material/Category';



type SearchProps ={
  setSearchText: React.Dispatch<React.SetStateAction<string>>
  setSearchFilter: React.Dispatch<React.SetStateAction<string>>
  setNumberOfPages: React.Dispatch<React.SetStateAction<number>>
  setOffset: React.Dispatch<React.SetStateAction<number>>
  setSort: React.Dispatch<React.SetStateAction<number>>
  setSortType: React.Dispatch<React.SetStateAction<string>>
  searchText: String
  filter: String
  sortType: String
}

const FILTER = [
  { 
    value: "Movie",
    dbValue: "title",
    icon: <MovieIcon sx={{ color:"#8b6363"}} fontSize='inherit'/>
  },
  { 
    value: "Actor",
    dbValue: "cast.name",
    icon: <Face6Icon sx={{ color:"#8b6363"}} />
  },
  { 
    value: "Category",
    dbValue: "genres",
    icon: <CategoryIcon sx={{ color:"#8b6363"}} />
  },
]

const SORT = [
  {
    value: "New-old",
    sortType: "release_date",

  }, 
  {
    value: "Old-new",
    sortType: "oldToNew",
  }, 
  {
    value: "Popularity",
    sortType: "vote_average",
  }
  , 
  {
    value: "Runtime",
    sortType: "runtime",
  },
 ]

const GetNumberOfResults = gql`
    query Query($filter: String, $text: String){
      moviesCountBySearch(filter: $filter, text: $text)
    }`


export default function SearchField({setSearchFilter, setSearchText, searchText, setNumberOfPages, filter, setSortType, sortType, setOffset, setSort}: SearchProps){
  
  const {data} = useQuery(GetNumberOfResults, {
    variables: {filter: filter, text: searchText}
  });

  useEffect(()=>{
    setNumberOfPages(Math.ceil(data?.moviesCountBySearch/MOVIESPERPAGE));
  },[data, setNumberOfPages])


  //Search on Movie, Actor or Category
  const handleCategoryChange = (event: any) => {
    setSearchFilter(event.target.value);
  };


  //Sort on release date, revenue or popularity
  const handleSortChange = (event: any) => {
    console.log("HANDLECHANGE" , event.target.value)
    if(event.target.value === "release_date"){
      setSortType(event.target.value);
      setSort(-1)
    }else if(event.target.value === "oldToNew"){
      setSortType("release_date");
      setSort(1)
    }else{
      setSortType(event.target.value);
      setSort(-1)
    }

  };

    //Every title starts with a big letter, this function makes sure the search is on correct form
    const changeHandler = (event: any) => {
      const search = event.target.value;
      setSearchText(search)
      setOffset(0)
    };
    
    //Debounce to wait the search 
    const debounceHandler = useMemo(() => {
      return debounce(changeHandler, 1500);
    }, []);
   

    return (

<Box sx={{ display: "flex", flexDirection: "row", width: '100%', flexWrap: 'wrap', justifyContent:'center'}} className="filters">
            <TextField 
                select
                onChange={handleSortChange}
                helperText="Sort by"  
                defaultValue={sortType}
                sx={{width:'30%', minWidth:"150px", m:1}}
               >
            {SORT.map((option) => (
              <MenuItem data-testid="sortOption" key={option.value} value={option.sortType}>
               {option.value} 
              </MenuItem>
            ))}
          </TextField>

              <TextField
                id="CategoryField"
                select
                onChange={handleCategoryChange}
                helperText="Search by"
                value={filter}
                sx={{ width:'30%', minWidth:"150px", m:1}}
               >
              {FILTER.map((option) => (
                <MenuItem data-testid="filterOption" key={option.value} value={option.dbValue}>
                {option.icon} {option.value}
                </MenuItem>
                ))}
                </TextField>

            <TextField 
              InputProps={{endAdornment: (<InputAdornment position="end"><SearchIcon /></InputAdornment>)}}
        placeholder='Search' sx={{width:'30%', minWidth:"150px", m:1}} onChange={debounceHandler}  type='search' label="Search" variant="outlined" />




      
      </Box>
    );
}