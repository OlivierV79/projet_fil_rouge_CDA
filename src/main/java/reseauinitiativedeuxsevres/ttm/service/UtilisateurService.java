package reseauinitiativedeuxsevres.ttm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reseauinitiativedeuxsevres.ttm.model.*;

import reseauinitiativedeuxsevres.ttm.model.DTO.UtilisateurDTO;
import reseauinitiativedeuxsevres.ttm.repository.*;

import java.util.List;
import java.util.Optional;

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

        Role role = roleRepository.findById(utilisateurDTO.getRole().getId())
                .orElseThrow(() -> new RuntimeException("Role non trouvé"));

        Utilisateur utilisateur = switch (role.getNom()) {
            case "Administrateur général", "Administrateur départemental" ->
                    adminRepository.findById(utilisateurDTO.getId())
                            .orElseThrow(() -> new IllegalArgumentException("Utilisateur non trouvé"));
            case "Porteur", "Parrain" -> membreRepository.findById(utilisateurDTO.getId())
                    .orElseThrow(() -> new IllegalArgumentException("Utilisateur non trouvé"));
            default -> throw new IllegalArgumentException("Type d'utilisateur non supporté");
        };

        utilisateur.setNomUtilisateur(utilisateurDTO.getNomUtilisateur());
        utilisateur.setMail(utilisateurDTO.getMail());
        utilisateur.setPassword(utilisateurDTO.getPassword());
        utilisateur.setNom(utilisateurDTO.getNom());
        utilisateur.setPrenom(utilisateurDTO.getPrenom());
        utilisateur.setEntreprise(utilisateurDTO.getEntreprise());
        utilisateur.setPlateformeInitiative(utilisateurDTO.getPlateformeInitiative().toPlateformeInitiative());
        utilisateur.setRole(role);
        utilisateur.setId(utilisateur.getId());

        if (utilisateur instanceof Admin) {
            return adminRepository.save((Admin) utilisateur);

        } else if (utilisateur instanceof Membre) {
            ((Membre) utilisateur).setDescription(utilisateurDTO.getDescription());

            return membreRepository.save((Membre) utilisateur);

        } else {
            throw new IllegalArgumentException("Type d'utilisateur non supporté");
        }
    }

    public List<Membre> findAllMembre() {
        return membreRepository.findAll();
    }
}
