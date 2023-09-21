import {useContext, useEffect, useState} from "react";
import CartMovieCard from "./CartMovieCard";
import {Link} from "react-router-dom";
import {updateCart, status} from "../Utils";
import ErrorAlert from "./ErrorAlert";
import {Context} from "../App";
import Spinner from "./Spinner";

// the component that displays the cart page
export default function Cart() {
    const cartMovies = useContext(Context).cartMovies;
    const setCartMovies = useContext(Context).setCartMovies;

    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0.0);
    const [errorMessage, setErrorMessage] = useState("");


    useEffect(() => {
        let total = 0.0;
        cartMovies.forEach(movie => {
            total += movie.price;
        });
        setTotalPrice(total.toFixed(2));
    }, [cartMovies]);

     // make an API call to delete a movie from the cart
     function deleteMovie(ev) {
        setIsLoading(true);
        fetch(`/api/cart/deleteMovie/${ev.target.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(status)
          .then(() => {
              updateCart(setCartMovies, setErrorMessage).then();
          })
          .catch((err) => {
              setErrorMessage(`Failed to delete movie - ${err.message}`);
          }).finally(() => {setIsLoading(false);})
    }

    // make an API call to empty the cart
    function emptyCart() {
         setIsLoading(true);
         fetch('/api/cart/emptyCart', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
         }).then(status)
          .then(() => {
              updateCart(setCartMovies, setErrorMessage).then();
          })
          .catch((err) => {
              setErrorMessage(`Failed to empty cart - ${err.message}`);
          }).finally(() => {setIsLoading(false);});
    }

    const cartMoviesCards = cartMovies.map((movieData, i) => {
        return <CartMovieCard key={i} movieData={movieData} deleteMovie={deleteMovie}/>;
    });

    return (
        <>
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-8">
                        <h1 className="my-4">Shopping Cart</h1>
                        {isLoading && <Spinner/>}
                        {errorMessage.length !== 0 && <ErrorAlert errorMessage={errorMessage}/>}
                        {cartMovies.length > 0 ?
                            <>
                                <a onClick={emptyCart} className="text-danger fs-5 d-block mb-4 me-4 text-end">
                                    delete all
                                </a>
                                {cartMoviesCards}
                                <div className="d-flex justify-content-end mb-2">
                                    <h4 className="text-success me-3">
                                        total price: {totalPrice}$
                                    </h4>
                                </div>
                                <div className="d-flex justify-content-end mb-5">
                                    <Link to="/checkout" className="btn btn-lg btn-primary">
                                        Checkout
                                    </Link>
                                </div>
                            </>
                            :
                            errorMessage.length === 0 &&
                                <div className="alert alert-warning fs-4 p-5" role="alert">
                                    Your cart is empty, please go shop some movies first.
                                </div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}



