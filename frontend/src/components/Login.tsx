import { useState } from "react"
import { useQuery} from "@apollo/client";
import { TextField, Box, Button, Typography, Alert } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LOGIN_MUTATION } from "../utils/Queries";

const Login = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState(''); 
    const [isWrongUser, setIsWrongUser] = useState(false)
    const navigate = useNavigate();

  const {data} = useQuery(LOGIN_MUTATION, {
    variables: {
      userName: userName,
      password: password
  }})



  function checkUser(){
      if(data.login.length){
        sessionStorage.setItem("isLoggedIn", "true")
        sessionStorage.setItem("userID", data.login[0].id)  
        navigate("/");
        window.location.reload();
      }else{
        sessionStorage.setItem("isLoggedIn", "false")
        setIsWrongUser(true)
      }
  }


  return (
    <>
    <div className="href">
      <div className="link">
        <p>M O V I E W O R L D</p>
        </div>
    </div>
    <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h4" sx={{ p: 1 }} fontFamily="Verdana, sans-serif, Areal"> 
        Login
        </Typography>
      
        <TextField
          label="Username"
          variant="outlined"
          required
          value={userName}
           onChange={(e) =>
            setUserName(e.target.value)
          }
          sx={{ m: 1 }}
          data-testid="username"
        />

        <TextField
          label="Password"
          variant="outlined"
          type="password"
          data-testid="password"
            value={password}
          required
              onChange={(e) =>
            setPassword(e.target.value
            )
            
          }
          sx={{ m: 1 }}
        />
        <Button
            disabled={userName === "" || password === ""}
            variant="contained"
            onClick={checkUser}
            sx={{ m: 1, backgroundColor: '#8b6363', hoverBackgroundColor: 'gray' }}
            data-testid="loginButton"
          >
          login
        </Button>

        <Button
        component={Link} to="/register"
          variant="contained"
          sx={{ m: 1, backgroundColor: '#8b6363' }}>
            Create new account
        </Button>
        {isWrongUser && <Alert severity="info">Wrong username or password</Alert>
        }
     
    </Box>
        </>
  )
    
}

export default Login;