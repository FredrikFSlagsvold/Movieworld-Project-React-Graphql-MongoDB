import { gql, useMutation } from "@apollo/client"
import { Box, Typography, TextField, Button } from "@mui/material"
import { useState } from "react"
import { Link } from "react-router-dom"

type UserProps= {
  firstName: String
  lastName: String
  password: String
  userName: String
}

  const SIGNUP_MUTATION = gql`
  mutation
  Users(
  $firstName: String! 
  $lastName: String!
  $password:String!
  $userName:String!
  ) {
  Users( 
    firstName: $firstName,
    lastName: $lastName,
    password:$password, 
    userName:$userName, 
  ) {
    id
    firstName
    lastName
    password
    userName
  }
  }
  `;

export default function CreateUser() {
    const[firstName, setFirstName] = useState("")
    const[lastName, setLastName] = useState("")
    const[password, setPassword] = useState("")
    const[userName, setUserName] = useState("")

  const [signup] = useMutation<
      { user: UserProps}
    >( SIGNUP_MUTATION, {
      variables: { firstName: firstName, lastName:lastName, password: password, userName: userName } 
    });

  return (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="h4" sx={{ p: 1 }}> Register new user
              </Typography>
              <TextField
              label="Firstname"
              variant="outlined"
              onChange={(e) =>
                setFirstName(e.target.value)}
              required
              sx={{ m: 1 }} />

              <TextField
              label="Lastname"
              variant="outlined"
              onChange={(e) =>
                setLastName(e.target.value)}
              required
              sx={{ m: 1 }} />

              <TextField
              label="Username"
              variant="outlined"
              onChange={(e) =>
                setUserName(e.target.value)}
              required
              sx={{ m: 1 }} />

              <TextField
              label="Password"
              type="password"
              variant="outlined"
              onChange={(e) =>
                setPassword(e.target.value)}
              required
              sx={{ m: 1 }} />
              
              <Button
              disabled={userName === "" || password === "" || firstName === "" || lastName === ""}
              variant="contained"
              type="submit"
              sx={{ m: 1 }}
              data-cy="submit-button"
              onClick={() => signup()}
            >
              Register new user
              </Button>
                 <Button
                component={Link} to="/login"
          variant="contained"
          sx={{ m: 1 }}

        >
     Go to login page
        </Button>
          </Box>
      )
    

}