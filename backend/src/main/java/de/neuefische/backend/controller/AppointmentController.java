package de.neuefische.backend.controller;

import de.neuefische.backend.model.AppointmentCreationDTO;
import de.neuefische.backend.model.Appointments;
import de.neuefische.backend.service.AppointmentsService;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("api/appointments")
public class AppointmentController {

    private final AppointmentsService appointmentsService;

    public AppointmentController(AppointmentsService appointmentsService) {
        this.appointmentsService = appointmentsService;
    }

    @GetMapping
    public List<Appointments> getAllAppointments() {
        return appointmentsService.getAll();
    }

    @PostMapping
    public Appointments createAppointment(Principal principal, @RequestBody AppointmentCreationDTO appointmentCreationDTO){
        return appointmentsService.createAppointment(appointmentCreationDTO, principal.getName());
    }
}
