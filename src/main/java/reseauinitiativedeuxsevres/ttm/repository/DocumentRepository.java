package reseauinitiativedeuxsevres.ttm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import reseauinitiativedeuxsevres.ttm.entity.Admin;
import reseauinitiativedeuxsevres.ttm.entity.Document;
import reseauinitiativedeuxsevres.ttm.entity.Member;

import java.util.List;
import java.util.Optional;

public interface DocumentRepository extends JpaRepository<Document, Long> {
    // Documents uploadés par un member
    List<Document> findByOwnerMember(Member member);

    // Documents uploadés par un admin
    List<Document> findByOwnerAdmin(Admin admin);

    // Un document spécifique uploadé par un member pour un usage donné (ex : profilePicture)
    Optional<Document> findByOwnerMemberAndType(Member member, String type);

    // Documents reçus par un member
    List<Document> findByReceiverMember(Member member);

    // Documents reçus par un admin
    List<Document> findByReceiverAdmin(Admin admin);
}
