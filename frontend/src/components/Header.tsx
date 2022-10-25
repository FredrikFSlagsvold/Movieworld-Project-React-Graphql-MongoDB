import { Link } from "react-router-dom";
import "../components/header.css"


export default function Header(){
    return (
        <div className="href">
          <div className="link"><Link to="/">HomePage</Link></div>
            {/* <div className="link"><Link to="/search">Search</Link></div> */}
            <div className="link"><Link to="/displayUsers">displayUsers</Link></div>
            <div className="link"><Link to="/movieoffset">movieoffset</Link></div>
            <div className="link"><Link to="login">Login</Link></div>
        </div>
      );

}