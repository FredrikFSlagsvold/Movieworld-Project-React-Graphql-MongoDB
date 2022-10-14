import React from 'react';
import { useQuery, gql } from '@apollo/client';

type MovieProps = {
id?: any;
firstName?: string;
lastName?: string;
}


export default function DisplayUsers({firstName = "Nicolai"}: MovieProps) {

    const getMovies = gql` 
    query Query {
    Users{
        id
        firstName
        lastName
    }
    }
    `;

    const { loading, error, data } = useQuery(getMovies);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;


    return data.Users.map(({id, firstName , lastName }: MovieProps) => (
    <div key={id}>
        <h3>{firstName} </h3>
        <h2>{lastName}</h2>
    </div>
    ));
}