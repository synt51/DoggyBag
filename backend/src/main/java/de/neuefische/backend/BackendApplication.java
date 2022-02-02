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
public class BackendApplication implements CommandLineRunner {

    @Autowired
    private MongoUserRepository repository;

    @Autowired
    private PasswordEncoder encoder;

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {

        //test add a user
        String encodedPassword = encoder.encode("heinz1234");
        repository.save(new UserMongo("heinz", encodedPassword, "heinz.test@test.de", List.of(new SimpleGrantedAuthority(MongoUserDetailsService.AUTHORITY_API_READWRITE))));
        encodedPassword = encoder.encode("heinz12345");
        repository.save(new UserMongo("heinz2", encodedPassword, "heinz.test@test.de", List.of(new SimpleGrantedAuthority(MongoUserDetailsService.AUTHORITY_API_READWRITE))));
        //test show user
        System.out.println("ALL USERS");
        System.out.println("-------------");
        System.out.println(repository.findAll());
    }
}
