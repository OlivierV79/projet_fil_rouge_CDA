package reseauinitiativedeuxsevres.ttm.model;

import jakarta.persistence.Entity;
import jakarta.persistence.PrePersist;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Builder
public class AdminDepartemental extends Utilisateur {


}
