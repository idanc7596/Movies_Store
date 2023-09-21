import {Link, Outlet} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {Context} from "../App";
import {updateCart} from "../Utils";

export default function Menu() {

    const cartMovies = useContext(Context).cartMovies;
    const setCartMovies = useContext(Context).setCartMovies;

    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        updateCart(setCartMovies, setErrorMessage);
        setInterval(() => {
            updateCart(setCartMovies, setErrorMessage);
        }, 5000);
    }, []);

    return (
        <>
            <nav className="navbar navbar-expand-sm bg-light sticky-top fs-4">
                <div className="container-fluid ms-4">
                    <Link to="/" className="navbar-brand">
                        Movies Store
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className="nav-link" to="/">Search</Link>
                            <Link className="nav-link" to="/discover">Discover</Link>
                        </div>
                        <div className="navbar-nav ms-auto me-3">
                            <Link className="nav-link" to="/cart">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                                     className="bi bi-cart3" viewBox="0 0 16 16">
                                    <path
                                        d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                </svg>
                                <span className="position-absolute translate-middle badge badge-lg rounded-pill bg-danger fs-6">
                                    {cartMovies.length}
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    );
}
