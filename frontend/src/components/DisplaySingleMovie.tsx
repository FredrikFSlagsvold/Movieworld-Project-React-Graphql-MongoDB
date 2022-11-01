import StarIcon from '@mui/icons-material/Star';

type DisplaySingleMovieProps ={
    poster_path: String;
    title: String;
    runtime: number;
    genres: [String];
    vote_average: number;
    release_date: String
}

export default function DisplaySingleMovie({poster_path, title, runtime, genres, vote_average, release_date}: DisplaySingleMovieProps){
    let genresString = genres.join(', ');
    return <>
    <div data-testid="singleMovieDiv" style={{
        width: 190,
        height: 320,
        backgroundColor: "white",
        fontFamily: "Verdana, sans-serif, Areal",
        fontSize:"12px",
        margin: "24px",
        cursor: 'pointer',
    }}>
        <img src={"https://image.tmdb.org/t/p/w600_and_h900_bestv2/"+ poster_path} width="190px" height="284.8px" alt=""/>
            <div style={{textAlign:"center"}}>
            {(() => {
        if (title.length>24) {
          return (
            <div><strong>{title.substring(0,21)+ "..."}</strong></div>
          )
        } else {
          return (
            <div><strong>{title}</strong></div>
          )
        }
      })()}
            </div>
            
            <div style={{textAlign:"center"}}>
            {(() => {
                if (genresString.length>25) {
                    return (
                        <div>{genresString.substring(0,23)+ "..."}</div>
                    )
                } else {
                    return (
                        <div>{genresString}</div>
                    )
                }
            })()}
            <div style={{display:'flex', justifyContent: 'space-around', flexDirection:'row', alignItems: 'flex-end'}}>
                <div>{runtime} min</div>
                <div style={{display:'flex', alignItems: 'flex-end'}}><StarIcon sx={{alignItems: "baseline", marginBottom: "1px"}}fontSize='inherit'/>{vote_average}</div>
                <div>{release_date.substring(0,4)}</div>
            </div>
            </div>
    </div>
    </>
}