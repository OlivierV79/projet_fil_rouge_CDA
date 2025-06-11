package reseauinitiativedeuxsevres.ttm.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import reseauinitiativedeuxsevres.ttm.dto.MemberProfileDTO;
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

    @GetMapping("/founders-username")
    @PreAuthorize("hasRole('MENTOR')")
    public ResponseEntity<List<String>> getAssignedFoundersUsername(Authentication authentication) {
        String username = authentication.getName();
        List<String> founders = memberService.getAssignedFoundersUsername(username);
        return ResponseEntity.ok(founders);
    }

    @GetMapping("/assigned")
    @PreAuthorize("hasRole('FOUNDER')")
    public ResponseEntity<?> getAssignedMentor(Authentication authentication) {
        String username = authentication.getName();
        return memberService.getAssignedMentor(username)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.ok().build()); // pas de mentor
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('FOUNDER')")
    public ResponseEntity<List<MemberProfileDTO>> getAllMentors() {
        return ResponseEntity.ok(memberService.getAllAvailableMentors());
    }

    @PostMapping("/assign/{mentorUsername}")
    @PreAuthorize("hasRole('FOUNDER')")
    public ResponseEntity<?> assignMentor(@PathVariable String mentorUsername, Authentication authentication) {
        String founderUsername = authentication.getName();
        try {
            memberService.assignMentor(founderUsername, mentorUsername);
            return ResponseEntity.ok("Mentor assigné avec succès.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
