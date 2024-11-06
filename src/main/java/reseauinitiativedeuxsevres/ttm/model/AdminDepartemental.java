package reseauinitiativedeuxsevres.ttm.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AdminDepartemental {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false, unique = true)
    @NonNull
    private String nomUtilisateur;

    @Column(nullable = false, unique = true)
    @NonNull
    private String mail;

    @Column(nullable = false, unique = true)
    @NonNull
    private String entreprise;

    public AdminDepartemental(String nom, String email, String departement) {
        this.nomUtilisateur = nom;
        this.mail = email;
        this.entreprise = departement;
    }


}
