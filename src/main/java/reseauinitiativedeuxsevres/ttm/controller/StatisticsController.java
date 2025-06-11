package reseauinitiativedeuxsevres.ttm.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reseauinitiativedeuxsevres.ttm.dto.StatMemberDTO;
import reseauinitiativedeuxsevres.ttm.service.MemberService;

@RestController
@RequestMapping("/api/statistics")
public class StatisticsController {

    private final MemberService memberService;

    public StatisticsController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping("/member")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<StatMemberDTO> getStatisticMember() {

        StatMemberDTO statMemberDTO = memberService.getStatisticMember();
        return ResponseEntity.ok(statMemberDTO);
    }
}
