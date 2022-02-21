package de.neuefische.backend.service;


import de.neuefische.backend.BackendApplication;
import de.neuefische.backend.model.BagPlace;
import de.neuefische.backend.model.BagPlaceCreationDTO;
import de.neuefische.backend.repo.BagPlacesRepository;
import org.apache.juli.logging.Log;
import org.apache.juli.logging.LogFactory;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BagPlacesService {

    private static final Log LOG = LogFactory.getLog(BackendApplication.class);
    private final BagPlacesRepository bagPlacesRepository;

    public BagPlacesService(BagPlacesRepository bagPlacesRepository) {
        this.bagPlacesRepository = bagPlacesRepository;
    }

    public List<BagPlace> getAll() {
        return bagPlacesRepository.findAll();
    }


    public BagPlace createBagPlace(@Validated BagPlaceCreationDTO data, String username) {
        final BagPlace bagPlace = BagPlace.newBagPlace(username, LocalDateTime.now(), data.getLat(), data.getLng());

        LOG.info("New BagPlace created...");
        LOG.info("Creator: { " + bagPlace.getUsername() + " }");
        LOG.info("Creation Date: { " + LocalDateTime.now() + " }");
        LOG.info("Latitude: { " + bagPlace.getLat() + " }");
        LOG.info("Longitude: { " + bagPlace.getLng() + " }");
        return bagPlacesRepository.insert(bagPlace);
        
    }
}
