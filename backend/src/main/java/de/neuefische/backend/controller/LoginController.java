package de.neuefische.backend.controller;

import de.neuefische.backend.model.LoginData;
import de.neuefische.backend.service.JWTUtils;
import org.apache.juli.logging.Log;
import org.apache.juli.logging.LogFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;

@RestController
@RequestMapping("auth/login")
public class LoginController {

    private static final Log LOG = LogFactory.getLog(LoginController.class);

    private final AuthenticationManager authenticationManager;
    private final JWTUtils jwtService;

    public LoginController(AuthenticationManager authenticationManager, JWTUtils jwtService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @PostMapping
    public String login(@RequestBody LoginData loginData){
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginData.getUsername(), loginData.getPassword())
            );
            LOG.info("User " + loginData.getUsername() + " is logged in.");
            return jwtService.createToken(new HashMap<>(), loginData.getUsername());
        } catch (AuthenticationException e){
            LOG.warn("Username and/or password is invalid. Try again.");
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "invalid credentials");
        }
    }
}
