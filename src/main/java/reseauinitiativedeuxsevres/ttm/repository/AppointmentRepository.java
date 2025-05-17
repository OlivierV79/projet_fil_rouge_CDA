package reseauinitiativedeuxsevres.ttm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import reseauinitiativedeuxsevres.ttm.entity.Appointment;
import reseauinitiativedeuxsevres.ttm.entity.Member;

import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    List<Appointment> findByMentorOrFounder(Member mentor, Member founder);

}
