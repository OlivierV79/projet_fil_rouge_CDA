package reseauinitiativedeuxsevres.ttm.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import reseauinitiativedeuxsevres.ttm.dto.MemberProfileDTO;
import reseauinitiativedeuxsevres.ttm.dto.UpdateMemberDTO;
import reseauinitiativedeuxsevres.ttm.service.MemberService;

import java.util.List;

@RestController
@RequestMapping("/api/members")
public class MemberController {

    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping("/me")
    public ResponseEntity<MemberProfileDTO> getCurrentMember() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String username = authentication.getName();
        MemberProfileDTO profile = memberService.getCurrentMemberProfile(username);
        return ResponseEntity.ok(profile);
    }

    @PutMapping("/me")
    public ResponseEntity<?> updateCurrentMember(@RequestBody UpdateMemberDTO updateDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String username = authentication.getName();
        memberService.updateCurrentMemberProfile(username, updateDto);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/mentors")
    @PreAuthorize("hasRole('FOUNDER')")
    public ResponseEntity<List<MemberProfileDTO>> getAllMentors() {
        List<MemberProfileDTO> mentors = memberService.getAllMentors();
        return ResponseEntity.ok(mentors);
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<MemberProfileDTO>> getAllMembers() {
        List<MemberProfileDTO> all = memberService.getAllMembers();
        return ResponseEntity.ok(all);
    }

    @GetMapping("/profile/{username}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<MemberProfileDTO> getProfileByUsername(@PathVariable String username) {
        return ResponseEntity.ok(memberService.getProfileByUsername(username));
    }
}
