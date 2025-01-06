package reseauinitiativedeuxsevres.ttm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import reseauinitiativedeuxsevres.ttm.model.Porteur;
import reseauinitiativedeuxsevres.ttm.model.Utilisateur;

public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
}


