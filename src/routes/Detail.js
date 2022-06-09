import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail(){
    const [loading, setLoading] = useState(true);
    const {id} = useParams();
    const [movieDetail, setMovieDetail] = useState({});
    const [genres, setGenres] = useState([]);
    const getMovie = useCallback( async () => {
        const json = await (
            await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        ).json();
        setMovieDetail(json.data.movie);
        setGenres(json.data.movie.genres);
        setLoading(false);
    },[id]);
    useEffect(() => {
        getMovie();
    }, [getMovie]);
    console.log(movieDetail);
     
    return (
        <div>
            {
                loading
                ?
                <h1>Loading</h1>
                :
                <div>
                    <h1>{movieDetail.title}</h1>
                    <img src={movieDetail.medium_cover_image} alt={movieDetail.title}/>
                    <p>{movieDetail.description_intro}</p>
                    <ul>
                        {genres.map((list) => (
                            <li key={movieDetail.id}>{list}</li>
                        ))}
                    </ul>
                </div>
            }
        </div>
    )
}

export default Detail;