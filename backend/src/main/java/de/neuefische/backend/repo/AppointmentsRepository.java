package de.neuefische.backend.repo;

import de.neuefische.backend.model.Appointments;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentsRepository extends MongoRepository<Appointments, String> {

    List<Appointments> findAllByUsername(String username);
}
