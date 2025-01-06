package reseauinitiativedeuxsevres.ttm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import reseauinitiativedeuxsevres.ttm.model.Accompagnement;
import reseauinitiativedeuxsevres.ttm.model.PlateformeInitiative;

public interface AccompagnementRepository extends JpaRepository<Accompagnement, Long> {
}
