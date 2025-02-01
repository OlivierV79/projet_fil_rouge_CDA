package reseauinitiativedeuxsevres.ttm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reseauinitiativedeuxsevres.ttm.model.*;
import reseauinitiativedeuxsevres.ttm.model.DTO.AccompagnementDTO;
import reseauinitiativedeuxsevres.ttm.model.DTO.DomaineActiviteDTO;
import reseauinitiativedeuxsevres.ttm.model.DTO.LieuDTO;
import reseauinitiativedeuxsevres.ttm.model.DTO.UtilisateurDTO;
import reseauinitiativedeuxsevres.ttm.repository.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UtilisateurService {

    private final PlateformeInitiativeRepository plateformeInitiativeRepository;
    private final RoleRepository roleRepository;
    private final AdminRepository adminRepository;
    private final MembreRepository membreRepository;

    @Autowired
    public UtilisateurService(PlateformeInitiativeRepository plateformeInitiativeRepository,
                              RoleRepository roleRepository,
                              AdminRepository adminRepository,
                              MembreRepository membreRepository) {
        this.plateformeInitiativeRepository = plateformeInitiativeRepository;
        this.roleRepository = roleRepository;
        this.adminRepository = adminRepository;
        this.membreRepository = membreRepository;
    }

    public Utilisateur creationUtilisateur(UtilisateurDTO utilisateurDTO) {

        Utilisateur utilisateur;

        PlateformeInitiative plateformeInitiative = plateformeInitiativeRepository.findById(utilisateurDTO.getPlateformeInitiative().getId())
                .orElseThrow(() -> new IllegalArgumentException("Plateforme non trouvée"));

        Role role = roleRepository.findById(utilisateurDTO.getRole().getId())
                .orElseThrow(() -> new RuntimeException("Role non trouvé"));

        utilisateur = switch (role.getNom()) {
            case "Administrateur général", "Administrateur départemental" -> new Admin();
            case "Porteur", "Parrain" -> new Membre();
            default -> throw new IllegalArgumentException("Type d'utilisateur non supporté");
        };

        utilisateur.setNomUtilisateur(utilisateurDTO.getNomUtilisateur());
        utilisateur.setMail(utilisateurDTO.getMail());
        utilisateur.setPassword(utilisateurDTO.getPassword());
        utilisateur.setNom(utilisateurDTO.getNom());
        utilisateur.setPrenom(utilisateurDTO.getPrenom());
        utilisateur.setEntreprise(utilisateurDTO.getEntreprise());
        utilisateur.setPlateformeInitiative(plateformeInitiative);
        utilisateur.setRole(role);

        if (utilisateur instanceof Admin) {
            return adminRepository.save((Admin) utilisateur);
        } else {
            return membreRepository.save((Membre) utilisateur);
        }
    }

    public Optional<? extends Utilisateur> findUtilisateurByIdAndRole(Long id, Long roleId) {
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new IllegalArgumentException("Rôle non trouvé"));

        switch (role.getNom()) {
            case "Administrateur général", "Administrateur départemental":
                return adminRepository.findById(id);
            case "Porteur", "Parrain":
                return membreRepository.findById(id);
            default:
                throw new IllegalArgumentException("Type d'utilisateur non supporté");
        }
    }


    public Utilisateur modifierUtilisateur(UtilisateurDTO utilisateurDTO) {

//        PlateformeInitiative plateformeInitiative = plateformeInitiativeRepository.findById(utilisateurDTO.getPlateformeInitiative().getId())
//                .orElseThrow(() -> new IllegalArgumentException("Plateforme non trouvée"));

        Role role = roleRepository.findById(utilisateurDTO.getRole().getId())
                .orElseThrow(() -> new RuntimeException("Role non trouvé"));

        Utilisateur utilisateur;

        switch (role.getNom()) {
            case "Administrateur général", "Administrateur départemental":
                utilisateur = adminRepository.findById(utilisateurDTO.getId())
                        .orElseThrow(() -> new IllegalArgumentException("Utilisateur non trouvé"));
                break;
            case "Porteur", "Parrain":
                utilisateur = membreRepository.findById(utilisateurDTO.getId())
                        .orElseThrow(() -> new IllegalArgumentException("Utilisateur non trouvé"));
                break;
            default:
                throw new IllegalArgumentException("Type d'utilisateur non supporté");
        }

        utilisateur.setNomUtilisateur(utilisateurDTO.getNomUtilisateur());
        utilisateur.setMail(utilisateurDTO.getMail());
        utilisateur.setPassword(utilisateurDTO.getPassword());
        utilisateur.setNom(utilisateurDTO.getNom());
        utilisateur.setPrenom(utilisateurDTO.getPrenom());
        utilisateur.setEntreprise(utilisateurDTO.getEntreprise());
        //utilisateur.setPlateformeInitiative(plateformeInitiative);
        utilisateur.setPlateformeInitiative(utilisateurDTO.getPlateformeInitiative().toPlateformeInitiative());
        utilisateur.setRole(role);
        utilisateur.setId(utilisateur.getId());


        if (utilisateur instanceof Admin) {
            return adminRepository.save((Admin) utilisateur);

        } else if (utilisateur instanceof Membre) {
            ((Membre) utilisateur).setDescription(utilisateurDTO.getDescription());

//            List<Lieu> lieux = utilisateurDTO.getLieux().stream()
//                    .map(LieuDTO::toLieu)
//                    .collect(Collectors.toList());
//            ((Membre) utilisateur).setLieux(lieux);
//
//            List<Accompagnement> accompagnements = utilisateurDTO.getAccompagnements().stream()
//                    .map(AccompagnementDTO::toAccompagnement)
//                    .collect(Collectors.toList());
//            ((Membre) utilisateur).setAccompagnements(accompagnements);
//
//            List<DomaineActivite> domaineActivites = utilisateurDTO.getDomaineActivites().stream()
//                    .map(DomaineActiviteDTO::toDomaineActivite)
//                    .collect(Collectors.toList());
//            ((Membre) utilisateur).setDomaine_activites(domaineActivites);

            return membreRepository.save((Membre) utilisateur);

        } else {
            throw new IllegalArgumentException("Type d'utilisateur non supporté");
        }
    }
}
