package reseauinitiativedeuxsevres.ttm.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reseauinitiativedeuxsevres.ttm.dto.AppointmentDTO;
import reseauinitiativedeuxsevres.ttm.dto.AppointmentRequest;
import reseauinitiativedeuxsevres.ttm.entity.Appointment;
import reseauinitiativedeuxsevres.ttm.entity.Member;
import reseauinitiativedeuxsevres.ttm.mapper.AppointmentMapper;
import reseauinitiativedeuxsevres.ttm.repository.AppointmentRepository;
import reseauinitiativedeuxsevres.ttm.repository.MemberRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private  AppointmentMapper appointmentMapper;
    @Autowired
    private MemberRepository memberRepository;

    public List<AppointmentDTO> getAllAppointments() {
        return appointmentRepository.findAll().stream()
                .sorted((a, b) -> {
                    int cmp = b.getDate().compareTo(a.getDate());
                    if (cmp == 0) {
                        return b.getTime().compareTo(a.getTime());
                    }
                    return cmp;
                })
                .map(appointmentMapper::toDto)
                .toList();
    }

    public String getCurrentUsername() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            return ((UserDetails) principal).getUsername();
        } else {
            return principal.toString();
        }
    }

    public List<AppointmentDTO> getAppointmentsForCurrentMember() {
        String username = getCurrentUsername();
        Optional<Member> memberOpt = memberRepository.findByUsername(username);

        if (memberOpt.isEmpty()) {
            throw new UsernameNotFoundException("Utilisateur non trouvé");
        }

        Member member = memberOpt.get();
        List<Appointment> appointments = appointmentRepository.findByMentorOrFounder(member, member);

        return appointments.stream()
                .sorted((a, b) -> {
                    int cmp = b.getDate().compareTo(a.getDate());
                    if (cmp == 0) {
                        return b.getTime().compareTo(a.getTime());
                    }
                    return cmp;
                })
                .map(appointmentMapper::toDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public Appointment createAppointment(String mentorUsername, AppointmentRequest request) {
        Member mentor = memberRepository.findByUsername(mentorUsername)
                .orElseThrow(() -> new EntityNotFoundException("Mentor non trouvé"));

        Member founder = memberRepository.findById(request.getFounderId())
                .orElseThrow(() -> new EntityNotFoundException("Founder non trouvé"));

        if (!mentor.getMentorshipRelations().contains(founder)) {
            throw new IllegalArgumentException("Ce fondateur ne vous est pas assigné.");
        }

        Appointment appointment = new Appointment();
        appointment.setDate(request.getDate());
        appointment.setTime(request.getTime());
        appointment.setSubject(request.getSubject());
        appointment.setMentor(mentor);
        appointment.setFounder(founder);

        return appointmentRepository.save(appointment);
    }

    @Transactional
    public Appointment updateAppointment(Long id, AppointmentRequest request, String mentorUsername) {
        Appointment appt = appointmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Rendez-vous non trouvé"));

        if (!appt.getMentor().getUsername().equals(mentorUsername)) {
            throw new AccessDeniedException("Vous n'êtes pas autorisé à modifier ce rendez-vous.");
        }

        appt.setDate(request.getDate());
        appt.setTime(request.getTime());
        appt.setSubject(request.getSubject());
        return appointmentRepository.save(appt);
    }

    public void cancelAppointment(Long id, String mentorUsername) {
        Appointment appt = appointmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Rendez-vous non trouvé"));

        if (!appt.getMentor().getUsername().equals(mentorUsername)) {
            throw new AccessDeniedException("Vous n'êtes pas autorisé à annuler ce rendez-vous.");
        }

        appointmentRepository.delete(appt);
    }

    @Transactional
    public Appointment addSummary(Long id, String summary, String mentorUsername) {
        Appointment appt = appointmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Rendez-vous non trouvé"));

        if (!appt.getMentor().getUsername().equals(mentorUsername)) {
            throw new AccessDeniedException("Vous n'êtes pas autorisé à modifier ce compte rendu.");
        }

        appt.setSummary(summary);
        return appointmentRepository.save(appt);
    }

    @Transactional
    public void updateSummary(Long appointmentId, String summary, String username) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new EntityNotFoundException("Rendez-vous introuvable"));

        if (!appointment.getMentor().getUsername().equals(username)) {
            throw new AccessDeniedException("Vous ne pouvez modifier que vos propres rendez-vous.");
        }

        appointment.setSummary(summary);
        appointmentRepository.save(appointment);
    }

    public String getSummary(Long appointmentId, String username, String role) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new EntityNotFoundException("Rendez-vous introuvable"));

        boolean isMentor = appointment.getMentor().getUsername().equals(username);
        if (!isMentor && !role.equals("ADMIN")) {
            throw new AccessDeniedException("Non autorisé à voir ce compte rendu.");
        }

        return appointment.getSummary();
    }
}
