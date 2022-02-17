package de.neuefische.backend.controller;

import de.neuefische.backend.model.AppointmentCreationDTO;
import de.neuefische.backend.model.Appointment;
import de.neuefische.backend.model.UserMongo;
import de.neuefische.backend.service.AppointmentsService;
import de.neuefische.backend.service.MongoUserDetailsService;
import org.apache.juli.logging.Log;
import org.apache.juli.logging.LogFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("api/appointments")
public class AppointmentController {

    private static final Log LOG = LogFactory.getLog(AppointmentController.class);
    private final AppointmentsService appointmentsService;
    private final MongoUserDetailsService mongoUserDetailsService;

    public AppointmentController(AppointmentsService appointmentsService, MongoUserDetailsService mongoUserDetailsService) {
        this.appointmentsService = appointmentsService;
        this.mongoUserDetailsService = mongoUserDetailsService;
    }

    private UserMongo getUser (Principal principal) throws ResponseStatusException{
        try {
            return mongoUserDetailsService.getUserByPrincipal(principal);
        } catch (UsernameNotFoundException e) {
            LOG.warn("User not found");
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User not found");
        }
    }

    @GetMapping
    public List<Appointment> getAppointmentsOfUser(Principal principal){
        UserMongo user = getUser(principal);
        return appointmentsService.getAppointmentsOfUser(user);
    }

    @PostMapping
    public Appointment createAppointment(Principal principal, @RequestBody AppointmentCreationDTO appointmentCreationDTO){
        return appointmentsService.createAppointment(appointmentCreationDTO, principal.getName());
    }

    @DeleteMapping("/{id}")
    public void deleteAppointment(@PathVariable String id) {
        appointmentsService.deleteAppointment(id);
    }
}
