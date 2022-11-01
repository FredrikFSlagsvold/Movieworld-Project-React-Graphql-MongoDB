import {Route, Routes} from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';
import HomePage from './Page/HomePage';
import DisplayMovie from './components/DisplayMovie';
import Header from './components/Header';
import Login from './components/Login';
import LikedMovies from './components/LikedMovies';
import CreateUser from './components/CreateUser';


function App() {
  return (
    <>
    <div>
      {sessionStorage.getItem("isLoggedIn") === "true" ? <Header/> : <></>}
        <Routes>
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<CreateUser/>} />
            <Route element={<ProtectedRoutes />}> 
              <Route path="/" element={<HomePage/>} />
              <Route path="/movie/:movieID" element={<DisplayMovie />}/> 
              <Route path="/liked" element={<LikedMovies/>} />
          </Route>
        </Routes>
    </div>
    </>
  );
}
export default App;




