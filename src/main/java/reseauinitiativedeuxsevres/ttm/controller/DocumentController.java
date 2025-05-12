package reseauinitiativedeuxsevres.ttm.controller;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import reseauinitiativedeuxsevres.ttm.entity.Document;
import reseauinitiativedeuxsevres.ttm.service.DocumentService;

import java.io.IOException;

@RestController
@RequestMapping("/api/documents")
@RequiredArgsConstructor
public class DocumentController {

    private final DocumentService documentService;

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

    /*
    @GetMapping("/download/{type}")
    public ResponseEntity<?> download(@PathVariable String type) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();



        try {
            Document doc = documentService.getDocument(username, type);

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(doc.getMimeType()))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + doc.getName() + "\"")
                    .body(new ByteArrayResource(doc.getData()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Document non trouvé");
        }
    }

     */
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
}

