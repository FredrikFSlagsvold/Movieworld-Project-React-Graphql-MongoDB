import ReactDOM from 'react-dom/client';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import {  BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';


const client = new ApolloClient({
  uri: 'http://it2810-20.idi.ntnu.no:3001/movie', 
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter basename='/project3'>
    <ApolloProvider client={client}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </ApolloProvider>
  </BrowserRouter>
);

