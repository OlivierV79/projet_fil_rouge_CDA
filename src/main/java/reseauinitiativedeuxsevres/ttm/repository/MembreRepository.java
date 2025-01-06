package reseauinitiativedeuxsevres.ttm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import reseauinitiativedeuxsevres.ttm.model.Membre;
import reseauinitiativedeuxsevres.ttm.model.Porteur;

public interface MembreRepository extends JpaRepository<Membre, Long> {
}
