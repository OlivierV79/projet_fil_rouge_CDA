package reseauinitiativedeuxsevres.ttm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import reseauinitiativedeuxsevres.ttm.model.Membre;

public interface MembreRepository extends JpaRepository<Membre, Long> {
}
