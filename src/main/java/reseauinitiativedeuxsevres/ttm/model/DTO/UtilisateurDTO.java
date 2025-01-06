package reseauinitiativedeuxsevres.ttm.model.DTO;

import lombok.Data;


import java.util.List;

@Data
public class UtilisateurDTO {
    private Long id;
    private String nomUtilisateur;
    private String mail;
    private String password;
    private String nom;
    private String prenom;
    private Long role;
    private String entreprise;
    private Long plateformeInitiativeId;

    private String description;

    private List<LieuDTO> lieux;
    private List<AccompagnementDTO> accompagnements;
    private List<DomaineActiviteDTO> domaine_activites;
}
