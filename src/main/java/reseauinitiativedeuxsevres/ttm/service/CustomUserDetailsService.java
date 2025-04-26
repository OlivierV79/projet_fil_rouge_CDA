package reseauinitiativedeuxsevres.ttm.service;


import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import reseauinitiativedeuxsevres.ttm.entity.Admin;
import reseauinitiativedeuxsevres.ttm.entity.Member;
import reseauinitiativedeuxsevres.ttm.repository.AdminRepository;
import reseauinitiativedeuxsevres.ttm.repository.MemberRepository;

import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final AdminRepository adminRepository;
    private final MemberRepository memberRepository;

    public CustomUserDetailsService(AdminRepository adminRepository, MemberRepository memberRepository) {
        this.adminRepository = adminRepository;
        this.memberRepository = memberRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Rechercher l'utilisateur dans les deux repositories
        Optional<Admin> admin = adminRepository.findByUsername(username);
        if (admin.isPresent()) {
            return admin.get();
        }

        Optional<Member> member = memberRepository.findByUsername(username);
        if (member.isPresent()) {
            return member.get();
        }

        // Si aucun utilisateur trouvé
        throw new UsernameNotFoundException("Utilisateur non trouvé avec le nom : " + username);
    }
}