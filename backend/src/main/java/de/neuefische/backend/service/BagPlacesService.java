package de.neuefische.backend.service;


import de.neuefische.backend.BackendApplication;
import de.neuefische.backend.model.BagPlaces;
import de.neuefische.backend.model.BagPlacesDTO;
import de.neuefische.backend.repo.BagPlacesRepository;
import org.apache.juli.logging.Log;
import org.apache.juli.logging.LogFactory;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.List;

@Service
public class BagPlacesService {

    private static final Log LOG = LogFactory.getLog(BackendApplication.class);
    private final BagPlacesRepository bagPlacesRepository;

    public BagPlacesService(BagPlacesRepository bagPlacesRepository) {
        this.bagPlacesRepository = bagPlacesRepository;
    }

    public List<BagPlaces> getAll(){
        return bagPlacesRepository.findAll();
    }

    public void createBagPlace(@Validated BagPlacesDTO data){
        final BagPlaces bagPlace = BagPlaces.newBagPlace(data.getId(), data.getUsername(), data.getCreationDate(), data.getLat(), data.getLng());
        try {
            bagPlacesRepository.insert(bagPlace);
            LOG.info("New BagPlace created...");
            LOG.info("ID: { " + bagPlace.getId() + " }");
            LOG.info("Creator: { " + bagPlace.getUsername() + " }");
            LOG.info("Creation Date: { " + bagPlace.getCreationDate() + " }");
            LOG.info("Latitude: { " + bagPlace.getLat() + " }");
            LOG.info("Longitude: { " + bagPlace.getLng() + " }");
        } catch (Exception e){
            LOG.info("Something went wrong!");
        }
    }
}
