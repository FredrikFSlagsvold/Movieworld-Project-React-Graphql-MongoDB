import React, { useState } from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import DisplayUsers from './components/DisplayUsers';
import Header from './components/Header';
import MoviesPaginated from './components/MoviesPaginated';
import SearchField from './components/SearchField';




function App() {

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
          <Route path="/search" element={<SearchField/>}/>
          <Route path="/movieoffset" element={<MoviesPaginated value={0}/>}/>
        </Routes>
    </div>
    </>
  );
}

export default App;




