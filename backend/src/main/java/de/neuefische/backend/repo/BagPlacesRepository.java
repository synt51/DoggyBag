package de.neuefische.backend.repo;

import de.neuefische.backend.model.BagPlaces;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BagPlacesRepository extends MongoRepository<BagPlaces, String> {

}
