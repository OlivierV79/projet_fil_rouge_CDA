package reseauinitiativedeuxsevres.ttm.dto;

import lombok.Data;
import reseauinitiativedeuxsevres.ttm.entity.Role;

@Data
public class MemberCreationRequest {
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private Role role; // MENTOR ou FOUNDER
    private Integer nbrOfFounders; // null pour founder
}
