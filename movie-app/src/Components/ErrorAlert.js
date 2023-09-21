
export default function ErrorAlert({errorMessage}) {

    return (
        <div className="alert alert-danger mt-4 fs-5" role="alert">
            <p>{errorMessage}</p>
        </div>
    );
}