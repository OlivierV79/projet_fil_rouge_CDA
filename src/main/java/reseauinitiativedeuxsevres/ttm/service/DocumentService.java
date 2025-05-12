package reseauinitiativedeuxsevres.ttm.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import reseauinitiativedeuxsevres.ttm.entity.Document;
import reseauinitiativedeuxsevres.ttm.entity.Member;
import reseauinitiativedeuxsevres.ttm.repository.DocumentRepository;
import reseauinitiativedeuxsevres.ttm.repository.MemberRepository;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DocumentService {

    private final DocumentRepository documentRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public void uploadDocument(String username, MultipartFile file, String type) throws IOException {
        Member member = memberRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("Utilisateur non trouvé"));

        Document doc = documentRepository.findByOwnerAndType(member, type).orElse(new Document());

        doc.setName(file.getOriginalFilename());
        doc.setMimeType(file.getContentType());
        doc.setData(file.getBytes());
        doc.setType(type);
        doc.setOwner(member);

        documentRepository.save(doc);
    }

    @Transactional(readOnly = true)
    public Document getDocument(String username, String type) {
        Member member = memberRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("Utilisateur non trouvé"));

        Document doc = documentRepository.findByOwnerAndType(member, type)
                .orElseThrow(() -> new EntityNotFoundException("Document non trouvé"));

        // Force l'accès aux données avant de sortir de la transaction
        doc.getData(); // <-- force le chargement du LOB

        return doc;
    }

    public List<Document> getAllDocumentsFor(String username) {
        Member member = memberRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("Utilisateur non trouvé"));
        return documentRepository.findByOwner(member);
    }
}

