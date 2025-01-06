package reseauinitiativedeuxsevres.ttm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import reseauinitiativedeuxsevres.ttm.model.Admin;
import reseauinitiativedeuxsevres.ttm.model.AdminGeneral;

public interface AdminRepository extends JpaRepository<Admin, Long> {
}
