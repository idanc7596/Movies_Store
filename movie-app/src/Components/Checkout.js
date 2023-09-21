import {useContext, useEffect, useState} from "react";
import ErrorAlert from "./ErrorAlert";
import {updateCart, status} from "../Utils";
import {Context} from "../App";
import Spinner from "./Spinner";

// the component that displays the checkout form page
export default function Checkout() {
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


    // handle the checkout form submission
    function handleCheckout(ev) {
        ev.preventDefault();

        const formData = new FormData(ev.target);

        const email = formData.get("email");
        const firstName = formData.get("firstName");
        const lastName = formData.get("lastName");

        setIsLoading(true);
        fetch("/debug/purchases", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                payment: totalPrice,
                firstName: firstName,
                lastName: lastName,
            })

        }).then(status)
          .then(() => {deleteCart();})
          .catch((err) => {
              setErrorMessage(`${err.code} - ${err.message}`);
          }).finally(() => {setIsLoading(false);});
    }

    // make an API call to empty the cart and redirect to the home page
    function deleteCart() {
        fetch('/api/cart/emptyCart', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(status)
          .then(() => {
              updateCart(setCartMovies, setErrorMessage).then();
              window.location.href = "/";
          })
          .catch((err) => {
              setErrorMessage(`${err.code} - ${err.message}`);
          });
    }

    return (
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-md-8">
                    <h1 className="my-4">Checkout</h1>
                    { cartMovies.length === 0 ?
                        <div className="alert alert-warning fs-4 p-5" role="alert">
                            Your cart is empty, please go shop some movies first.
                        </div>
                        :
                        <form onSubmit={handleCheckout}>
                            <div className="mb-3">
                                <label htmlFor="firstName" className="form-label">First Name:</label>
                                <input required name="firstName" type="text" className="form-control form-control-lg" id="firstName"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="lastName" className="form-label">Last Name:</label>
                                <input required name="lastName" type="text" className="form-control form-control-lg" id="lastName"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email:</label>
                                <input required name="email" type="email" className="form-control form-control-lg" id="email"/>
                            </div>
                            <button type="submit" className="btn btn-lg btn-primary">Submit</button>
                        </form>
                    }
                    {isLoading && <Spinner/>}
                    {errorMessage.length !== 0 && <ErrorAlert errorMessage={errorMessage}/>}
                </div>
            </div>
        </div>
    );
}