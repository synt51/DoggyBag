package de.neuefische.backend.repo;

import de.neuefische.backend.model.BagPlace;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BagPlacesRepository extends MongoRepository<BagPlace, String> {

    List<BagPlace> findAllByUsername(String username);

}
