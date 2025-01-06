package reseauinitiativedeuxsevres.ttm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reseauinitiativedeuxsevres.ttm.model.DomaineActivite;
import reseauinitiativedeuxsevres.ttm.service.DomaineActiviteService;

import java.util.List;

@RestController
@RequestMapping("/api/DomaineActivite/")
public class DomaineActiviteController {



    @Autowired
    private DomaineActiviteService domaineActiviteService;

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/domaineActivites")
    public ResponseEntity<List<DomaineActivite>> getAllDomaineActivite() {
        List<DomaineActivite> domaineActivites = domaineActiviteService.findAll();
        return ResponseEntity.ok(domaineActivites);

    }
}
