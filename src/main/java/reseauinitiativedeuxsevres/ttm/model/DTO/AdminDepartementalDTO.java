package reseauinitiativedeuxsevres.ttm.model.DTO;

import lombok.Data;
import reseauinitiativedeuxsevres.ttm.model.PlateformeInitiative;

@Data
public class AdminDepartementalDTO {

    private String nomUtilisateur;
    private String mail;
    private String password;
    private String nom;
    private String prenom;
    private String entreprise;
    private Long plateformeInitiativeId;

}
