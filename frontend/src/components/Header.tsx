import { Button, ButtonGroup } from "@mui/material";
import { Link } from "react-router-dom";
import "./header.css"


export default function Header(){
  function logout(){
    sessionStorage.setItem("isLoggedIn", "false")
    window.location.reload()
  }


    return (
      <div className="href">
      <div className="link">
        <Link data-testid="HomePageLink" to="/" reloadDocument={true}>M O V I E W O R L D</Link>
        </div>
      <div className="topRight">
        <ButtonGroup variant="text" color="inherit" aria-label="text button group">
          <div style={{cursor: "pointer", padding:"10px", fontSize:"16px"}}> 
           <Link data-testid="LikedMoviesLink" reloadDocument={true} to="/liked">LIKED MOVIES</Link> </div>
          {sessionStorage.getItem("isLoggedIn") === "true" ?  <div style={{cursor: "pointer", padding:"10px", fontSize:"16px"}} onClick={logout}>LOGOUT</div> : <div className="link"><Link to="/login">Login</Link></div>}
        </ButtonGroup>
      </div>
    </div>

      );
}

