package reseauinitiativedeuxsevres.ttm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import reseauinitiativedeuxsevres.ttm.entity.Membre;

import java.util.Optional;

// On crée un Repository pour Membre
public interface MembreRepository extends JpaRepository<Membre, Long> {
    Optional<Membre> findByUsername(String username);
}
