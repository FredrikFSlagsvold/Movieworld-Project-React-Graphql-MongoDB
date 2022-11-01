import App from '../App';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { RecoilRoot } from 'recoil';


test("First snapshot test", () => {

    const client = new ApolloClient({
        uri: 'http://localhost:3001/movie', 
        cache: new InMemoryCache(),
      });

    const component = renderer.create(
        <BrowserRouter>
            <ApolloProvider client={client}>
                <RecoilRoot>
                    <App />
                </RecoilRoot>
            </ApolloProvider>
        </BrowserRouter>
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
});

export default {};
