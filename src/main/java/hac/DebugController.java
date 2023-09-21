package hac;

import hac.repo.Purchase;
import hac.repo.PurchaseRepository;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * This code is for debugging purposes only.
 * You can check the DB contents by visiting http://localhost:8080/debug/purchases
 * You may add new routes to this controller if you want to test your code.
 * This class will not be graded (ignored by the grader).
 */
@RestController
@RequestMapping("/debug")
public class DebugController {
    /**
     * repository - JPA repository for purchases
     */
    @Autowired
    private PurchaseRepository repository;  // this is the JPA repository (SQL database)

    /**
     * showPurchases - show all purchases
     * @return - list of purchases
     */
    @GetMapping("/purchases")
    public List<Purchase> showPurchases() {
        return repository.findAll(); // this is a JPA method to get all the purchases
    }

    /**
     * addPurchase - add a purchase
     * @param purchase - purchase to add
     * @return - the added purchase
     */
    @PostMapping("/purchases")
    public Purchase addPurchase(@Valid @RequestBody Purchase purchase) {
        return repository.save(purchase); // this is a JPA method to save a purchase to the database
    }

    /**
     * handleValidationExceptions - handle validation exceptions
     * @param ex - exception
     * @return - error message
     */
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({MethodArgumentNotValidException.class, ConstraintViolationException.class})
    public String handleValidationExceptions(MethodArgumentNotValidException ex) {
        List<String> messages = new ArrayList<>();
        for (ObjectError error : ex.getBindingResult().getAllErrors()) {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            messages.add(fieldName + ": " + errorMessage);
        }
        return String.join(" ; ", messages);
    }

}
