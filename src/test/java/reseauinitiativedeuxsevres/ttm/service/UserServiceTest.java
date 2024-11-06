package reseauinitiativedeuxsevres.ttm.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import reseauinitiativedeuxsevres.ttm.model.AdminDepartemental;
import reseauinitiativedeuxsevres.ttm.repository.UserRepository;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @InjectMocks
    UserService userService;

    @Mock
    UserRepository userRepository;

    @Test
    void creerAdminDepartemental() {

        AdminDepartemental adminDepartemental79 = new AdminDepartemental("Nomadmindepartemental79", "admindepartemental79@toto.fr", "Initiatives Deux-Sèvres");

        String resultExpected = "bien enregistrer";

        Mockito.when(userRepository.save(adminDepartemental79)).thenReturn(adminDepartemental79);

        String resultResponse = userService.enregistrerAdminDepartemental(adminDepartemental79);

        assertThat(resultExpected).isEqualTo(resultResponse);
    }

    @Test
    void rechercherAdminDepartemental() {

        AdminDepartemental adminDepartemental79 = new AdminDepartemental("Nomadmindepartemental79", "admindepartemental79@toto.fr", "Initiatives Deux-Sèvres");

        String request = "Nomadmindepartemental79";

        Mockito.when(userRepository.rechercherAdminDepartemental(request)).thenReturn(Optional.of(adminDepartemental79));

        Optional<AdminDepartemental> resultResponse = userService.rechercherAdminDepartemental(request);
        AdminDepartemental resutlt = resultResponse.orElseThrow();

        assertThat(adminDepartemental79).isEqualTo(resutlt);
        assertThat(adminDepartemental79.getEntreprise()).isEqualTo(resutlt.getEntreprise());
        assertThat(adminDepartemental79.getMail()).isEqualTo(resutlt.getMail());
    }


}
