import { useQuery, gql, useLazyQuery } from "@apollo/client";
import "./header.css";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import Divider from "@mui/material/Divider";
import { useParams, useNavigate, Link } from "react-router-dom";
import DisplaySingleMovie from "./DisplaySingleMovie";
import { useEffect } from "react";

type ThisMovieProps = {
  id?: any;
  title?: string;
  type?: string;
  cast?: [{ id: String; name: String }];
  directors?: [{ id: String; name: String }];
  country?: string;
  release_date?: number;
  description?: string;
  listed_in?: string;
  date_added?: string;
  trailer_yt?: string;
  original_language?: string;
  runtime?: number;
};

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  "& > :not(style) + :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

const GET_MOVIE = gql`
  query Query($id: Int!) {
    movieByID(id: $id) {
      title
      overview
      poster_path
      trailer_yt
      release_date
      original_language
      runtime
      genres
      cast {
        name
        id
      }
      directors {
        name
        id
      }
      similar {
        title
        id
      }
    }
  }
`;

const GET_SIMILAR_MOVIES = gql`
  query Query($ids: [Int]) {
    movieListByIDs(ids: $ids) {
      id
      title
      genres
      poster_path
      original_language
      runtime
    }
  }
`;

export default function DisplayMovie() {
  const { movieID } = useParams<string>();

  const nav = useNavigate();

  const { loading, error, data } = useQuery(GET_MOVIE, {
    variables: { id: parseInt(movieID!) },
  });

  const [
    fetchSimilar,
    { loading: similarLoading, error: similarError, data: similarData },
  ] = useLazyQuery(GET_SIMILAR_MOVIES);

  useEffect(() => {
    console.log("data", data);
    if (data === undefined) return;
    fetchSimilar({
      variables: { ids: data.movieByID.similar.map((data: any) => parseInt(data.id)) },
    });
  }, [data]);

  console.log("simdata", similarData);
  


  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
    return <p>Error</p>;
  }
  console.log(data);
  console.log("genres: " + data.movieByID.genres)

  /*
            <div className="href" style={{margin: "5px 320px 5px"}}>
                <p><EventIcon data-testid="eventIcon"></EventIcon>{year}</p>
                <p><EmojiPeopleIcon data-testid="emojiPeopleIcon"></EmojiPeopleIcon> Director: {data.movieByID.director}</p>
                <p><CategoryIcon data-testid="categoryIcon"></CategoryIcon>Category: {data.movieByID.listed_in}</p>
                <EventIcon data-testid="eventIcon"></EventIcon>
                <MovieIcon data-testid="movieIcon"></MovieIcon> 
            </div>
            */

  return (
    <div style={{
      fontFamily: "Verdana, sans-serif, Areal"
    }}>
      <div
        style={{
          backgroundColor: "white",
          margin: "0px 200px 0px",
          fontFamily: "Verdana, sans-serif, Areal",
        }}
      >
          <h1 style={{ textAlign: "center" }}>{data.movieByID.title}</h1>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <p>{data?.movieByID.release_date.substring(0, 4)}</p>
            <p>{data?.movieByID.original_language}</p>
            <p>{data?.movieByID.runtime} minutes</p>
          </div>
          <div
            className="flex-container"
            style={{ textAlign: "left", display: "flex", padding: "5px" }}
          >
            <div>
            <h3 style={{backgroundColor:"#F3CCCC", borderRadius:"25px", textAlign: "center", fontFamily: "Verdana, sans-serif, Areal"}}>Directors</h3>
              <Root>
                  {data?.movieByID.directors.map((director: any) => {
                    return (
                      <div key={director.id}>
                        <div>{director.name}</div>
                      </div>
                    );
                  })}
                <h3 style={{backgroundColor:"#F3CCCC", borderRadius:"25px", textAlign: "center", fontFamily: "Verdana, sans-serif, Areal"}}>Cast</h3>
                  {data?.movieByID.cast.map((actor: any) => {
                    return (
                      <div key={actor.id}>
                        <div>{actor.name}</div>
                      </div>
                    );
                  })}
                <h3 style={{backgroundColor:"#F3CCCC", borderRadius:"25px", textAlign: "center", fontFamily: "Verdana, sans-serif, Areal"}}>Description</h3>
                {data?.movieByID.overview}
                <h3 style={{backgroundColor:"#F3CCCC", borderRadius:"25px", textAlign: "center", fontFamily: "Verdana, sans-serif, Areal"}}>Categories</h3>
                {data?.movieByID.genres.join(', ')}
              </Root>
            </div>
            <img
              src={
                "https://image.tmdb.org/t/p/original/" +
                data.movieByID.poster_path
              }
              style={{ margin: "5px 10px 5px" }}
              width="299.52px"
              height="449.28px"
            />
          </div>
          <div
            className="flex-container"
            style={{
              textAlign: "left",
              display: "flex",
              margin: "5px 280px 5px",
              padding: "5px",
            }}
          ></div>
        <Root style={{ textAlign: "center" }}>
        <h3 style={{backgroundColor:"#F3CCCC", borderRadius:"25px", textAlign: "center", fontFamily: "Georgia"}}>Trailer</h3>
          <iframe
            width="693 "
            height="520"
            src={"https://www.youtube.com/embed/" + data.movieByID.trailer_yt}
          ></iframe>
        </Root>
        <p style={{ textAlign: "center" }}>
        <h3 style={{backgroundColor:"#F3CCCC", borderRadius:"25px", textAlign: "center", fontFamily: "Georgia"}}>Similar movies</h3>
        </p>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            padding: "56px",
          }}
        >
          {similarData?.movieListByIDs.map((data: any) => {
            //HER MÅ VI HA INN NOE SOM ENDRER FRA SIMILAR (TITLE, ID) TIL SELVE MOVIEN
            console.log(data)
            console.log(data.id)
            return (
              <div style={{margin:"8px"}} onClick={() => nav("/movie/" + data.id)} >
                <DisplaySingleMovie
                  key={data.id}
                  poster_path={data.poster_path}
                  original_language={data.original_language}
                  title={data.title}
                  runtime={data.runtime}
                  genres={data.genres}
                />
              </div>
            )
          })}
        </Box>
      </div>
    </div>
  );
}
