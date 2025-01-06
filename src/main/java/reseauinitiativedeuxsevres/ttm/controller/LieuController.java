package reseauinitiativedeuxsevres.ttm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reseauinitiativedeuxsevres.ttm.model.Lieu;
import reseauinitiativedeuxsevres.ttm.service.LieuService;

import java.util.List;

@RestController
@RequestMapping("/api/Lieu/")
public class LieuController {



    @Autowired
    private LieuService lieuService;

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/lieux")
    public ResponseEntity<List<Lieu>> getAllLieux() {
        List<Lieu> Lieux = lieuService.findAll();
        return ResponseEntity.ok(Lieux);

    }
}
