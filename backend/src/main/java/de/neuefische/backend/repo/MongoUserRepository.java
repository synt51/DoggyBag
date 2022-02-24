package de.neuefische.backend.repo;

import de.neuefische.backend.model.UserMongo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MongoUserRepository extends MongoRepository<UserMongo, String> {
    UserMongo findByUsername(String username);
}
