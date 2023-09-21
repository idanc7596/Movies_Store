
// displays the movie card in the cart page
export default function CartMovieCard({movieData, deleteMovie}) {

    return (
        <div className="card mb-3">
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <div className="d-flex flex-row align-items-center">
                        <div>
                            <img src={movieData.image}
                                 className="img-fluid rounded-3" alt="movie" style={{width: 75 + 'px'}}/>
                        </div>
                        <div className="ms-3">
                            <h5>{movieData.title}</h5>
                            <p className="small mb-0">{movieData.releaseDate}</p>
                        </div>
                    </div>
                    <div className="d-flex flex-row align-items-center ms-3">
                        <div style={{width: 80 + 'px'}}>
                            <h5 className="mb-0 text-success">{movieData.price}$</h5>
                        </div>
                        <a id={movieData.id} onClick={deleteMovie} className="text-danger me-3">
                            delete
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
