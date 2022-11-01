import { useQuery, gql, useLazyQuery } from "@apollo/client";
import "./header.css";
import { useParams, useNavigate, Link} from "react-router-dom";
import DisplaySingleMovie from "./DisplaySingleMovie";
import { useEffect } from "react";
import FavoriteButton from "./FavoriteButton";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


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
  
  const [fetchSimilar,
    { data: similarData }] = useLazyQuery(GET_SIMILAR_MOVIES);

  useEffect(() => {
    if (data === undefined) return;
    fetchSimilar({
      variables: { ids: data.movieByID.similar.map((data: any) => parseInt(data.id)) },
    });
  }, [data, fetchSimilar]);  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div data-testID="testIDforAll">
      <Link style={{color:"#8b6363"}} to="/"><ArrowBackIcon/></Link>
      <div
        style={{
          backgroundColor: "white",
          margin: "0px 200px 0px",
          fontFamily: "Verdana, sans-serif, Areal",
        }}>
        <h1 style={{ textAlign: "center" }}>{data.movieByID.title}</h1>
        <FavoriteButton movieTitle={data.movieByID.title}/>

        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <p>{data?.movieByID.release_date.substring(0, 4)}</p>
          <p>{data?.movieByID.original_language}</p>
          <p>{data?.movieByID.runtime} minutes</p>
        </div>
        
          <div className="flex-container" style={{ textAlign: "left", display: "flex", padding: "5px" }}>
            <div>
              {/* DIRECTORS */}
              <h3 style={{backgroundColor:"#F3CCCC", borderRadius:"25px", textAlign: "center"}}>Directors</h3>
              {data?.movieByID.directors.map((director: any) => {
                return (
                  <div key={director.id}>{director.name}</div>);
              })}
              {/* CAST */}
              <h3 style={{backgroundColor:"#F3CCCC", borderRadius:"25px", textAlign: "center"}}>Cast</h3>
              {data?.movieByID.cast.map((actor: any) => {
                return (
                  <div key={actor.id}>{actor.name}</div>);
              })}
              {/* DESCRIPTION */}
              <h3 style={{backgroundColor:"#F3CCCC", borderRadius:"25px", textAlign: "center"}}>Description</h3>
              {data?.movieByID.overview}
              {/* CATEGORIES */}
              <h3 style={{backgroundColor:"#F3CCCC", borderRadius:"25px", textAlign: "center"}}>Categories</h3>
              {data?.movieByID.genres.join(', ')}
            </div>
            <img
              src={
                "https://image.tmdb.org/t/p/w600_and_h900_bestv2/" +
                data.movieByID.poster_path
              }
              alt=""
              style={{ margin: "5px 10px 5px" }}
              width="299.52px"
              height="449.28px"
            />
          </div>
        <div style={{ textAlign: "center" }}>
        {/* TRAILER */}
        <h3 style={{backgroundColor:"#F3CCCC", borderRadius:"25px", textAlign: "center", fontFamily: "Georgia"}}>Trailer</h3>
          <iframe
           title={data.movieByID.title}
            width="693 "
            height="520"
            src={"https://www.youtube.com/embed/" + data.movieByID.trailer_yt}
          />
        </div>
        {/* SIMILAR MOVIES */}
        <h3 style={{backgroundColor:"#F3CCCC", borderRadius:"25px", textAlign: "center", fontFamily: "Georgia"}}>Similar movies</h3>
        <div style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            padding: "56px",
          }}>
          {similarData?.movieListByIDs.map((data: any) => {
            return (
              <div style={{margin:"8px"}} onClick={() => nav("/movie/" + data.id)} tabIndex={0} onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                e.key === "Enter" && nav('/movie/' + data.id) 
              }}>
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
        </div>
      </div>
    </div>
  );
}
