package reseauinitiativedeuxsevres.ttm.service;

import reseauinitiativedeuxsevres.ttm.model.AdminDepartemental;
import reseauinitiativedeuxsevres.ttm.repository.UserRepository;
import reseauinitiativedeuxsevres.ttm.service.Impl.UserServiceImpl;

import java.util.Optional;

public class UserService implements UserServiceImpl {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public String enregistrerAdminDepartemental(AdminDepartemental adminDepartemental) {

        userRepository.save(adminDepartemental);

        return "bien enregistrer";
    }

    @Override
    public Optional<AdminDepartemental> rechercherAdminDepartemental(String nom) {



        return userRepository.rechercherAdminDepartemental(nom);
    }
}
