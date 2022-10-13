import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';


const client = new ApolloClient({
  uri: 'https://it2810-20.idi.ntnu.no:27017',
  cache: new InMemoryCache(),
});

client
  .query({
    query: gql`
      query  {
        movies {
          id
          firstname
          lastname
        
        }
      }
    `,
  })
  .then((result) => console.log(result));

function App() {
  return (
    <div>
hei
    </div>
  );
}

export default App;
