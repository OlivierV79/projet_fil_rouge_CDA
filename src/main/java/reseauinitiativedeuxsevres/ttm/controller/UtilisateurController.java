package reseauinitiativedeuxsevres.ttm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reseauinitiativedeuxsevres.ttm.model.DTO.UtilisateurDTO;
import reseauinitiativedeuxsevres.ttm.model.Membre;
import reseauinitiativedeuxsevres.ttm.model.Utilisateur;
import reseauinitiativedeuxsevres.ttm.service.UtilisateurService;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/Utilisateur/")
public class UtilisateurController {

    @Autowired
    private UtilisateurService utilisateurService;

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/creationUtilisateur")
    public ResponseEntity<Utilisateur> creationUtilisateur(@RequestBody UtilisateurDTO utilisateurDTO) {
        Utilisateur utilisateur = utilisateurService.creationUtilisateur(utilisateurDTO);
        return ResponseEntity.status(HttpStatus.OK).body(utilisateur);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PutMapping("/modifierUtilisateur")
    public ResponseEntity<Utilisateur> modificationUtilisateur(@RequestBody UtilisateurDTO utilisateurDTO){
        System.out.println("Received UtilisateurDTO: " + utilisateurDTO);
        Utilisateur utilisateurApresModif = utilisateurService.modifierUtilisateur(utilisateurDTO);
        return ResponseEntity.ok(utilisateurApresModif);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/{id}/{roleId}")
    public ResponseEntity<? extends Utilisateur> getUtilisateurByIdAndRole(@PathVariable Long id, @PathVariable Long roleId) {
        Optional<? extends Utilisateur> utilisateur = utilisateurService.findUtilisateurByIdAndRole(id, roleId);
        return utilisateur.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/")
    public ResponseEntity<List<Membre>> getAllMembre() {
        List<Membre> membres = utilisateurService.findAllMembre();
        if (membres.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(membres);
        }
    }
}
