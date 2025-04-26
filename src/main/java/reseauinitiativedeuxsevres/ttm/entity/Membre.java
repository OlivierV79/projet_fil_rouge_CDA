package reseauinitiativedeuxsevres.ttm.entity;


import jakarta.persistence.Entity;
import lombok.*;

@Entity
@Getter
@Setter
public class Membre extends User {

    private String firstName;
    private String lastName;
}
