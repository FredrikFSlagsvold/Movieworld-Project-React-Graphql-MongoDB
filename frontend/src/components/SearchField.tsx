import React, { useState } from "react";
import { gql, useQuery } from '@apollo/client';
// import Link from './Link';

export default function SearchField(){

    //     const get = gql`
    //     query FeedSearchQuery($filter: String!) {
    //         feed(filter: $filter) {
    //             id
    //             links {
    //                 id
    //                 url
    //                 description
    //                 createdAt
    //                 postedBy {
    //                     id
    //                     name
    //                 }
    //                 votes {
    //                     id
    //                     user {
    //                         id
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // `;

    const getMovies = gql` 
    query Query {
    Users{
        id
        firstName
        lastName
    }
    }
    `;
    
    const [searchFilter, setSearchFilter] = useState('');
    const { loading, error, data } = useQuery(getMovies);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;

    return (
    <>
      <div>
        Search
        <input
          type="text"
          onChange={(e) => setSearchFilter(e.target.value)}
        />
        <button>OK</button>
      </div>
      {/* {data &&
        data.feed.links.map((link, index) => (
          <Link key={link.id} link={link} index={index} />
        ))} */}
    </>
  );
}




