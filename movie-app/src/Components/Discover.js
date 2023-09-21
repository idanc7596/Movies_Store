import {useContext, useEffect, useState} from "react";
import axios from "axios";
import Spinner from "./Spinner";
import Logo from "./Logo";
import {fetchMovies} from "../Utils";
import ErrorAlert from "./ErrorAlert";
import {Context} from "../App";


// the component that discovers movies according to two attributes: genres and year.
export default function Discover({apiKey}) {
    const setCartMovies = useContext(Context).setCartMovies;

    const [isLoading, setIsLoading] = useState(false);
    const [moviesCards, setMoviesCards] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedYear, setSelectedYear] = useState();
    const [errorMessage, setErrorMessage] = useState("");

    // get the list of genres from the TMDB API
    async function getGenres() {
        setErrorMessage("");
        try {
            const result = await axios(
                `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
            );
            setGenres(result.data.genres);
        } catch (err) {
            setErrorMessage(`${err.message} - Failed to fetch genres.`);
        }
    }

    useEffect(() => {
        getGenres();
    }, []);


    // create the checkboxes for the genres
    const genresCheckboxes = [];
    genres.forEach((genre, i) => {
        genresCheckboxes.push(
            <div key={i} className="form-check">
                <input onChange={handleCheckboxChange}
                    className="form-check-input" type="checkbox" value={genre.id} id={genre.id}/>
                <label className="form-check-label" htmlFor={genre.id}>
                    {genre.name}
                </label>
            </div>
        );
    });

    function handleCheckboxChange(ev) {
        if (ev.target.checked) {
            setSelectedGenres(selectedGenres => [...selectedGenres, ev.target.value]);
        } else {
            setSelectedGenres(selectedGenres.filter(genre => genre !== ev.target.value));
        }
    }

    async function handleSubmit(ev) {
        ev.preventDefault();
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false
                &with_genres=${selectedGenres.join(',')}&primary_release_year=${selectedYear}`;
        await fetchMovies(url, setMoviesCards, setCartMovies , setIsLoading, setErrorMessage);
    }

    return (
        <>
            <div className="container">
                <Logo/>

                <div className="row d-flex justify-content-center">
                    <div className="col-10 col-sm-8 col-md-6">
                        <div className="card card-body">
                            <form onSubmit={handleSubmit}>
                                <h5>Choose genre(s):</h5>
                                {genresCheckboxes}
                                <h5 className="mt-2">Choose year:</h5>
                                <input onChange={(ev) => {setSelectedYear(ev.target.value)}}
                                       className="form-control form-control-lg my-2"
                                       type="number" placeholder="Enter year..."/>
                                <button className="btn btn-primary" type="submit">Discover</button>
                            </form>
                        </div>
                        {errorMessage.length !== 0 && <ErrorAlert errorMessage={errorMessage}/>}
                        {isLoading && <Spinner/>}
                    </div>
                </div>

                <div className="row d-flex justify-content-center mt-4">
                    {moviesCards}
                </div>

            </div>
        </>
    );
}




