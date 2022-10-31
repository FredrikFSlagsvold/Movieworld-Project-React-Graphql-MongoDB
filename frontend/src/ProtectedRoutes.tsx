import { Outlet } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import Login from "./components/Login";
import { isLoggedInAtom } from "./shared/globalState";

const useAuth = (isLoggedInProp: Boolean) => {
    const user = {loggedIn: isLoggedInProp === true}
    return user && user.loggedIn;

}
const ProtectedRoutes = () => {
    const isLoggedIn = useRecoilValue(isLoggedInAtom);
    const isAuth = useAuth(isLoggedIn); 
    return( isAuth ? <Outlet /> : <Login /> 
      
    )
}

export default ProtectedRoutes
