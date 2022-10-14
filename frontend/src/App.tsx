import React from 'react';
import { ApolloClient, InMemoryCache, useQuery, gql} from '@apollo/client';


function App() {

  const getUsers = gql`
  query Query {
  users{
  id
  }
  }
 `; 

  const data = useQuery(getUsers)


console.log("hei", data)

  return (
    <div>
hei
    </div>
  );
}

export default App;
