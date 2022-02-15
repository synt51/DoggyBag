package de.neuefische.backend.controller;

import de.neuefische.backend.model.BagPlace;
import de.neuefische.backend.model.BagPlaceCreationDTO;
import de.neuefische.backend.service.BagPlacesService;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("api/bagplaces")
public class BagPlacesController {


    private final BagPlacesService bagPlacesService;

    public BagPlacesController(BagPlacesService bagPlacesService) {
        this.bagPlacesService = bagPlacesService;
    }

    @GetMapping
    public List<BagPlace> getAllBagPlaces(){
        return bagPlacesService.getAll();
    }

    @PostMapping
    public BagPlace createBagPlaces(Principal principal, @RequestBody BagPlaceCreationDTO bagPlaceCreationDTO){
        return bagPlacesService.createBagPlace(bagPlaceCreationDTO, principal.getName());
    }
}
