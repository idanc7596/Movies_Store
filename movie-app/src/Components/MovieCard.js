import {status, updateCart} from "../Utils";
import {useState} from "react";
import ErrorAlert from "./ErrorAlert";
import Spinner from "./Spinner";

// the component that displays a movie card
export default function MovieCard({data, setCartMovies}) {
    const BASE_URL = "https://image.tmdb.org/t/p/w300_and_h450_bestv2";
    const imgSrc =  data.poster_path ? (BASE_URL + data.poster_path) : "/popcorn.jpg";
    const [errorMessage, setErrorMessage] = useState("");
    
    // make an API call to add the movie to the session cart
    function addToCart() {
        fetch("/api/addToCart", {
           method: "POST",
              headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: data.id,
                    image: imgSrc,
                    title: data.title,
                    releaseDate: data.release_date,
                    price: data.price
                })

        }).then(status)
          .then(() => {
              updateCart(setCartMovies, setErrorMessage).then();
          })
          .catch((err) => {
              setErrorMessage(`${err.code} - ${err.message}`);
          });
    }

    return (
        <div className="col-md-6 col-lg-4 p-2 d-flex align-items-stretch">
            <div className="card p-3">
                <img src={imgSrc} className="card-img-top" alt=""/>
                    <div className="card-body">
                        <h4 className="card-title">{data.title}</h4>
                        <h6>{data.release_date}&nbsp;&nbsp;{data.original_language}</h6>
                        <p className="card-text">
                            {data.overview.substring(0,120)}
                            <a data-bs-toggle="modal" data-bs-target={"#readMoreModal" + data.id}>
                                &nbsp;<span className="text-primary">read more...</span>
                            </a>
                        </p>
                        <div className="d-flex justify-content-between">
                            <h5 className="text-success">{data.price}$</h5>
                            <button onClick={addToCart} type="submit"
                                    className="btn btn-outline-primary btn-sm">add to cart</button>
                        </div>
                        {errorMessage.length !== 0 && <ErrorAlert errorMessage={errorMessage}/>}
                    </div>
            </div>
            <div className="modal fade" id={"readMoreModal" + data.id} aria-labelledby="readMoreModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="readMoreModalLabel">{data.title} - Overview</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {data.overview}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}