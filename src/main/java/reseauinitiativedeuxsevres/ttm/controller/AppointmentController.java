package reseauinitiativedeuxsevres.ttm.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import reseauinitiativedeuxsevres.ttm.dto.AppointmentDTO;
import reseauinitiativedeuxsevres.ttm.dto.AppointmentRequest;
import reseauinitiativedeuxsevres.ttm.entity.Appointment;
import reseauinitiativedeuxsevres.ttm.service.AppointmentService;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    @GetMapping
    public List<AppointmentDTO> getAllAppointments() {
        return appointmentService.getAllAppointments();
    }

    @GetMapping("/mine")
    public ResponseEntity<List<AppointmentDTO>> getMyAppointments() {
        return ResponseEntity.ok(appointmentService.getAppointmentsForCurrentMember());
    }

    @PostMapping
    @PreAuthorize("hasRole('MENTOR')")
    public ResponseEntity<?> createAppointment(@RequestBody AppointmentRequest request, Authentication authentication) {
        try {
            String mentorUsername = authentication.getName();
            Appointment created = appointmentService.createAppointment(mentorUsername, request);
            return ResponseEntity.ok(created);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(403).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erreur lors de la création du rendez-vous");
        }
    }


}
