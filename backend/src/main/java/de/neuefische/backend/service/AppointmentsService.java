package de.neuefische.backend.service;

import de.neuefische.backend.BackendApplication;
import de.neuefische.backend.model.AppointmentCreationDTO;
import de.neuefische.backend.model.Appointments;
import de.neuefische.backend.repo.AppointmentsRepository;
import org.apache.juli.logging.Log;
import org.apache.juli.logging.LogFactory;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AppointmentsService {

    private static final Log LOG = LogFactory.getLog(BackendApplication.class);
    private final AppointmentsRepository appointmentsRepository;

    public AppointmentsService(AppointmentsRepository appointmentsRepository) {
        this.appointmentsRepository = appointmentsRepository;
    }

    public List<Appointments> getAll() {
        return appointmentsRepository.findAll();
    }

    public Appointments createAppointment(@Validated AppointmentCreationDTO data, String username){
        final Appointments appointment = Appointments.newAppointment(username, data.getAppointmentName(), LocalDateTime.now(), data.getEndDate());

        LOG.info("New Appointment created...");
        LOG.info("Creator: { " + appointment.getUsername() + " }");
        LOG.info("Appointment Name: { " + appointment.getAppointmentName() + " }");
        LOG.info("Creation Date: { " + LocalDateTime.now() + " }");
        LOG.info("Due to: { " + appointment.getEndDate() + " }");
        return appointmentsRepository.insert(appointment);
    }
}
