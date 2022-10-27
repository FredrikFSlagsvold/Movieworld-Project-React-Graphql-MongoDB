
type cardProps = {
    id?: any;
    title: string;
    directors: [{
        id: String;
        name: String;
    }],
    genres?: Array<String>;
    cast: [{
        id: String,
        name: String
    }],
    poster_path: string; 
}


export default function Card( {id, title, directors, genres, cast, poster_path}: cardProps){
    
    return (
        <div key={id} style={{ float: "left", margin: "30px"}}>
            <div>
                <img style={{ height: "421px", width: "284px" }} src={"https://image.tmdb.org/t/p/original"+poster_path} alt="PosterImage"/>
            </div>
            <div style={{height: "300px", width: "284px", overflow: "scroll", cursor: "pointer", fontFamily: "Verdana, sans-seriff, Arial"}}>
                <h1>{title}</h1>
                <h3>Directors: {directors.map((director) => { return (<p>{director.name}</p>) })}</h3>
                <h4>Genres: {genres?.map((genre) => { return (<p>{genre}</p>)})}</h4>
                <h2>Actors: </h2>{cast.map((actor) => { return (<p>{actor.name}</p>)})}
            </div>
        </div>
    )
}