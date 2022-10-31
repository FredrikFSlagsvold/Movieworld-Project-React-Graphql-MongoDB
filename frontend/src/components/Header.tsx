import { Link } from "react-router-dom";
import "./header.css"
import { Button } from "@mui/material";


export default function Header(){
    function logout(){
     sessionStorage.setItem("isLoggedIn", "false")
     window.location.reload();

  }

  
    return (
        <div className="href">
          <div className="link"><Link data-testid="HomePageLink" to="/">HomePage</Link></div>
            <div className="link"><Link data-testid="LikedMoviesLink" reloadDocument={true} to="/liked">Liked Movies</Link></div>
            
            {sessionStorage.getItem("isLoggedIn") === "true" ?  <Button onClick={logout}  variant="contained">Logout</Button> : <div className="link"><Link to="/login">Login</Link></div>}
        </div>
      );
}

