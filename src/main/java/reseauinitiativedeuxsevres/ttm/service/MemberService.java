package reseauinitiativedeuxsevres.ttm.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import reseauinitiativedeuxsevres.ttm.dto.MemberCreationRequest;
import reseauinitiativedeuxsevres.ttm.dto.MemberProfileDTO;
import reseauinitiativedeuxsevres.ttm.dto.SimpleMemberDTO;
import reseauinitiativedeuxsevres.ttm.dto.UpdateMemberDTO;
import reseauinitiativedeuxsevres.ttm.entity.Member;
import reseauinitiativedeuxsevres.ttm.entity.Role;
import reseauinitiativedeuxsevres.ttm.repository.AdminRepository;
import reseauinitiativedeuxsevres.ttm.repository.MemberRepository;
import org.springframework.transaction.annotation.Transactional;


import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class MemberService {
    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

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

    public List<String> getAssignedFoundersUsername(String mentorUsername) {
        Member mentor = memberRepository.findByUsername(mentorUsername)
                .orElseThrow(() -> new EntityNotFoundException("Mentor not found"));

        return mentor.getMentorshipRelations()
                .stream()
                //.map(f -> new SimpleMemberDTO(f.getId(), f.getFirstName() + " " + f.getLastName()))
                .map(f -> (f.getUsername()))
                .collect(Collectors.toList());
    }

    public MemberProfileDTO getCurrentMemberProfile(String username) {
        Member member = memberRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé"));

        MemberProfileDTO dto = new MemberProfileDTO();
        dto.setUsername(member.getUsername());
        dto.setEmail(member.getEmail());
        dto.setFirstName(member.getFirstName());
        dto.setLastName(member.getLastName());
        dto.setNbrOfFounders(member.getNbrOfFounders());
        dto.setRole(member.getRole().name());
        dto.setAvailable(member.isAvailable());

        return dto;
    }

    public void updateCurrentMemberProfile(String username, UpdateMemberDTO dto) {
        Optional<Member> optionalMember = memberRepository.findByUsername(username);

        if (optionalMember.isEmpty()) {
            throw new UsernameNotFoundException("Utilisateur non trouvé : " + username);
        }

        Member member = optionalMember.get();

        member.setFirstName(dto.getFirstName());
        member.setLastName(dto.getLastName());
        member.setEmail(dto.getEmail());

        if (member.getRole() == Role.MENTOR) {
            member.setNbrOfFounders(dto.getNbrOfFounders());
            member.setAvailable(dto.getAvailable());
        }

        if (dto.getPassword() != null && !dto.getPassword().isBlank()) {
            // Vérification du mot de passe actuel
            if (dto.getCurrentPassword() == null || !passwordEncoder.matches(dto.getCurrentPassword(), member.getPassword())) {
                throw new IllegalArgumentException("Le mot de passe actuel est incorrect.");
            }

            member.setPassword(passwordEncoder.encode(dto.getPassword()));
        }

        memberRepository.save(member);
    }

    public MemberProfileDTO getProfileByUsername(String username) {
        Optional<Member> memberOpt = memberRepository.findByUsername(username);
        if (memberOpt.isEmpty()) {
            throw new RuntimeException("Membre introuvable");
        }

        Member member = memberOpt.get();

        MemberProfileDTO dto = new MemberProfileDTO();
        dto.setUsername(member.getUsername());
        dto.setEmail(member.getEmail());
        dto.setFirstName(member.getFirstName());
        dto.setLastName(member.getLastName());
        dto.setNbrOfFounders(member.getNbrOfFounders());
        dto.setRole(member.getRole().name());
        dto.setAvailable(member.isAvailable());
        dto.setAssignedFoundersCount(member.getMentorshipRelations() != null ? member.getMentorshipRelations().size() : 0);


        return dto;
    }

    public List<MemberProfileDTO> getAllMentors() {
        return memberRepository.findAll().stream()
                .filter(m -> m.getRole() == Role.MENTOR)
                .map(this::toDtoBasic)
                .collect(Collectors.toList());
    }


    private MemberProfileDTO toDtoBasic(Member m) {
        return MemberProfileDTO.builder()
                .username(m.getUsername())
                .firstName(m.getFirstName())
                .lastName(m.getLastName())
                .role(m.getRole().name())
                .assignedFoundersCount(m.getRole() == Role.MENTOR && m.getMentorshipRelations() != null
                        ? m.getMentorshipRelations().size() : null)
                .build();
    }

    public List<MemberProfileDTO> getAllMembers() {
        return memberRepository.findAll().stream()
                .map(this::toDtoFull)
                .collect(Collectors.toList());
    }




    private MemberProfileDTO toDtoFull(Member m) {
        return MemberProfileDTO.builder()
                .username(m.getUsername())
                .email(m.getEmail())
                .firstName(m.getFirstName())
                .lastName(m.getLastName())
                .nbrOfFounders(m.getRole() == Role.MENTOR ? m.getNbrOfFounders() : null)
                .available(m.getRole() == Role.MENTOR ? m.isAvailable() : null)
                .role(m.getRole().name())
                .assignedFoundersCount(m.getRole() == Role.MENTOR && m.getMentorshipRelations() != null
                        ? m.getMentorshipRelations().size() : null)
                .hasMentor(m.getRole() == Role.FOUNDER && hasMentor(m))
                .build();
    }

    private boolean hasMentor(Member founder) {
        return memberRepository.findAll().stream()
                .filter(m -> m.getRole() == Role.MENTOR)
                .anyMatch(mentor -> mentor.getMentorshipRelations().contains(founder));
    }

    public Optional<MemberProfileDTO> getAssignedMentor(String founderUsername) {
        Member founder = memberRepository.findByUsername(founderUsername)
                .orElseThrow(() -> new EntityNotFoundException("Founder not found"));

        // Cherche un mentor ayant ce fondateur dans ses relations
        return memberRepository.findAll().stream()
                .filter(m -> m.getRole() == Role.MENTOR && m.getMentorshipRelations().contains(founder))
                .findFirst()
                .map(m -> {
                    MemberProfileDTO dto = new MemberProfileDTO();
                    dto.setUsername(m.getUsername());
                    dto.setFirstName(m.getFirstName());
                    dto.setLastName(m.getLastName());
                    dto.setEmail(m.getEmail());
                    dto.setNbrOfFounders(m.getNbrOfFounders());
                    dto.setRole(m.getRole().name());
                    dto.setAvailable(m.isAvailable());
                    return dto;
                });
    }

    public List<MemberProfileDTO> getAllAvailableMentors() {
        return memberRepository.findAll().stream()
                .filter(m -> m.getRole() == Role.MENTOR)
                .filter(m -> Boolean.TRUE.equals(m.isAvailable()))
                .filter(m -> m.getNbrOfFounders() == null || m.getMentorshipRelations().size() < m.getNbrOfFounders())
                .map(m -> {
                    MemberProfileDTO dto = new MemberProfileDTO();
                    dto.setUsername(m.getUsername());
                    dto.setFirstName(m.getFirstName());
                    dto.setLastName(m.getLastName());
                    dto.setEmail(m.getEmail());
                    dto.setNbrOfFounders(m.getNbrOfFounders());
                    dto.setAvailable(m.isAvailable());
                    dto.setRole(m.getRole().name());
                    dto.setAssignedFoundersCount(m.getMentorshipRelations() != null ? m.getMentorshipRelations().size() : 0);

                    return dto;
                })
                .toList();
    }

    @Transactional
    public void assignMentor(String founderUsername, String mentorUsername) {
        Member founder = memberRepository.findByUsername(founderUsername)
                .orElseThrow(() -> new EntityNotFoundException("Founder not found"));
        Member mentor = memberRepository.findByUsername(mentorUsername)
                .orElseThrow(() -> new EntityNotFoundException("Mentor not found"));

        if (mentor.getRole() != Role.MENTOR || founder.getRole() != Role.FOUNDER) {
            throw new IllegalArgumentException("Rôles non valides");
        }

        // Vérifie s'il a déjà un mentor
        boolean hasMentor = memberRepository.findAll().stream()
                .filter(m -> m.getRole() == Role.MENTOR)
                .anyMatch(m -> m.getMentorshipRelations().contains(founder));

        if (hasMentor) {
            throw new IllegalStateException("Vous avez déjà un mentor assigné.");
        }

        mentor.getMentorshipRelations().add(founder);
        memberRepository.save(mentor);
    }

    /*
    public List<SimpleMemberDTO> getEligibleRecipients(String username) {
        Member sender = memberRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé"));

        Role role = sender.getRole();

        return switch (role) {
            case ADMIN -> memberRepository.findAll().stream()
                    .filter(m -> !m.getUsername().equals(username)) // on ne veut pas s’envoyer à soi-même
                    .map(m -> new SimpleMemberDTO(m.getId(), m.getFirstName() + " " + m.getLastName()))
                    .toList();

            case MENTOR -> {
                List<SimpleMemberDTO> recipients = sender.getMentorshipRelations().stream()
                        .map(f -> new SimpleMemberDTO(f.getId(), f.getFirstName() + " " + f.getLastName()))
                        .collect(Collectors.toList());

                recipients.addAll(
                        memberRepository.findAll().stream()
                                .filter(m -> m.getRole() == Role.ADMIN)
                                .map(a -> new SimpleMemberDTO(a.getId(), a.getFirstName() + " " + a.getLastName()))
                                .toList()
                );
                yield recipients;
            }

            case FOUNDER -> {
                List<SimpleMemberDTO> result = new ArrayList<>();

                memberRepository.findAll().stream()
                        .filter(m -> m.getRole() == Role.MENTOR && m.getMentorshipRelations().contains(sender))
                        .findFirst()
                        .ifPresent(mentor ->
                                result.add(new SimpleMemberDTO(mentor.getId(), mentor.getFirstName() + " " + mentor.getLastName()))
                        );

                result.addAll(
                        memberRepository.findAll().stream()
                                .filter(m -> m.getRole() == Role.ADMIN)
                                .map(a -> new SimpleMemberDTO(a.getId(), a.getFirstName() + " " + a.getLastName()))
                                .toList()
                );
                yield result;
            }

            default -> throw new IllegalStateException("Rôle inconnu");
        };
    }

     */

    public List<SimpleMemberDTO> getEligibleReceivers(String username) {
        Optional<Member> memberOpt = memberRepository.findByUsername(username);

        if (memberOpt.isPresent()) {
            Member member = memberOpt.get();

            return switch (member.getRole()) {
                case FOUNDER -> memberRepository.findAll().stream()
                        .filter(m -> m.getRole() == Role.MENTOR && m.getMentorshipRelations().contains(member))
                        .map(m -> new SimpleMemberDTO(m.getId(), m.getFirstName() + " " + m.getLastName()))
                        .toList();

                case MENTOR -> member.getMentorshipRelations().stream()
                        .map(f -> new SimpleMemberDTO(f.getId(), f.getFirstName() + " " + f.getLastName()))
                        .toList();

                default -> List.of();
            };
        }

        // Si ce n'est pas un Member, on vérifie si c'est un Admin
        boolean isAdmin = adminRepository.findByUsername(username).isPresent();
        if (isAdmin) {
            return memberRepository.findAll().stream()
                    .map(m -> new SimpleMemberDTO(m.getId(), m.getFirstName() + " " + m.getLastName()))
                    .toList();
        }

        throw new EntityNotFoundException("Utilisateur non trouvé dans les membres ni en tant qu'admin");
    }



}
