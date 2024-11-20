package reseauinitiativedeuxsevres.ttm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reseauinitiativedeuxsevres.ttm.model.AdminDepartemental;
import reseauinitiativedeuxsevres.ttm.model.DTO.AdminDepartementalDTO;
import reseauinitiativedeuxsevres.ttm.service.AdminGeneralService;

@RestController
@RequestMapping("/api/AdminG/")
public class AdminGeneralController {

    @Autowired
    private AdminGeneralService adminGeneralService;

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/creationAdminD")
    public ResponseEntity<AdminDepartemental> creationAdminDepartemental(@RequestBody AdminDepartementalDTO adminDepartementalDTO) {
        AdminDepartemental adminDepartemental = adminGeneralService.creationAdminDepartemental(adminDepartementalDTO);
        return ResponseEntity.status(HttpStatus.OK).body(adminDepartemental);
    }

}
