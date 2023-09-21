import {Link} from "react-router-dom";

export default function NotFound() {

    return (
        <div className="container d-flex align-items-center
            justify-content-center vh-100">
            <div className="row text-center">
                <h1 className="col-12 display-1 fw-bold text-danger">404 😵</h1>
                <h2 className="col-12 display-3">Some error occurred!</h2>
                <h3 className="col-12 display-5">Page Not Found!</h3>
                <Link to="/" className="fs-5 mt-3">Return to the search page</Link>
            </div>
        </div>
    );
}