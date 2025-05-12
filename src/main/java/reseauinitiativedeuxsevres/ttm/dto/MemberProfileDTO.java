package reseauinitiativedeuxsevres.ttm.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberProfileDTO {
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private Integer nbrOfFounders;
    private String role;
    private Boolean available;
    private Integer assignedFoundersCount;
    private Boolean hasMentor;


}
