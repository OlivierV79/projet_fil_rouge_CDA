package reseauinitiativedeuxsevres.ttm.dto;

import lombok.*;


@Data
@AllArgsConstructor
public class AppointmentDTO {
    private String date;
    private String heure;
    private String sujet;
    private String parrain; // nom du mentor
    private String porteur; // nom du founder
}
