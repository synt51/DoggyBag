package de.neuefische.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document("bagPlaces")
public class BagPlace {

    @Id
    private String id;
    private String username;
    private LocalDateTime creationDate;
    private double lat;
    private double lng;


    public static BagPlace newBagPlace(String username, LocalDateTime creationDate, double lat, double lng){
        return BagPlace.builder()
                .username(username)
                .creationDate(creationDate)
                .lat(lat)
                .lng(lng)
                .build();
    }
}
