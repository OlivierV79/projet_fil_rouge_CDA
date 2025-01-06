package reseauinitiativedeuxsevres.ttm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reseauinitiativedeuxsevres.ttm.model.Accompagnement;
import reseauinitiativedeuxsevres.ttm.service.AccompagnementService;

import java.util.List;

@RestController
@RequestMapping("/api/Accompagnement/")
public class AccompagnementController {



    @Autowired
    private AccompagnementService accompagnementService;

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/accompagnements")
    public ResponseEntity<List<Accompagnement>> getAllAccompagnements() {
        List<Accompagnement> accompagnements = accompagnementService.findAll();
        return ResponseEntity.ok(accompagnements);

    }
}
