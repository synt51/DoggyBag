package de.neuefische.backend.service;

import de.neuefische.backend.model.UserMongo;
import de.neuefische.backend.repo.MongoUserRepository;
import org.apache.juli.logging.Log;
import org.apache.juli.logging.LogFactory;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
public class MongoUserDetailsService implements UserDetailsService {
    public static final String AUTHORITY_API_READWRITE = "API_READWRITE";
    private static final Log LOG = LogFactory.getLog(MongoUserDetailsService.class);
    private final MongoUserRepository repository;

    public MongoUserDetailsService(MongoUserRepository repository){
        this.repository = repository;
    }

    @Override
    public UserMongo loadUserByUsername(String username) throws UsernameNotFoundException {
        UserMongo user = repository.findByUsername(username)
                .orElseThrow(()-> new UsernameNotFoundException("User " + username + " not found in DB..."));
        return user;
    }

    public UserMongo getUserByPrincipal(Principal principal) throws UsernameNotFoundException {
        if (principal != null) {
            return loadUserByUsername(principal.getName());
        }
        LOG.warn("Principal is null");
        throw new UsernameNotFoundException("Principal is null");
    }
}
