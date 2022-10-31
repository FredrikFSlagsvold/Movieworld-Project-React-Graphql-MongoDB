import { Link } from "react-router-dom";
import "./header.css"


export default function Header(){
    return (
        <div className="href">
          <div className="link"><Link data-testid="HomePageLink" to="/">HomePage</Link></div>
            <div className="link"><Link data-testid="LikedMoviesLink" reloadDocument={true} to="/liked">Liked Movies</Link></div>
            <div className="link"><Link to="/login">Login</Link></div>
        </div>
      );
}

