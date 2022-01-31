package de.neuefische.backend.service;

import de.neuefische.backend.model.UserMongo;
import de.neuefische.backend.repo.MongoUserRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MongoUserDetailsService implements UserDetailsService {
    public static final String AUTHORITY_API_READWRITE = "API_READWRITE";
    private final MongoUserRepository repository;

    public MongoUserDetailsService(MongoUserRepository repository){
        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserMongo user = repository.findByUsername(username)
                .orElseThrow(()-> new UsernameNotFoundException("User " + username + " not found in DB..."));

        return new User(user.getUsername(), user.getPassword(), user.getAuthorities());
    }
}
