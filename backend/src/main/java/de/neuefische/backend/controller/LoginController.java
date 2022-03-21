package de.neuefische.backend.controller;

import de.neuefische.backend.model.LoginData;
import de.neuefische.backend.service.JWTUtils;
import org.apache.coyote.Response;
import org.apache.juli.logging.Log;
import org.apache.juli.logging.LogFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.*;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Objects;

@RestController
@RequestMapping("auth/login")
public class LoginController {

    private static final Log LOG = LogFactory.getLog(LoginController.class);
    public static final String ERROR_TXT_LOGIN_DATA_NULL = "loginData must not be null.";
    public static final String ERROR_TXT_LOGIN_DATA_INVALID_CREDENTIALS = "invalid credentials";
    public static final String ERROR_TXT_ACCOUNT_DISABLED = "account disabled";
    public static final String ERROR_TXT_LOCKED_ACCOUNT = "locked account";

    private final AuthenticationManager authenticationManager;
    private final JWTUtils jwtService;

    public LoginController(AuthenticationManager authenticationManager, JWTUtils jwtService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @PostMapping
    public String login(@RequestBody LoginData loginData) {
        validate(loginData);
        try {

            var token = new UsernamePasswordAuthenticationToken(loginData.getUsername(), loginData.getPassword());
            authenticationManager.authenticate(token);
            LOG.info("User " + loginData.getUsername() + " is logged in.");
            return jwtService.createToken(new HashMap<>(), loginData.getUsername());
        } catch (AuthenticationException e) {
            if (e instanceof BadCredentialsException) {
                LOG.warn("Username and/or password is invalid. Try again.");
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, ERROR_TXT_LOGIN_DATA_INVALID_CREDENTIALS);
            }
            if (e instanceof DisabledException) {
                LOG.warn("Account is disabled. Please contact admin.");
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, ERROR_TXT_ACCOUNT_DISABLED);
            }
            if (e instanceof LockedException) {
                LOG.warn("Account is probably logged in on multiple devices. Please try again later.");
                throw new ResponseStatusException(HttpStatus.LOCKED, ERROR_TXT_LOCKED_ACCOUNT);
            }
            LOG.error(String.format("Authentication failed with unknown reason: %s", e.getMessage()));
            throw e;

        }
    }

    private void validate(LoginData loginData) {
        if(loginData == null){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, ERROR_TXT_LOGIN_DATA_NULL);
        }
    }
}