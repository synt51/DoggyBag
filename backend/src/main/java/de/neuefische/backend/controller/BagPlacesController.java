package de.neuefische.backend.controller;

import de.neuefische.backend.model.BagPlaces;
import de.neuefische.backend.model.BagPlacesDTO;
import de.neuefische.backend.service.BagPlacesService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/bagplaces")
public class BagPlacesController {


    private final BagPlacesService bagPlacesService;

    public BagPlacesController(BagPlacesService bagPlacesService) {
        this.bagPlacesService = bagPlacesService;
    }

    @GetMapping
    public List<BagPlaces> getAllBagPlaces(){
        return bagPlacesService.getAll();
    }

    @PostMapping
    public void createBagPlaces(@RequestBody BagPlacesDTO bagPlacesDTO){
        bagPlacesService.createBagPlace(bagPlacesDTO);
    }
}
