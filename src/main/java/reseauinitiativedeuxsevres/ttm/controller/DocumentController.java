package reseauinitiativedeuxsevres.ttm.controller;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import reseauinitiativedeuxsevres.ttm.entity.Document;
import reseauinitiativedeuxsevres.ttm.repository.DocumentRepository;
import reseauinitiativedeuxsevres.ttm.service.DocumentService;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/documents")
@RequiredArgsConstructor
public class DocumentController {

    private final DocumentService documentService;
    private final DocumentRepository documentRepository;

    @PostMapping("/upload/{type}")
    public ResponseEntity<?> upload(@RequestParam("file") MultipartFile file, @PathVariable String type) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        try {
            documentService.uploadDocument(username, file, type);
            return ResponseEntity.ok("Document enregistré.");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur lors de l'upload.");
        }
    }

    @GetMapping("/download/profilePicture/{username}")
    public ResponseEntity<?> downloadProfilePicture(@PathVariable String username) {
        try {
            Document doc = documentService.getDocument(username, "profilePicture");

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(doc.getMimeType()))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + doc.getName() + "\"")
                    .body(new ByteArrayResource(doc.getData()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Document non trouvé");
        }
    }

    @PostMapping("/send")
    public ResponseEntity<?> sendDocument(
            @RequestParam("file") MultipartFile file,
            @RequestParam("receiverId") Long receiverId,
            @RequestParam("type") String type,
            Authentication authentication
    ) {
        try {
            String username = authentication.getName();
            documentService.sendDocument(username, receiverId, type, file);
            return ResponseEntity.ok("Document envoyé.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erreur lors de l'envoi : " + e.getMessage());
        }
    }



    @GetMapping("/received")
    public ResponseEntity<List<Document>> getReceivedDocuments(Authentication auth) {
        String username = auth.getName();
        List<Document> docs = documentService.getReceivedDocuments(username);
        return ResponseEntity.ok(docs);
    }



    @GetMapping("/download/{id}")
    public ResponseEntity<?> downloadById(@PathVariable Long id, Authentication auth) {
        Document doc = documentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Document non trouvé"));

        String currentUsername = auth.getName();

        boolean isOwner =
                (doc.getOwnerMember() != null && doc.getOwnerMember().getUsername().equals(currentUsername))
                        || (doc.getOwnerAdmin() != null && doc.getOwnerAdmin().getUsername().equals(currentUsername));

        boolean isReceiver =
                (doc.getReceiverMember() != null && doc.getReceiverMember().getUsername().equals(currentUsername))
                        || (doc.getReceiverAdmin() != null && doc.getReceiverAdmin().getUsername().equals(currentUsername));

        if (!isOwner && !isReceiver) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Accès refusé.");
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(doc.getMimeType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + doc.getName() + "\"")
                .body(new ByteArrayResource(doc.getData()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDocument(@PathVariable Long id, Authentication auth) {
        String username = auth.getName();

        try {
            documentService.deleteDocument(id, username);
            return ResponseEntity.ok("Document supprimé.");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Document non trouvé.");
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Vous n'avez pas les droits pour supprimer ce document.");
        }
    }

}

