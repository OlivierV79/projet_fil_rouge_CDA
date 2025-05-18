package reseauinitiativedeuxsevres.ttm.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import reseauinitiativedeuxsevres.ttm.dto.EligibleMemberDTO;
import reseauinitiativedeuxsevres.ttm.entity.Admin;
import reseauinitiativedeuxsevres.ttm.entity.Document;
import reseauinitiativedeuxsevres.ttm.entity.Member;
import reseauinitiativedeuxsevres.ttm.entity.Role;
import reseauinitiativedeuxsevres.ttm.repository.AdminRepository;
import reseauinitiativedeuxsevres.ttm.repository.DocumentRepository;
import reseauinitiativedeuxsevres.ttm.repository.MemberRepository;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DocumentService {

    private final DocumentRepository documentRepository;
    private final MemberRepository memberRepository;
    private final AdminRepository adminRepository;

    /*
    @Transactional
    public void uploadDocument(String username, MultipartFile file, String type, Long receiverId) throws IOException {
        Role role = getCurrentRole(); // Tu peux récupérer le rôle via SecurityContext
        Document doc = new Document();

        doc.setName(file.getOriginalFilename());
        doc.setMimeType(file.getContentType());
        doc.setData(file.getBytes());
        doc.setType(type);

        // Définir le propriétaire (owner)
        if (role == Role.ADMIN) {
            Admin admin = adminRepository.findByUsername(username)
                    .orElseThrow(() -> new EntityNotFoundException("Admin non trouvé"));
            doc.setOwnerAdmin(admin);
        } else {
            Member member = memberRepository.findByUsername(username)
                    .orElseThrow(() -> new EntityNotFoundException("Utilisateur non trouvé"));
            doc.setOwnerMember(member);
        }

        // Définir le destinataire
        if (receiverId != null) {
            if (memberRepository.existsById(receiverId)) {
                Member receiver = memberRepository.findById(receiverId)
                        .orElseThrow(() -> new EntityNotFoundException("Destinataire membre non trouvé"));
                doc.setReceiverMember(receiver);
            } else if (adminRepository.existsById(receiverId)) {
                Admin receiverAdmin = adminRepository.findById(receiverId)
                        .orElseThrow(() -> new EntityNotFoundException("Destinataire admin non trouvé"));
                doc.setReceiverAdmin(receiverAdmin);
            } else {
                throw new EntityNotFoundException("Destinataire introuvable avec ID : " + receiverId);
            }
        }

        documentRepository.save(doc);
    }

     */

    @Transactional
    public void uploadDocument(String username, MultipartFile file, String type) throws IOException {
        byte[] data = file.getBytes();

        // Vérifie si c'est un Member
        Optional<Member> memberOpt = memberRepository.findByUsername(username);
        if (memberOpt.isPresent()) {
            Member member = memberOpt.get();

            Document doc = new Document();
            doc.setName(file.getOriginalFilename());
            doc.setMimeType(file.getContentType());
            doc.setData(data);
            doc.setType(type);
            doc.setOwnerMember(member);

            documentRepository.save(doc);
            return;
        }

        // Sinon on vérifie si c'est un Admin
        Optional<Admin> adminOpt = adminRepository.findByUsername(username);
        if (adminOpt.isPresent()) {
            Admin admin = adminOpt.get();

            Document doc = new Document();
            doc.setName(file.getOriginalFilename());
            doc.setMimeType(file.getContentType());
            doc.setData(data);
            doc.setType(type);
            doc.setOwnerAdmin(admin);

            documentRepository.save(doc);
            return;
        }

        throw new EntityNotFoundException("Utilisateur non trouvé");
    }


    private Role getCurrentRole() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) return Role.ADMIN;
        if (auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_MENTOR"))) return Role.MENTOR;
        return Role.FOUNDER;
    }

    @Transactional(readOnly = true)
    public Document getDocument(String username, String type) {
        Optional<Member> memberOpt = memberRepository.findByUsername(username);

        if (memberOpt.isPresent()) {
            Member member = memberOpt.get();
            Document doc = documentRepository.findByOwnerMemberAndType(member, type)
                    .orElseThrow(() -> new EntityNotFoundException("Document non trouvé"));
            doc.getData(); // forcer chargement LOB
            return doc;
        }

        Optional<Admin> adminOpt = adminRepository.findByUsername(username);
        if (adminOpt.isPresent()) {
            Admin admin = adminOpt.get();
            Document doc = documentRepository.findByOwnerAdmin(admin).stream()
                    .filter(d -> type.equals(d.getType()))
                    .findFirst()
                    .orElseThrow(() -> new EntityNotFoundException("Document non trouvé"));
            doc.getData();
            return doc;
        }

        throw new EntityNotFoundException("Utilisateur non trouvé");
    }



    /*
    @Transactional
    public void sendDocument(String senderUsername, Long receiverId, MultipartFile file, String type) throws IOException {
        Member sender = memberRepository.findByUsername(senderUsername)
                .orElseThrow(() -> new EntityNotFoundException("Expéditeur non trouvé"));

        Member receiver = memberRepository.findById(receiverId)
                .orElseThrow(() -> new EntityNotFoundException("Destinataire non trouvé"));

        Document doc = Document.builder()
                .name(file.getOriginalFilename())
                .mimeType(file.getContentType())
                .data(file.getBytes())
                .type(type)
                .owner(sender)
                .receiver(receiver)
                .build();

        documentRepository.save(doc);
    }

     */


    /*
    @Transactional(readOnly = true)
    public List<Document> getReceivedDocuments(String username) {
        Member receiver = memberRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("Utilisateur non trouvé"));

        return documentRepository.findByReceiver(receiver);
    }

     */
    @Transactional(readOnly = true)
    public List<Document> getReceivedDocuments(String username) {
        Optional<Member> memberOpt = memberRepository.findByUsername(username);
        if (memberOpt.isPresent()) {
            return documentRepository.findByReceiverMember(memberOpt.get());
        }

        Optional<Admin> adminOpt = adminRepository.findByUsername(username);
        if (adminOpt.isPresent()) {
            return documentRepository.findByReceiverAdmin(adminOpt.get());
        }

        throw new EntityNotFoundException("Utilisateur non trouvé");
    }

    @Transactional
    public void sendDocument(String senderUsername, Long receiverId, String type, MultipartFile file) throws IOException {
        // Récupérer l'expéditeur
        Optional<Member> senderMemberOpt = memberRepository.findByUsername(senderUsername);
        Optional<Admin> senderAdminOpt = adminRepository.findByUsername(senderUsername);

        if (senderMemberOpt.isEmpty() && senderAdminOpt.isEmpty()) {
            throw new EntityNotFoundException("Expéditeur introuvable");
        }

        Document doc = new Document();
        doc.setName(file.getOriginalFilename());
        doc.setMimeType(file.getContentType());
        doc.setData(file.getBytes());
        doc.setType(type);

        // Affecter l'expéditeur
        senderMemberOpt.ifPresent(doc::setOwnerMember);
        senderAdminOpt.ifPresent(doc::setOwnerAdmin);

        // Gérer le destinataire
        if (receiverId == -1) {
            // Envoi à l'admin unique
            Admin admin = adminRepository.findAll().stream().findFirst()
                    .orElseThrow(() -> new EntityNotFoundException("Administrateur introuvable"));
            doc.setReceiverAdmin(admin);
        } else {
            Member receiver = memberRepository.findById(receiverId)
                    .orElseThrow(() -> new EntityNotFoundException("Destinataire introuvable"));
            doc.setReceiverMember(receiver);
        }

        documentRepository.save(doc);
    }



}

