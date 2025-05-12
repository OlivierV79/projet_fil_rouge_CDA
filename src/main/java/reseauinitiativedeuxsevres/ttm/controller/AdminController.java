package reseauinitiativedeuxsevres.ttm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import reseauinitiativedeuxsevres.ttm.dto.MemberCreationRequest;
import reseauinitiativedeuxsevres.ttm.entity.Member;
import reseauinitiativedeuxsevres.ttm.service.AdminService;
import reseauinitiativedeuxsevres.ttm.service.MemberService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/create-member")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createMember(@RequestBody MemberCreationRequest request) {
        Member newMember = adminService.createMember(request);
        return ResponseEntity.ok("Membre créé avec succès. Un mot de passe temporaire a été généré.");
    }
}
