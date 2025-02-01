package reseauinitiativedeuxsevres.ttm.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class DomaineActivite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;



    @JsonBackReference
    @ManyToMany(mappedBy = "domaine_activites")
    private List<Membre> membres;
}
