package reseauinitiativedeuxsevres.ttm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import reseauinitiativedeuxsevres.ttm.model.AdminGeneral;
import reseauinitiativedeuxsevres.ttm.model.Parrain;

public interface ParrainRepository extends JpaRepository<Parrain, Long> {
}
