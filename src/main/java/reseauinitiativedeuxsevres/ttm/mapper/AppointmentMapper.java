package reseauinitiativedeuxsevres.ttm.mapper;

import org.springframework.stereotype.Component;
import reseauinitiativedeuxsevres.ttm.dto.AppointmentDTO;
import reseauinitiativedeuxsevres.ttm.entity.Appointment;

@Component
public class AppointmentMapper {

    public AppointmentDTO toDto(Appointment appointment) {
        return new AppointmentDTO(
                appointment.getDate().toString(),
                appointment.getTime().toString(),
                appointment.getSubject(),
                appointment.getMentor().getFirstName() + " " + appointment.getMentor().getLastName(),
                appointment.getFounder().getFirstName() + " " + appointment.getFounder().getLastName()
        );
    }
}
