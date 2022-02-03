package de.neuefische.backend;

import de.neuefische.backend.model.UserMongo;
import de.neuefische.backend.repo.MongoUserRepository;
import de.neuefische.backend.service.MongoUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@SpringBootApplication
public class BackendApplication {


    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

}
