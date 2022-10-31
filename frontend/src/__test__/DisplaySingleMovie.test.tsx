import renderer from 'react-test-renderer';
import DisplaySingleMovie from '../components/DisplaySingleMovie';



it('renders when ', () => {
  const tree = renderer.create(<DisplaySingleMovie poster_path="/pgqgaUx1cJb5oZQQ5v0tNARCeBp.jpg" original_language="English" title="Godzilla vs. Kong" runtime={113} genres={["Action"]}/>).toJSON()
  expect(tree).toMatchSnapshot();
})

export default {};

/*
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { ReactDOM } from 'react';
import DisplaySingleMovie from '../components/DisplayMovie';
import { render,  cleanup } from '@testing-library/react'; 
import "jest-dom/extend-expect";

afterEach(cleanup);



it("renders without crashing", () => {
   const div = document.createElement("div");
   ReactDOM.render(<DisplaySingleMovie((poster_path="/pgqgaUx1cJb5oZQQ5v0tNARCeBp.jpg", original_language="English", title="Godzilla vs. Kong", runtime=113, genres=["Action"]))></DisplaySingleMovie>, div)
});

it('renders DisplayMovie correctly', () => {
  const {getByTestId} = render(<DisplaySingleMovie(poster_path="/pgqgaUx1cJb5oZQQ5v0tNARCeBp.jpg", original_language="English", title="Godzilla vs. Kong", runtime=113, genres=["Action"])></DisplaySingleMovie>)
  expect(getByTestId('')).toHaveTextContent()
})
*/

/*
const GET_MOVIE = gql`
  query Query($id: Int!) {
    movieByID(id: $id) {
      title
    }
  }
`;

const movieID = 412656;

const { loading, error, data } = useQuery(GET_MOVIE, {
    variables: { id: movieID },
  });

test('get title', () => {
    expect(data.GET_MOVIE.title).toBe("Chaos Walking");
});

*/