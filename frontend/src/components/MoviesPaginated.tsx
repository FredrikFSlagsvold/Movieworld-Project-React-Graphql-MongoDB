import { useQuery, gql } from '@apollo/client';
import axios from 'axios';
import { useEffect, useState } from 'react';

type propTypes = {
    value: number,
  }

  type MovieProps = {
    id?: any;
    title: string;
    type?: string;
  }

// export const LIMIT = 20;

  //limit satt til 20. Kan endres ved behov.
  
  
  
  export default function DisplayMWProps({value} : propTypes){    
    const MovieFeed = gql`
    query Query( $skip: Int){
    moviesPagination(limit: 5, skip: $skip){
    id,
    type,
    title
    }
    }
    `;

    const [skip, setSkip] = useState(value)
    const {loading, error, data } = useQuery(MovieFeed, {
    variables: {skip}
    });


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error...</p>;

    return (
    <>
    <button disabled={skip === 0} onClick={()=> setSkip((prev)=> prev-5)}>prev</button>
    <button onClick={()=> setSkip((prev)=> prev+5)}>next</button>
   { data.moviesPagination.map(({ id, title, type}: MovieProps) => (
    <div key = {id}>
        <h3>{title}</h3>
        <p>{type}</p>
    </div>
    ))}
    </>
    )
}
