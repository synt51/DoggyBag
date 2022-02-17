package de.neuefische.backend.service;

import de.neuefische.backend.model.AppointmentCreationDTO;
import de.neuefische.backend.model.Appointment;
import de.neuefische.backend.model.UserMongo;
import de.neuefische.backend.repo.AppointmentsRepository;
import org.apache.juli.logging.Log;
import org.apache.juli.logging.LogFactory;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AppointmentsService {

    private static final Log LOG = LogFactory.getLog(AppointmentsService.class);
    private final AppointmentsRepository appointmentsRepository;

    public AppointmentsService(AppointmentsRepository appointmentsRepository) {
        this.appointmentsRepository = appointmentsRepository;
    }

    public List<Appointment> getAppointmentsOfUser(UserMongo userMongo){
        LOG.info("Loading " + userMongo.getUsername() + "'s appointments");
        return appointmentsRepository.findAllByUsername(userMongo.getUsername());
    }

    public Appointment createAppointment(@Validated AppointmentCreationDTO data, String username){
        final Appointment appointment = Appointment.newAppointment(username, data.getAppointmentName(), LocalDateTime.now(), data.getEndDate());

        LOG.info("New Appointment created...");
        LOG.info("Creator: { " + appointment.getUsername() + " }");
        LOG.info("Appointment Name: { " + appointment.getAppointmentName() + " }");
        LOG.info("Creation Date: { " + LocalDateTime.now() + " }");
        LOG.info("Due to: { " + appointment.getEndDate() + " }");
        return appointmentsRepository.insert(appointment);
    }

    public void deleteAppointment(String id) {
        if(appointmentsRepository.existsById(id)){
            appointmentsRepository.deleteById(id);
        }
    }
}
