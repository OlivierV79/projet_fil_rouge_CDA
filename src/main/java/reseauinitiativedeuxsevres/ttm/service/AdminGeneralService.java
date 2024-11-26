package reseauinitiativedeuxsevres.ttm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reseauinitiativedeuxsevres.ttm.model.AdminDepartemental;
import reseauinitiativedeuxsevres.ttm.model.DTO.AdminDepartementalDTO;
import reseauinitiativedeuxsevres.ttm.model.PlateformeInitiative;
import reseauinitiativedeuxsevres.ttm.model.Role;
import reseauinitiativedeuxsevres.ttm.repository.AdminGeneralRepository;
import reseauinitiativedeuxsevres.ttm.repository.PlateformeInitiativeRepository;
import reseauinitiativedeuxsevres.ttm.repository.RoleRepository;

import java.time.LocalDateTime;

@Service
public class AdminGeneralService {

    @Autowired
    private AdminGeneralRepository adminGeneralRepository;
    @Autowired
    private PlateformeInitiativeRepository plateformeInitiativeRepository;

    @Autowired
    private RoleRepository roleRepository;

    public AdminDepartemental creationAdminDepartemental(AdminDepartementalDTO adminDepartementalDTO) {

        AdminDepartemental adminDepartemental = new AdminDepartemental();

        adminDepartemental.setNomUtilisateur(adminDepartementalDTO.getNomUtilisateur());
        adminDepartemental.setMail(adminDepartementalDTO.getMail());
        adminDepartemental.setNom(adminDepartementalDTO.getNom());
        adminDepartemental.setPassword(adminDepartementalDTO.getPassword());
        adminDepartemental.setPrenom(adminDepartementalDTO.getPrenom());
        adminDepartemental.setEntreprise(adminDepartementalDTO.getEntreprise());

        PlateformeInitiative plateforme = plateformeInitiativeRepository.findById(adminDepartementalDTO.getPlateformeInitiativeId())
                .orElseThrow(() -> new RuntimeException("PlateformeInitiative non trouvée avec l'ID: " + adminDepartementalDTO.getPlateformeInitiativeId()));
        adminDepartemental.setPlateformeInitiative(plateforme);

        Role role = roleRepository.findById(2L)
                .orElseThrow(() -> new RuntimeException("Role non trouvé avec l'ID: 2"));
        adminDepartemental.setRole(role);

        adminDepartemental.setDateCreationCompte(LocalDateTime.now());

        return adminGeneralRepository.save(adminDepartemental);

    }
}
