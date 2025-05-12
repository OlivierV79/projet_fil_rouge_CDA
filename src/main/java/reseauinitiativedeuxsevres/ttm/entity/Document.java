package reseauinitiativedeuxsevres.ttm.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String type; // ex: "profilePicture", "justificatif", "cv"

    private String mimeType; // ex: "image/jpeg", "application/pdf"

    @Lob
    @Column(name = "data")
    private byte[] data;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private Member owner;

}

