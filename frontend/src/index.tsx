import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ApolloClient, InMemoryCache, useQuery, gql, ApolloProvider} from '@apollo/client';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
});

// const data = useQuery(
//     gql`
//       query  {
//         users {
//           id
//           firstname
//           lastname
//         }
//       }
//     `
// )

// console.log(data)


root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

