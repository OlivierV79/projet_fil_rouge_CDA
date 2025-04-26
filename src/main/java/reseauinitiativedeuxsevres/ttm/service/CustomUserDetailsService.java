package reseauinitiativedeuxsevres.ttm.service;


import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import reseauinitiativedeuxsevres.ttm.entity.Admin;
import reseauinitiativedeuxsevres.ttm.entity.Membre;
import reseauinitiativedeuxsevres.ttm.repository.AdminRepository;
import reseauinitiativedeuxsevres.ttm.repository.MembreRepository;

import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final AdminRepository adminRepository;
    private final MembreRepository membreRepository;

    public CustomUserDetailsService(AdminRepository adminRepository, MembreRepository membreRepository) {
        this.adminRepository = adminRepository;
        this.membreRepository = membreRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Rechercher l'utilisateur dans les deux repositories
        Optional<Admin> admin = adminRepository.findByUsername(username);
        if (admin.isPresent()) {
            return admin.get();
        }

        Optional<Membre> membre = membreRepository.findByUsername(username);
        if (membre.isPresent()) {
            return membre.get();
        }

        // Si aucun utilisateur trouvé
        throw new UsernameNotFoundException("Utilisateur non trouvé avec le nom : " + username);
    }
}
