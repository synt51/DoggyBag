package de.neuefische.backend.controller;

import de.neuefische.backend.service.MongoUserDetailsService;
import de.neuefische.backend.service.RegisterService;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.Collection;


@RestController
@RequestMapping("/api")
public class UserController {

    private final MongoUserDetailsService mongoUserDetailsService;
    private final RegisterService registerService;


    public UserController(MongoUserDetailsService mongoUserDetailsService, RegisterService registerService) {
        this.mongoUserDetailsService = mongoUserDetailsService;
        this.registerService = registerService;
    }

    @GetMapping
    public String getUser(Principal principal){
        String username = principal.getName();
        Collection<? extends GrantedAuthority> authorities =
                SecurityContextHolder.getContext().getAuthentication().getAuthorities();
        final boolean isAllowed =
                authorities.stream()
                        .anyMatch(g -> MongoUserDetailsService.AUTHORITY_API_READWRITE.equals(g.getAuthority()));

        if (isAllowed){
            return "Welcome " + username + ", hope you're doing fine.";
        } else {
            return "Access denied!!! Permission is missing!!!";
        }
    }
}
