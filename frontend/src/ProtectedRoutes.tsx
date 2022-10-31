import { Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import Login from "./components/Login";
import { isLoggedInAtom } from "./shared/globalState";

const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInAtom);

const useAuth = () => {
    const user = {loggedIn: isLoggedIn === true}
    return user && user.loggedIn;

}
const ProtectedRoutes = () => {
    const isAuth = useAuth(); 
    return( isAuth ? <Outlet /> : <Login /> 
      
    )
}

export default ProtectedRoutes
