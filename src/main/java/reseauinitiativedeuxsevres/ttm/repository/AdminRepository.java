package reseauinitiativedeuxsevres.ttm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import reseauinitiativedeuxsevres.ttm.entity.Admin;

import java.util.Optional;

// On crée un Repository pour Admin
public interface AdminRepository extends JpaRepository<Admin, Long> {
    Optional<Admin> findByUsername(String username);
}


