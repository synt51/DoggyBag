package de.neuefische.backend.repo;

import de.neuefische.backend.model.Appointment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AppointmentsRepository extends MongoRepository<Appointment, String> {

    List<Appointment> findAllByUsername(String username);

    Optional<Appointment> findById(String id);
}
