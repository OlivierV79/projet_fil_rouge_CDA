package reseauinitiativedeuxsevres.ttm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import reseauinitiativedeuxsevres.ttm.entity.Member;
import reseauinitiativedeuxsevres.ttm.entity.Role;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByUsername(String username);

    long countByRole(Role role);

    long countByRoleAndAvailableTrue(Role role);

    @Query(value = "SELECT COUNT(DISTINCT founder_id) FROM mentor_founder_relation", nativeQuery = true)
    long countFoundersWithMentorNative();


}
