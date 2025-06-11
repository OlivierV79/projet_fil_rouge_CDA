package reseauinitiativedeuxsevres.ttm.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StatMemberDTO {
    private Long nbMentor;
    private Long nbMentorAvailable;
    private Long nbFounder;
    private Long nbFounderAssigned;
    private Long nbFounderNotAssigned;
}
