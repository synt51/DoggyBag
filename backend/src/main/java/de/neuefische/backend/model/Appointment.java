package de.neuefische.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Date;

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
    private Date endDate;

    public static Appointment newAppointment (String username, String appointmentName, LocalDateTime creationDate, Date endDate){
        return Appointment.builder()
                .username(username)
                .appointmentName(appointmentName)
                .creationDate(creationDate)
                .endDate(endDate)
                .build();
    }
}