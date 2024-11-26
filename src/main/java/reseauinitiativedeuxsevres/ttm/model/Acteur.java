package reseauinitiativedeuxsevres.ttm.model;

import jakarta.persistence.Entity;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.OneToMany;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.util.List;

@MappedSuperclass
@NoArgsConstructor
public abstract class Acteur extends Utilisateur{

    private Boolean actif;

    private String disponibilites;

    private String contactPrefere; //TODO REVOIR POUR LIST

    @OneToMany
    private List<Accompagnement> accompagnements;


    private String description;

    @OneToMany
    private List<DomaineActivite> domainesActivite;

    @OneToMany
    private List<Lieu> lieux;
}
