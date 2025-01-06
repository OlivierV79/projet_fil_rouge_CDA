package reseauinitiativedeuxsevres.ttm.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Lieu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String departement;
    private String nom;

    @JsonBackReference
    @ManyToMany(mappedBy = "lieux")
    private List<Porteur> porteurs;

    @JsonBackReference
    @ManyToMany(mappedBy = "lieux")
    private List<Parrain> parrains;
}
