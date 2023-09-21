package hac.repo;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * PurchaseRepository interface - create a repository for purchases.
 */
public interface PurchaseRepository extends JpaRepository<Purchase, Long> {
}
