import { Link } from "react-router-dom";
import "./header.css"


export default function Header(){
    return (
        <div className="href" style={{justifyContent: ''}}>
          <div><p id='logoName'>MOVIEWORLD</p></div>
          <div className="link"><Link to="/">HomePage</Link></div>
            {/* <div className="link"><Link to="/search">Search</Link></div> */}
            <div className="link"><Link to="/displayUsers">Display Users</Link></div>
            <div className="link"><Link to="/movieoffset">Movie offset</Link></div>
            <div className="link"><Link to="login">Login</Link></div>
            <a href="login" target="_blank">Login</a>
        </div>
      );
}

