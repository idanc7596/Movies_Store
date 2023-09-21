package hac;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.annotation.SessionScope;

/**
 * BeanConfiguration class - configure the beans
 */
@Configuration
public class BeanConfiguration {

    /**
     * sessionCart - the cart stored in the session (per user)
     * @return - the cart
     */
    @Bean
    @SessionScope
    public Cart sessionCart() {
        return new Cart();
    }
}


