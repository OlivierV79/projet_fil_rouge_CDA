package reseauinitiativedeuxsevres.ttm.model;

import jakarta.persistence.Entity;
import jakarta.persistence.PrePersist;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Builder
public class AdminGeneral extends Utilisateur {

//    @PrePersist
//    protected void onCreate() {
//        this.setRole(Role.ADMINISTRATEURGENERAL);
//    }

}
