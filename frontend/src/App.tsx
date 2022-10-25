import {Navigate, Route, Routes} from 'react-router-dom';
import DisplayUsers from './components/DisplayUsers';
import Header from './components/Header';
import DisplayMovie from './components/DisplayMovie';
import MoviesPaginated from './components/MoviesPaginated';
import SearchField from './components/SearchField';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoutes from './ProtectedRoutes';
import DisplaySingleMovie from './components/DisplaySingleMovie';




function App() {

  return (
    <>
    <div>
      <Header />
        <Routes>
          {/* <Route path="/" element={<Navigate replace to="/login" />} /> */}
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route element={<ProtectedRoutes />}> 
            <Route path="/displayUsers" element={<DisplayUsers/>} />
            <Route path="/" element={<SearchField/>}/>
            <Route path="/movieoffset" element={<MoviesPaginated value={0}/>}/>
          <Route path="/movie/:movieID" element={<DisplayMovie />}/> 
          <Route path="/displayUsers" element={<DisplayUsers/>} />
          </Route>
        </Routes>
    </div>
    </>
  );
}
export default App;




