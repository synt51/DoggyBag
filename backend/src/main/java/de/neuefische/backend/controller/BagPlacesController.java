package de.neuefische.backend.controller;

import de.neuefische.backend.model.BagPlace;
import de.neuefische.backend.model.BagPlaceCreationDTO;
import de.neuefische.backend.model.UserMongo;
import de.neuefische.backend.service.BagPlacesService;
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
@RequestMapping("api/bagplaces")
public class BagPlacesController {

    private static final Log LOG = LogFactory.getLog(BagPlacesController.class);
    private final BagPlacesService bagPlacesService;
    private final MongoUserDetailsService mongoUserDetailsService;

    public BagPlacesController(BagPlacesService bagPlacesService, MongoUserDetailsService mongoUserDetailsService) {
        this.bagPlacesService = bagPlacesService;
        this.mongoUserDetailsService = mongoUserDetailsService;
    }

    private UserMongo getUser (Principal principal) throws ResponseStatusException {
        try {
            return mongoUserDetailsService.getUserByPrincipal(principal);
        } catch (UsernameNotFoundException e) {
            LOG.warn("User not found");
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User not found");
        }
    }

    @GetMapping
    public List<BagPlace> getAllBagPlaces(){
        return bagPlacesService.getAll();
    }

    @GetMapping
    public List<BagPlace> getBagPlacesOfUser(Principal principal){
        UserMongo user = getUser(principal);
        return bagPlacesService.getBagPlacesOfUser(user);
    }

    @PostMapping
    public BagPlace createBagPlaces(Principal principal, @RequestBody BagPlaceCreationDTO bagPlaceCreationDTO){
        return bagPlacesService.createBagPlace(bagPlaceCreationDTO, principal.getName());
    }
}
