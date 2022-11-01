import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import DisplaySingleMovie from "../components/DisplaySingleMovie";
import { MovieFeed } from "../utils/Queries";

type MovieProps = {
    limit: number,
    offset: number,
    text: string
    filter: string
    sort: number,
    sortType: string
}

type DisplaySingleMovieProps ={
    poster_path: String;
    original_language: String;
    title: String;
    runtime: number;
    genres: [String]; 
    id: String
    vote_average: number;
    release_date: String
}


export default function Movies({offset, limit, filter, text, sort, sortType}: MovieProps) {
    const nav = useNavigate();
    const {loading, error, data } = useQuery(MovieFeed, {
        variables: {offset: offset, limit: limit, filter: filter, text: text, sort: sort, sortType: sortType},
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error...</p>;

    return (
        <div data-testid="moviePage" style={{display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '100%'
        }}>
            {data.moviesBySearch.map(({ title, genres, poster_path, runtime, original_language, id, vote_average, release_date }: DisplaySingleMovieProps) => { 
                return (  
                    <div key={Number(id)} onClick={()=> nav('/movie/' + id)} tabIndex={0} onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    e.key === "Enter" && nav('/movie/' + id) 
                     }}>
                        <DisplaySingleMovie poster_path={poster_path} release_date={release_date} vote_average={vote_average} title={title} runtime={runtime} genres={genres}/>
                    </div>
                )
            })}
        </div>
    )
}