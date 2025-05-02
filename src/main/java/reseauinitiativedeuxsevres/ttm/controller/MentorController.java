package reseauinitiativedeuxsevres.ttm.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import reseauinitiativedeuxsevres.ttm.dto.SimpleMemberDTO;
import reseauinitiativedeuxsevres.ttm.service.MemberService;

import java.util.List;

@RestController
@RequestMapping("/api/mentors")
public class MentorController {

    private MemberService memberService;

    public MentorController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping("/founders")
    @PreAuthorize("hasRole('MENTOR')")
    public ResponseEntity<List<SimpleMemberDTO>> getAssignedFounders(Authentication authentication) {
        String username = authentication.getName();
        List<SimpleMemberDTO> founders = memberService.getAssignedFounders(username);
        return ResponseEntity.ok(founders);
    }
}
