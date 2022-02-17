package de.neuefische.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document("appointments")
public class Appointment {

    @Id
    private String id;
    private String username;
    private String appointmentName;
    private LocalDateTime creationDate;
    private Instant endDate;

    public static Appointment newAppointment (String username, String appointmentName, LocalDateTime creationDate, Instant endDate){
        return Appointment.builder()
                .username(username)
                .appointmentName(appointmentName)
                .creationDate(creationDate)
                .endDate(endDate)
                .build();
    }
}
