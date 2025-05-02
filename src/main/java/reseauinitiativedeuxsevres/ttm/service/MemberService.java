package reseauinitiativedeuxsevres.ttm.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reseauinitiativedeuxsevres.ttm.dto.SimpleMemberDTO;
import reseauinitiativedeuxsevres.ttm.entity.Member;
import reseauinitiativedeuxsevres.ttm.repository.MemberRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MemberService {
    @Autowired
    private MemberRepository memberRepository;

    public Member createMember(Member member) {
        return memberRepository.save(member);
    }

    public List<SimpleMemberDTO> getAssignedFounders(String mentorUsername) {
        Member mentor = memberRepository.findByUsername(mentorUsername)
                .orElseThrow(() -> new EntityNotFoundException("Mentor not found"));

        return mentor.getMentorshipRelations()
                .stream()
                .map(f -> new SimpleMemberDTO(f.getId(), f.getFirstName() + " " + f.getLastName()))
                .collect(Collectors.toList());
    }
}
