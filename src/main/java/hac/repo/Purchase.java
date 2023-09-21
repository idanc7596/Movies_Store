package hac.repo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.PositiveOrZero;
import java.io.Serializable;

/**
 * a purchase is a record of a user buying a product. You should not need to edit this file
 * but if you feel like you need to, please get in touch with the teacher.
 */
@Entity
public class Purchase implements Serializable {
    /**
     * id - purchase id
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * firstName - first name of the user
     */
    @NotEmpty(message = "First name is mandatory")
    private String firstName;

    /**
     * lastName - last name of the user
     */
    @NotEmpty(message = "Last name is mandatory")
    private String lastName;

    /**
     * email - email of the user
     */
    @NotEmpty(message = "Email is mandatory")
    @Email(message = "Email should be valid")
    private String email;

    /**
     * payment - payment of the user
     */
    @PositiveOrZero(message = "Payment must be positive or zero")
    private Double payment = 0.0;

    /**
     * Purchase ctor - with parameters
     * @param email - email of the user
     * @param total - payment of the user
     * @param firstName - first name of the user
     * @param lastName - last name of the user
     */
    public Purchase(String email, Double total, String firstName, String lastName) {
        this.email = email;
        this.payment = total;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    /**
     * Purchase ctor - default
     */
    public Purchase() {

    }

    // getters and setters

    /**
     * getId - get purchase id
     * @return purchase id
     */
    public Long getId() {
        return id;
    }

    /**
     * getFirstName - get first name of the user
     * @return first name of the user
     */
    public String getFirstName() {
        return firstName;
    }

    /**
     * getLastName - get last name of the user
     * @return last name of the user
     */
    public String getLastName() {
        return lastName;
    }

    /**
     * getPayment - get payment of the user
     * @return payment of the user
     */
    public Double getPayment() {
        return payment;
    }

    /**
     * getEmail - get email of the user
     * @return email of the user
     */
    public String getEmail() {
        return email;
    }

    /**
     * setId - set purchase id
     * @param id - purchase id
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * setFirstName - set first name of the user
     * @param firstName - first name of the user
     */
    public void setFirstName(String firstName) {
        this.firstName=firstName;
    }

    /**
     * setLastName - set last name of the user
     * @param lastName - last name of the user
     */
    public void setLastName(String lastName) {
        this.lastName=lastName;
    }

    /**
     * setPayment - set payment of the user
     * @param payment - payment of the user
     */
    public void setPayment(Double payment) {
        this.payment=payment;
    }

    /**
     * setEmail - set email of the user
     * @param email - email of the user
     */
    public void setEmail(String email) {
        this.email=email;
    }

}


