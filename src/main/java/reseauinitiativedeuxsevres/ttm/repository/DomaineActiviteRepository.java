package reseauinitiativedeuxsevres.ttm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import reseauinitiativedeuxsevres.ttm.model.Accompagnement;
import reseauinitiativedeuxsevres.ttm.model.DomaineActivite;

public interface DomaineActiviteRepository extends JpaRepository<DomaineActivite, Long> {
}
