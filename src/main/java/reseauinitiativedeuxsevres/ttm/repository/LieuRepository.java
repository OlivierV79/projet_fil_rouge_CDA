package reseauinitiativedeuxsevres.ttm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import reseauinitiativedeuxsevres.ttm.model.Lieu;
import reseauinitiativedeuxsevres.ttm.model.PlateformeInitiative;

public interface LieuRepository extends JpaRepository<Lieu, Long> {
}
