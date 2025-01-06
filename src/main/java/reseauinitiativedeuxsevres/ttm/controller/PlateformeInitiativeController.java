package reseauinitiativedeuxsevres.ttm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reseauinitiativedeuxsevres.ttm.model.PlateformeInitiative;
import reseauinitiativedeuxsevres.ttm.repository.PlateformeInitiativeRepository;
import reseauinitiativedeuxsevres.ttm.service.PlateformeInitiativeService;

import java.util.List;

@RestController
@RequestMapping("/api/PlateformeInitiative/")
public class PlateformeInitiativeController {


    @Autowired
    private PlateformeInitiativeRepository plateformeInitiativeRepository;

    @Autowired
    private PlateformeInitiativeService plateformeInitiativeService;

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/plateformes")
    public ResponseEntity<List<PlateformeInitiative>> getAllPlateformes() {
        List<PlateformeInitiative> plateformes = plateformeInitiativeService.findAll();
        return ResponseEntity.ok(plateformes);

    }
}
