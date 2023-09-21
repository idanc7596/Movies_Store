package hac;

import jakarta.annotation.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

/**
 * Controller class - handles the requests regarding the session cart
 */
@RestController
@RequestMapping("/api")
public class Controller {

    /**
     * sessionCart - the cart stored in the session (per user)
     */
    @Resource(name = "sessionCart")
    private Cart sessionCart;

    /**
     * addToCart - add a movie to the cart
     * @param movie - movie to add
     * @return - success or failure
     */
    @PostMapping("/addToCart")
    public ResponseEntity<String> addToCart(@RequestBody Movie movie) {
        if(sessionCart.addMovie(movie)) {
            return ResponseEntity.ok().body("success");
        }
        return ResponseEntity.badRequest().body("The movie is already in the cart!");
    }

    /**
     * getCart - get the cart content
     * @return - the cart movies list
     */
    @GetMapping("/cart")
    public ArrayList<Movie> getCart() {
        return sessionCart.getMovies();
    }

    /**
     * deleteMovie - delete a movie from the cart
     * @param id - movie id
     * @return - success or failure
     */
    @DeleteMapping("/cart/deleteMovie/{id}")
    public ResponseEntity<HttpStatus> deleteMovie(@PathVariable int id) {
        if(sessionCart.deleteMovie(id)) {
            return ResponseEntity.ok(HttpStatus.OK);
        }
        return ResponseEntity.badRequest().build();
    }

    /**
     * emptyCart - empty the cart
     * @return - success or failure
     */
    @DeleteMapping("/cart/emptyCart")
    public ResponseEntity<HttpStatus> emptyCart() {
        sessionCart.emptyCart();
        return ResponseEntity.ok(HttpStatus.OK);
    }
}
