package reseauinitiativedeuxsevres.ttm.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@MappedSuperclass
@Data
@NoArgsConstructor
@AllArgsConstructor
public abstract class Acteur extends Utilisateur{


    private Boolean actif = false;

    private String disponibilites; //TODO Voir principe

    private String contactPrefere; //TODO Voir principe

    private String description;




}
