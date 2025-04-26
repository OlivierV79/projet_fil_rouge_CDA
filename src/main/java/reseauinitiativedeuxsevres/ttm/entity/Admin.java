package reseauinitiativedeuxsevres.ttm.entity;

import jakarta.persistence.Entity;
import lombok.*;

@Entity
@Getter
@Setter
public class Admin extends User {

    public Admin() {
        this.setRole(Role.ADMIN);
    }
}
