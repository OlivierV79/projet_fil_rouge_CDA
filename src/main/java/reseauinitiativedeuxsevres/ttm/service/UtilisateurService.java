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

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private AdminGeneralRepository adminGeneralRepository;

    @Autowired
    private AdminDepartementalRepository adminDepartementalRepository;

    @Autowired
    private PorteurRepository porteurRepository;

    @Autowired
    private ParrainRepository parrainRepository;

    @Autowired
    private PlateformeInitiativeRepository plateformeInitiativeRepository;

    @Autowired
    private RoleRepository roleRepository;

    public Utilisateur creationUtilisateur(UtilisateurDTO utilisateurDTO) {

        Utilisateur utilisateur;

        PlateformeInitiative plateformeInitiative = plateformeInitiativeRepository.findById(utilisateurDTO.getPlateformeInitiativeId())
                .orElseThrow(() -> new IllegalArgumentException("Plateforme non trouvée"));

        Role role = roleRepository.findById(utilisateurDTO.getRole())
                .orElseThrow(() -> new RuntimeException("Role non trouvé"));


        utilisateur = switch (role.getNom()) {
            case "Administrateur général" -> new AdminGeneral();
            case "Administrateur départemental" -> new AdminDepartemental();
            case "Porteur" -> new Porteur();
            case "Parrain" -> new Parrain();
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

        if (utilisateur instanceof AdminGeneral) {
            return adminGeneralRepository.save((AdminGeneral) utilisateur);
        } else if (utilisateur instanceof AdminDepartemental) {
            return adminDepartementalRepository.save((AdminDepartemental) utilisateur);
        } else if (utilisateur instanceof Porteur) {
            return porteurRepository.save((Porteur) utilisateur);
        } else if (utilisateur instanceof Parrain) {
            return parrainRepository.save((Parrain) utilisateur);
        } else {
            throw new IllegalArgumentException("Type d'utilisateur non supporté");
        }
    }

    public Optional<? extends Utilisateur> findUtilisateurByIdAndRole(Long id, Long roleId) {
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new IllegalArgumentException("Rôle non trouvé"));

        switch (role.getNom()) {
            case "Administrateur général":
                return adminGeneralRepository.findById(id);
            case "Administrateur départemental":
                return adminDepartementalRepository.findById(id);
            case "Porteur":
                return porteurRepository.findById(id);
            case "Parrain":
                return parrainRepository.findById(id);
            default:
                throw new IllegalArgumentException("Type d'utilisateur non supporté");
        }
    }



    public Utilisateur modifierUtilisateur(UtilisateurDTO utilisateurDTO) {

        PlateformeInitiative plateformeInitiative = plateformeInitiativeRepository.findById(utilisateurDTO.getPlateformeInitiativeId())
                .orElseThrow(() -> new IllegalArgumentException("Plateforme non trouvée"));

        Role role = roleRepository.findById(utilisateurDTO.getRole())
                .orElseThrow(() -> new RuntimeException("Role non trouvé"));

        Utilisateur utilisateur;

        switch (role.getNom()) {
            case "Administrateur général":
                utilisateur = adminGeneralRepository.findById(utilisateurDTO.getId())
                        .orElseThrow(() -> new IllegalArgumentException("Utilisateur non trouvé"));
                break;
            case "Administrateur départemental":
                utilisateur = adminDepartementalRepository.findById(utilisateurDTO.getId())
                        .orElseThrow(() -> new IllegalArgumentException("Utilisateur non trouvé"));
                break;
            case "Porteur":
                utilisateur = porteurRepository.findById(utilisateurDTO.getId())
                        .orElseThrow(() -> new IllegalArgumentException("Utilisateur non trouvé"));
                break;
            case "Parrain":
                utilisateur = parrainRepository.findById(utilisateurDTO.getId())
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
        utilisateur.setPlateformeInitiative(plateformeInitiative);
        utilisateur.setRole(role);
        utilisateur.setId(utilisateur.getId());


        if (utilisateur instanceof AdminGeneral) {
            return adminGeneralRepository.save((AdminGeneral) utilisateur);
        } else if (utilisateur instanceof AdminDepartemental) {
            return adminDepartementalRepository.save((AdminDepartemental) utilisateur);

        } else if (utilisateur instanceof Porteur) {
            ((Porteur) utilisateur).setDescription(utilisateurDTO.getDescription());

            List<Lieu> lieux = utilisateurDTO.getLieux().stream()
                    .map(LieuDTO::toLieu)
                    .collect(Collectors.toList());
            ((Porteur) utilisateur).setLieux(lieux);

            List<Accompagnement> accompagnements = utilisateurDTO.getAccompagnements().stream()
                    .map(AccompagnementDTO::toAccompagnement)
                    .collect(Collectors.toList());
            ((Porteur) utilisateur).setAccompagnements(accompagnements);

            List<DomaineActivite> domaineActivites = utilisateurDTO.getDomaine_activites().stream()
                    .map(DomaineActiviteDTO::toDomaineActivite)
                    .collect(Collectors.toList());
            ((Porteur) utilisateur).setDomaine_activites(domaineActivites);

            return porteurRepository.save((Porteur) utilisateur);

        } else if (utilisateur instanceof Parrain) {

            ((Parrain) utilisateur).setDescription(utilisateurDTO.getDescription());

            List<Lieu> lieux = utilisateurDTO.getLieux().stream()
                    .map(LieuDTO::toLieu)
                    .collect(Collectors.toList());
            ((Parrain) utilisateur).setLieux(lieux);


                List<Accompagnement> accompagnements = utilisateurDTO.getAccompagnements().stream()
                        .map(AccompagnementDTO::toAccompagnement)
                        .collect(Collectors.toList());
                ((Parrain) utilisateur).setAccompagnements(accompagnements);




                List<DomaineActivite> domaineActivites = utilisateurDTO.getDomaine_activites().stream()
                        .map(DomaineActiviteDTO::toDomaineActivite)
                        .collect(Collectors.toList());
                ((Parrain) utilisateur).setDomaine_activites(domaineActivites);



            return parrainRepository.save((Parrain) utilisateur);
        } else {
            throw new IllegalArgumentException("Type d'utilisateur non supporté");
        }
    }
}
