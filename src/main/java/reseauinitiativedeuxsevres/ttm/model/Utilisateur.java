package reseauinitiativedeuxsevres.ttm.model;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@MappedSuperclass
@Data
@NoArgsConstructor
@AllArgsConstructor
//TODO pour spring security > faire Utilisateur extends userDetails
public abstract class Utilisateur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NonNull
    @Column(unique = true, nullable = false)
    private String nomUtilisateur;

    @NonNull
    @Column(nullable = false)
    private String mail;

    private String password;

    @NonNull
    @Column(nullable = false)
    private String nom;

    @NonNull
    @Column(nullable = false)
    private String prenom;

    @NonNull
    @ManyToOne
    @JoinColumn (nullable = false)
    private Role role;

    @NonNull
    @Column(nullable = false)
    private String entreprise;

    @NonNull
    @ManyToOne
    @JoinColumn (nullable = false)
    private PlateformeInitiative plateformeInitiative;

    private LocalDateTime dateCreationCompte;
}
