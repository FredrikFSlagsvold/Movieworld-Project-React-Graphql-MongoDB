import { useState } from "react"
import {gql, useQuery} from "@apollo/client";
import { TextField, Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";



const Login = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState(''); 
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const navigate = useNavigate();


    const LOGIN_MUTATION = gql`
    query Query (
    $userName: String
    $password:String
  ) {
    login( 
      userName: $userName,
      password: $password
    ) {
      id
      firstName
      lastName
      userName
      password
    }
  }
`;

    console.log(sessionStorage.getItem("isLoggedIn") === "true")

  const {data} = useQuery(LOGIN_MUTATION, {
    variables: {
      userName: userName,
      password: password
  }})

  function checkUser(){
    console.log("Du har trykket login", data.login.length)
      if(data.login.length){
        sessionStorage.setItem("isLoggedIn", "true")  
        setIsLoggedIn(true)
        console.log("Du er logget inn")
        navigate("/");
        window.location.reload();
      }else{
        sessionStorage.setItem("isLoggedIn", "false")
        console.log("Feil brukernavn eller passord")
      }
  }

  function logout(){
     sessionStorage.setItem("isLoggedIn", "false")
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h4" sx={{ p: 1 }}> 
        Login
        </Typography>
      
        <TextField
          label="Username"
          variant="outlined"
          required
          value={userName}
           onChange={(e) =>
            setUserName(e.target.value
            )
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
                sx={{ m: 1 }}
                data-testid="loginButton" //legges inn for å kunne bruke knappen under end to end testing.
              >
              login
            </Button>

        <Button
        component={Link} to="/register"
          variant="contained"
          sx={{ m: 1 }}

        >
     Create new account
        </Button>

        <Button
        variant="contained"
        onClick={logout}>
          
          Logout
        </Button>
    </Box>
  )
    
}

export default Login;