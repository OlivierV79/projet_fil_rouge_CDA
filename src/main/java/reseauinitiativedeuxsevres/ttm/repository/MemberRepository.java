package reseauinitiativedeuxsevres.ttm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import reseauinitiativedeuxsevres.ttm.entity.Member;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByUsername(String username);
}
