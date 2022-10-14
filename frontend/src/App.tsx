import React, { useState } from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import DisplayUsers from './components/DisplayUsers';
import Header from './components/Header';
import SearchField from './components/SearchField';




function App() {
  const [display, setDisplay] = useState("all")

  const choices = ["All", "Users", "Movie"]
  return (
    <>
    <div className='center'>
      <Header />
        <Routes>
          <Route
            path="/"
            element={<Navigate replace to="/new/1" />}
          />

          <Route
            path="/displayUsers"
            element={<DisplayUsers/>}
          />
          {/* <Route path="/login" element={<Login/>}/> */}
          <Route path="/search"element={<SearchField/>}/>
        </Routes>
    </div>
    {/* <div> */}
    {/* <SearchField searchInput={"Hei"} />
    {choices.map(name => {
      return (
      <button onClick={()=>setDisplay(name)}>
        {name}
      </button>)
    })} 
    </div>
     {display === "All" && 
    <p>HallaBalla</p>}
    {display === "Users" && 
    <DisplayUsers />}
     {display === "Movie" && 
    <p>Mamma Mia</p>} */}
    </>
  );
}

export default App;




