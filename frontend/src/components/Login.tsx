import { useState } from "react"
import {gql, useQuery} from "@apollo/client";
import { TextField, Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isLoggedInAtom, userIDAtom } from "../shared/globalState";



const Login = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState(''); 
    const navigate = useNavigate();


    const LOGIN_MUTATION = gql`
    query Query (
    $userName: String!
    $password:String!
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

  const {data} = useQuery(LOGIN_MUTATION, {
    variables: {
      userName: userName,
      password: password
  }})


  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInAtom);
  const [userID, setUserID] = useRecoilState(userIDAtom);


  function checkUser(){
      if(data.login.length){
        setIsLoggedIn(true);
        setUserID(data.login[0].id);
        navigate("/");
        window.location.reload();
      }else{
        setIsLoggedIn(false);
        console.log("Feil brukernavn eller passord")
      }
  }

  function logout(){
    setIsLoggedIn(false);
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