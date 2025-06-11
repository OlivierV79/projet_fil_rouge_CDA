package reseauinitiativedeuxsevres.ttm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import reseauinitiativedeuxsevres.ttm.dto.MemberCreationRequest;
import reseauinitiativedeuxsevres.ttm.entity.Member;
import reseauinitiativedeuxsevres.ttm.entity.Role;
import reseauinitiativedeuxsevres.ttm.repository.MemberRepository;

import java.security.SecureRandom;
import java.util.Random;
import java.util.UUID;

@Service
public class AdminService {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Member createMember(MemberCreationRequest request) {
        Member member = new Member();

        member.setUsername(request.getUsername());
        member.setEmail(request.getEmail());
        member.setFirstName(request.getFirstName());
        member.setLastName(request.getLastName());
        member.setRole(request.getRole());
        member.setNbrOfFounders(request.getRole() == Role.MENTOR ? request.getNbrOfFounders() : null);
        member.setAvailable(true);

        // 🔐 Générer un mot de passe aléatoire
        String rawPassword = generateRandomPassword(12);
        System.out.println(" -----------------------------------------------------------------------------");
        System.out.println(" -------------------------- Génération mot de pass  --------------------------");
        System.out.println(" -----------------------------------------------------------------------------");
        System.out.println(" ------------- Mot de passe généré pour " + request.getUsername() + " : " + rawPassword + "-------------");
        System.out.println(" -----------------------------------------------------------------------------");
        System.out.println(" -------------------------- Génération mot de pass  --------------------------");
        System.out.println(" -----------------------------------------------------------------------------");
        member.setPassword(passwordEncoder.encode(rawPassword));


        // Enregistrer
        return memberRepository.save(member);
    }

    private String generateRandomPassword(int length) {
        return UUID.randomUUID().toString().replace("-", "").substring(0, length);
    }
}
