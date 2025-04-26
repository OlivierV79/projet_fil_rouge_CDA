package reseauinitiativedeuxsevres.ttm.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.*;

@Entity
@Getter
@Setter
public class Member extends User {

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = true)
    private Integer nbrOfFounders;

    @Column(nullable = false)
    private boolean available = true;

}
