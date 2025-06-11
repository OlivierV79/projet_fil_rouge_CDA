package reseauinitiativedeuxsevres.ttm.dto;

import lombok.*;


@Data
@AllArgsConstructor
public class AppointmentDTO {
    private Long id;
    private String date;
    private String heure;
    private String sujet;
    private String parrain;
    private String porteur;
}
