package hac;

import org.springframework.stereotype.Component;
import java.io.Serializable;
import java.util.ArrayList;

/**
 * Cart class - represents a cart
 */
@Component
public class Cart implements Serializable {
    /**
     * movies - movies list of the cart
     */
    private ArrayList<Movie> movies;

    /**
     * Cart ctor - set an empty list of movies
     */
    public Cart() {
        movies = new ArrayList<>();
    }

    /**
     * getMovies - get the movies list
     * @return - the movies list
     */
    public ArrayList<Movie> getMovies() {
        return movies;
    }

    /**
     * setMovies - set the movies list
     * @param movies - the movies list
     */
    public void setMovies(ArrayList<Movie> movies) {
        this.movies = movies;
    }

    /**
     * alreadyExist - check if a movie already exist in the cart
     * @param newMovie - the movie to check
     * @return - true if the movie already exist, false otherwise
     */
    private boolean alreadyExist(Movie newMovie) {
        for(Movie m : movies) {
            if(m.getId() == newMovie.getId()) {
                return true;
            }
        }
        return false;
    }

    /**
     * addMovie - add a movie to the cart
     * @param movie - the movie to add
     * @return - true if the movie was added, false otherwise
     */
    public boolean addMovie(Movie movie) {
        if(!alreadyExist(movie)) {
            this.movies.add(movie);
            return true;
        }
        return false;
    }

    /**
     * deleteMovie - delete a movie from the cart
     * @param id - the movie id
     * @return - true if the movie was deleted, false otherwise
     */
    public boolean deleteMovie(int id) {
        for(Movie m : movies) {
            if(m.getId() == id) {
                movies.remove(m);
                return true;
            }
        }
        return false;
    }

    /**
     * emptyCart - empty the cart
     */
    public void emptyCart() {
        movies.clear();
    }

}