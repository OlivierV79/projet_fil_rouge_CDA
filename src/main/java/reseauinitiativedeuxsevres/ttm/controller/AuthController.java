package reseauinitiativedeuxsevres.ttm.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;
import reseauinitiativedeuxsevres.ttm.dto.JwtAuthenticationResponse;
import reseauinitiativedeuxsevres.ttm.dto.LoginRequest;
import reseauinitiativedeuxsevres.ttm.security.JwtTokenProvider;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        try {
            // On authentifie avec username/password
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );

            // Si ok, on génère un token
            String token = jwtTokenProvider.generateToken(loginRequest.getUsername());

            // Et on le retourne
            return ResponseEntity.ok(new JwtAuthenticationResponse(token));

        } catch (AuthenticationException ex) {
            return ResponseEntity.status(401).body("Nom d'utilisateur ou mot de passe incorrect.");
        }
    }
}
