package reseauinitiativedeuxsevres.ttm.model.DTO;

import lombok.Data;
import reseauinitiativedeuxsevres.ttm.model.PlateformeInitiative;


import java.util.List;

@Data
public class UtilisateurDTO {
    private Long id;
    private String nomUtilisateur;
    private String mail;
    private String password;
    private String nom;
    private String prenom;
    private RoleDTO role;
    private String entreprise;
    private PlateformeInitiativeDTO plateformeInitiative;

    private String description;

//    private List<LieuDTO> lieux;
//    private List<AccompagnementDTO> accompagnements;
//    private List<DomaineActiviteDTO> domaineActivites;
}
