import { useQuery, gql } from '@apollo/client';
import "./header.css";
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import { useParams } from 'react-router-dom';


type ThisMovieProps = {
    id?: any;
    title?: string;
    type?: string;
    cast?: [{id: String, name: String}];
    directors?: [{id: String, name: String}];
    country?: string;
    release_date?: number;
    description?: string,
    listed_in?: string;
    date_added?: string;
    trailer_yt?: string;
    original_language?: string;
    runtime?: number
}

const Root = styled('div')(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
    '& > :not(style) + :not(style)': {
      marginTop: theme.spacing(2),
    },
  }));


  const GET_MOVIE = gql` 
    query Query ($id: ID!) {
        movieByID (id: $id) {
          title
          overview
          poster_path
          trailer_yt
          release_date
          original_language
          runtime
          cast{
            name
            id
          }
          directors{
            name
            id
          }
        }
      }
    `;

export default function DisplayMovie() {

    const { movieID } = useParams<string>();

    console.log(movieID)

    const { loading, error, data } = useQuery(GET_MOVIE, {
        variables: {id: movieID}
    });

    
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;
    console.log(data)

   
    

    /*
            <div className="href" style={{margin: "5px 320px 5px"}}>
                <p><EventIcon data-testid="eventIcon"></EventIcon>{year}</p>
                <p><EmojiPeopleIcon data-testid="emojiPeopleIcon"></EmojiPeopleIcon> Director: {data.movieByID.director}</p>
                <p><CategoryIcon data-testid="categoryIcon"></CategoryIcon>Category: {data.movieByID.listed_in}</p>
                <EventIcon data-testid="eventIcon"></EventIcon>
                <MovieIcon data-testid="movieIcon"></MovieIcon> 
            </div>
            */
    console.log("heiiiiiii")

    return (
        <div>
            <div style={{backgroundColor: "white", margin: "0px 290px 0px", fontFamily: "Georgia"}}>
            <body >
            <h1 style={{textAlign: "center"}}>{data.movieByID.title}</h1>
            <div style={{display:"flex", justifyContent: "space-around"}}>
                <p>{data.movieByID.release_date.substring(0,4)}</p>
                <p>{data.movieByID.original_language}</p>
                <p>{data.movieByID.runtime} minutes</p>
            </div>
        <div className="flex-container" style={{textAlign: "left", display: "flex", padding: "5px"}}>
            <div>
                <Root>
                    <Divider>Directors</Divider>
                    <tr>{data.movieByID.directors.map((director: any) => {return <tr><td>{director.name}</td></tr>})}</tr>
                    <Divider>Cast</Divider>
                    <tr>{data.movieByID.cast.map((actor: any) => {return <tr><td>{actor.name}</td></tr>})}</tr>
                    <Divider>Description</Divider>
                    {data.movieByID.overview}
                 </Root>
            </div>
            <img src={"https://image.tmdb.org/t/p/w600_and_h900_bestv2/"+data.movieByID.poster_path}
                 style={{margin: "5px 10px 5px"}} width="199.68px" height="299.52px"
                />
        </div>
        <div className="flex-container" style={{textAlign: "left", display: "flex", margin: "5px 280px 5px", padding: "5px"}}>
        </div>
        </body>
        <Root style={{textAlign: "center"}}>
                    <Divider>Trailer</Divider>
                    <iframe width="693 " height="520"
                         src={"https://www.youtube.com/embed/" + data.movieByID.trailer_yt}></iframe>
                 </Root>
        <p style={{textAlign: "center"}}>Tihi</p>
        </div>
    </div>
    );
}