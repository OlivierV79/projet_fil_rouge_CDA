package reseauinitiativedeuxsevres.ttm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import reseauinitiativedeuxsevres.ttm.model.AdminDepartemental;

public interface UserRepository extends JpaRepository<AdminDepartemental, Long> {
    Object rechercherAdminDepartemental(String resquest);
}
