package de.neuefische.backend.service;

import de.neuefische.backend.BackendApplication;
import de.neuefische.backend.model.UserDto;
import de.neuefische.backend.model.UserMongo;
import de.neuefische.backend.repo.MongoUserRepository;
import org.apache.juli.logging.Log;
import org.apache.juli.logging.LogFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class RegisterService {

    private static final Log LOG = LogFactory.getLog(BackendApplication.class);
    private final PasswordEncoder encoder;
    private final MongoUserRepository repository;


    public RegisterService(PasswordEncoder encoder, MongoUserRepository repository) {
        this.encoder = encoder;
        this.repository = repository;
    }

    public void registerUser(@Validated UserDto data){
        final String encodedPassword = encoder.encode(data.getPassword());
        final UserMongo userMongo = UserMongo.newUser(data.getUsername(), encodedPassword, data.getEmail(),
                 List.of(new SimpleGrantedAuthority("API_READWRITE")));
        try {
            repository.insert(userMongo);
        } catch (Exception e){
            LOG.info("User already exists.");
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username already exists.");
        }
    }
}
