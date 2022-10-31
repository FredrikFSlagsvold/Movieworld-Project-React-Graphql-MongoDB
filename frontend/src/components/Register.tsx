import { gql, useMutation } from "@apollo/client"
import { useState } from "react"


const REIGSTER_PEOPLE = gql`
    mutation Create($firstName: String, $lastName: String){
    people(firstName: $firstName, lastName: $lastName){
        firstName
        lastName
    } 
}`

export default function Register() {
    const[firstName, setFirstName] = useState("")
    const[lastName, setLastName] = useState("")

    const[addPeople, {data, loading, error}] = useMutation(REIGSTER_PEOPLE, {
        variables: { firstName: firstName, lastName: lastName }
    })

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error...</p>;

    return (
        //lage inputfelt med tilhørende knapp som setter firstname ved click. gjøre det samme med lastname. Deretter lage en knapp som kaller på mutasjonen (addPeople).
    <div>
    </div>
    )
}