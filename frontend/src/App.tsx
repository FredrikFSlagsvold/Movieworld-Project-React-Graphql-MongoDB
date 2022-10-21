import React, { useState } from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import DisplayUsers from './components/DisplayUsers';
import Header from './components/Header';
import DisplayMovie from './components/DisplayMovie';
import MoviesPaginated from './components/MoviesPaginated';
import SearchField from './components/SearchField';
import DisplaySingleMovie from './components/DisplaySingleMovie';




function App() {

  return (
    <>
    <div className='center'>
      <Header />
        <Routes>
          <Route
            path="/"
          element={<SearchField/>}

            // {/* element={<Navigate replace to="/new/1" />} */}
          />

          <Route
            path="/displayUsers"
            element={<DisplayUsers/>}
          />
          {/* <Route path="/login" element={<Login/>}/> */}
          {/* <Route path="/movieInfo"element={<DisplayMovie/>}/> */}
          <Route path="/search" element={<SearchField/>}/>
          <Route path="/movieoffset" element={<MoviesPaginated value={0}/>}/>
          <Route path="/movie/:movieID" element={<DisplayMovie />}/>
  
        </Routes>
    </div>
    </>
  );
}

export default App;




