import {Navigate, Route, Routes} from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';

import HomePage from './Page/HomePage';
import DisplayMovie from './components/DisplayMovie';
import DisplayUsers from './components/DisplayUsers';
import Header from './components/Header';
import Login from './components/Login';
import LikedMovies from './components/LikedMovies';
import SearchField from './components/SearchField';
import CreateUser from './CreateUser';




function App() {
  return (
    <>
    <div>
      <Header />
        <Routes>
          {/* <Route path="/" element={<Navigate replace to="/login" />} /> */}
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<CreateUser/>} />
            <Route element={<ProtectedRoutes />}> 
              <Route path="/displayUsers" element={<DisplayUsers/>} />
              <Route path="/" element={<HomePage/>}/>
              <Route path="/movie/:movieID" element={<DisplayMovie />}/> 
              <Route path="/liked" element={<LikedMovies/>} />
              <Route path="/displayUsers" element={<DisplayUsers/>} />
          </Route>
        </Routes>
    </div>
    </>
  );
}
export default App;




