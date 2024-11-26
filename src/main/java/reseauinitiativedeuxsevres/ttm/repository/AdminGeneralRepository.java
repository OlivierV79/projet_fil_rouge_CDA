package reseauinitiativedeuxsevres.ttm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import reseauinitiativedeuxsevres.ttm.model.AdminDepartemental;

public interface AdminGeneralRepository extends JpaRepository<AdminDepartemental, Long> {
}
