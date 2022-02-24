package de.neuefische.backend.controller;

import de.neuefische.backend.model.UserDto;
import de.neuefische.backend.service.MongoUserDetailsService;
import de.neuefische.backend.service.RegisterService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.Collection;


@RestController
@RequestMapping("/api")
public class UserController {

    private final RegisterService registerService;


    public UserController(RegisterService registerService) {
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
            return "Access denied! Permission is missing!";
        }
    }

    @PostMapping("/register")
    public void register(@RequestBody UserDto userDto){
        try {
            registerService.registerUser(userDto);
        } catch (AuthenticationException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User already exists.");
        }
    }

}
