import {useContext, useEffect, useRef, useState} from "react";
import Spinner from "./Spinner";
import Logo from "./Logo";
import {fetchMovies} from "../Utils";
import SearchHistory from "./SearchHistory";
import ErrorAlert from "./ErrorAlert";
import {Context} from "../App";


// the component that searches for movies using the TMDB API
export default function Search({apiKey}) {
    const setCartMovies = useContext(Context).setCartMovies;

    const [isLoading, setIsLoading] = useState(false);
    const [moviesCards, setMoviesCards] = useState([]);
    const [query, setQuery] = useState("");

    const [queriesHistory, setQueriesHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const searchArea = useRef();

    useEffect(() => {
        window.onclick = (ev) => {
            if (ev.target.contains(searchArea.current)) {
               setShowHistory(false);
            }
        }
    }, []);


    async function handleSubmit(ev) {
        ev.preventDefault();
        const url = `https://api.themoviedb.org/3/search/movie?include_adult=false&api_key=${apiKey}&query=${query}`;
        await fetchMovies(url, setMoviesCards, setCartMovies ,
            setIsLoading, setErrorMessage);
        setQueriesHistory(queriesHistory => [query, ...queriesHistory]);
    }

    return (
        <div className="container">
            <Logo/>

            <div className="row d-flex justify-content-center">
                <div ref={searchArea} className="col-10 col-sm-8 col-md-6">
                    <form onSubmit={handleSubmit}>
                        <div className="d-flex">
                            <input required onFocus={() => setShowHistory(true)}
                                   onChange={(ev) => setQuery(ev.target.value)}
                                   className="form-control form-control-lg me-2"
                                   type="text" placeholder="Search a movie..."/>
                            <button className="btn btn-primary" type="submit">Search</button>
                        </div>
                    </form>

                    {queriesHistory.length > 0 && showHistory &&
                    <SearchHistory queriesHistory={queriesHistory}
                             setQueriesHistory={setQueriesHistory}
                             setQuery={setQuery}
                             handleSubmit={handleSubmit} />}
                    {errorMessage.length !== 0 && <ErrorAlert errorMessage={errorMessage}/>}
                    {isLoading && <Spinner/>}
                </div>
            </div>

            <div className="row d-flex justify-content-center mt-4">
                    {moviesCards}
            </div>

        </div>
    );
}
