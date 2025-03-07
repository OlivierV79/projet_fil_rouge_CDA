package reseauinitiativedeuxsevres.ttm.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Membre extends Utilisateur{


    private Boolean actif = false;

    private String disponibilites; //TODO Voir principe

    private String contactPrefere; //TODO Voir principe

    @Column(length = 1337)
    private String description;

    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST})
    @JoinTable(
            name = "membre_lieu",
            joinColumns = @JoinColumn(name = "membre_id"),
            inverseJoinColumns = @JoinColumn(name = "lieu_id")
    )
    @JsonManagedReference
    private List<Lieu> lieux;


    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST})
    @JoinTable(
            name = "membre_accompagnement",
            joinColumns = @JoinColumn(name = "membre_id"),
            inverseJoinColumns = @JoinColumn(name = "accompagnement_id")
    )
    @JsonManagedReference
    private List<Accompagnement> accompagnements;

    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST})
    @JoinTable(
            name = "membre_domaine_activite",
            joinColumns = @JoinColumn(name = "membre_id"),
            inverseJoinColumns = @JoinColumn(name = "domaine_activite_id")
    )
    @JsonManagedReference
    private List<DomaineActivite> domaine_activites;




}
