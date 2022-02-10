package de.neuefische.backend.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BagPlacesDTO {

    private String id;
    private String username;
    @JsonFormat(pattern="dd-MM-yyyy HH:mm")
    private LocalDateTime creationDate;
    private double lat;
    private double lng;
}
