package reseauinitiativedeuxsevres.ttm.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@NoArgsConstructor
//@Builder

public class Porteur extends Acteur{

    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST})
    @JoinTable(
            name = "porteur_lieu",
            joinColumns = @JoinColumn(name = "porteur_id"),
            inverseJoinColumns = @JoinColumn(name = "lieu_id")
    )
    @JsonManagedReference
    private List<Lieu> lieux;


    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST})
    @JoinTable(
            name = "porteur_accompagnement",
            joinColumns = @JoinColumn(name = "porteur_id"),
            inverseJoinColumns = @JoinColumn(name = "accompagnement_id")
    )
    @JsonManagedReference
    private List<Accompagnement> accompagnements;

    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST})
    @JoinTable(
            name = "porteur_domaine_activite",
            joinColumns = @JoinColumn(name = "porteur_id"),
            inverseJoinColumns = @JoinColumn(name = "domaine_activite_id")
    )
    @JsonManagedReference
    private List<DomaineActivite> domaine_activites;

    public List<DomaineActivite> getDomaine_activites() {
        return domaine_activites;
    }

    public void setDomaine_activites(List<DomaineActivite> domaine_activites) {
        this.domaine_activites = domaine_activites;
    }

    public List<Lieu> getLieux() {
        return lieux;
    }

    public void setLieux(List<Lieu> lieux) {
        this.lieux = lieux;
    }

    public List<Accompagnement> getAccompagnements() {
        return accompagnements;
    }

    public void setAccompagnements(List<Accompagnement> accompagnements) {
        this.accompagnements = accompagnements;
    }
}
