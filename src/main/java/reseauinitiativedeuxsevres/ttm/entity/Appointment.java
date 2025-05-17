package reseauinitiativedeuxsevres.ttm.entity;

import jakarta.persistence.*;
import lombok.*;


import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;

    private LocalTime time;

    private String subject;

    @Column(columnDefinition = "TEXT")
    private String summary;

    @ManyToOne
    @JoinColumn(name = "mentor_id")
    private Member mentor;

    @ManyToOne
    @JoinColumn(name = "founder_id")
    private Member founder;
}
