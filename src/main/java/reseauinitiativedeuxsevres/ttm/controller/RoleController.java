package reseauinitiativedeuxsevres.ttm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reseauinitiativedeuxsevres.ttm.model.Role;
import reseauinitiativedeuxsevres.ttm.service.RoleService;

import java.util.List;

@RestController
@RequestMapping("/api/role/")
public class RoleController {


    @Autowired
    private RoleService roleService;

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/roles")
    public ResponseEntity<List<Role>> getAllLieux() {
        List<Role> Lieux = roleService.findAll();
        return ResponseEntity.ok(Lieux);

    }
}
