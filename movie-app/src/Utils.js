import axios from "axios";
import MovieCard from "./Components/MovieCard";

const MOVIE_PRICE = 3.99;

// Fetches movies from the API and updates the movie cards
export async function fetchMovies(url, setMoviesCards, setCartMovies,
                                  setIsLoading, setErrorMessage) {
    setMoviesCards([]);
    setErrorMessage("");
    setIsLoading(true);
    try {
        const result = await axios(url);
        if(result.data.results.length === 0) {
            throw new Error("No results.");
        }
        const movieCards = result.data.results.map((movieData, i) => {
            movieData.price = MOVIE_PRICE;
            return <MovieCard key={i} data={movieData} setCartMovies={setCartMovies}/>;
        });
        setMoviesCards(movieCards);
    } catch (err) {
        setErrorMessage(err.message);
    } finally {
        setIsLoading(false);
    }
}

// Fetches the cart from the API and updates the cart movies
export async function updateCart(setCartMovies, setErrorMessage) {
    try {
        const result = await axios("/api/cart");
        setCartMovies(result.data);
    } catch (err) {
        setErrorMessage(`Failed to fetch cart - ${err.message}`);
    }
}

// check if the response is ok, if not throw an error
export async function status(res) {
    if (res.ok) { //no errors
        return Promise.resolve(res);
    } else {
        const error = new Error(await res.text() || 'Unknown error occurred.');
        error.code = res.status;
        return Promise.reject(error);
    }
}