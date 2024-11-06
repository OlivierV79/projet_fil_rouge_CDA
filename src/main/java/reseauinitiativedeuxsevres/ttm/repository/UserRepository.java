package reseauinitiativedeuxsevres.ttm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import reseauinitiativedeuxsevres.ttm.model.AdminDepartemental;

import java.util.Optional;

public interface UserRepository extends JpaRepository<AdminDepartemental, Long> {
    Optional<AdminDepartemental> rechercherAdminDepartemental(String resquest);
}
