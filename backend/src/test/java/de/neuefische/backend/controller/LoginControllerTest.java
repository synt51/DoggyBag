package de.neuefische.backend.controller;

import de.neuefische.backend.model.LoginData;
import de.neuefische.backend.model.UserMongo;
import de.neuefische.backend.repo.MongoUserRepository;
import de.neuefische.backend.service.JWTUtils;
import de.neuefische.backend.service.MongoUserDetailsService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.server.ResponseStatusException;

import javax.naming.AuthenticationNotSupportedException;
import java.util.List;
import java.util.Optional;

import static de.neuefische.backend.controller.LoginController.*;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.http.HttpStatus.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class LoginControllerTest {

    public static final String TEST_USER_USERNAME = "testUser";
    public static final String TEST_USER_MAIL = "test@test.com";
    public static final String TEST_USER_PASSWORD = "testPW";
    @LocalServerPort
    private int port;

    @MockBean
    private MongoUserRepository testRepository;

    @Autowired
    private PasswordEncoder testEncoder;

    private final WebClient testWebClient = WebClient.create();
    private LoginController controllerUnderTest;
    private AuthenticationManager authenticationManager;
    private JWTUtils jwtUtils;

    private UserMongo testUser(){
        return UserMongo.builder()
                .username(TEST_USER_USERNAME)
                .password(testEncoder.encode(TEST_USER_PASSWORD))
                .email(TEST_USER_MAIL)
                .authorities(List.of(new SimpleGrantedAuthority(MongoUserDetailsService.AUTHORITY_API_READWRITE)))
                .enabled(true)
                .accountNonExpired(true)
                .accountNonLocked(true)
                .credentialsNonExpired(true)
                .build();
    }

    @BeforeEach
    void setUp(){
        authenticationManager = Mockito.mock(AuthenticationManager.class);
        jwtUtils = Mockito.mock(JWTUtils.class);
        controllerUnderTest = new LoginController( authenticationManager, jwtUtils);
    }

    @Test
    void testLogin_BadRequestLoginDataNull(){
        var e =  assertThrows(ResponseStatusException.class, () -> controllerUnderTest.login(null));
        assertThat(e.getStatus(), is(BAD_REQUEST));
        assertThat(e.getReason(), is(ERROR_TXT_LOGIN_DATA_NULL));
    }

    @Test
    void testLogin_BadCredentialsLoginDataNotValid(){
        LoginData invalidLoginData = new LoginData("invalidName", "invalidPass");
        when(authenticationManager.authenticate(any())).thenThrow(BadCredentialsException.class);
        var e =  assertThrows(ResponseStatusException.class, () -> controllerUnderTest.login(invalidLoginData));
        assertThat(e.getStatus(), is(UNAUTHORIZED));
        assertThat(e.getReason(), is(ERROR_TXT_LOGIN_DATA_INVALID_CREDENTIALS));
    }

    @Test
    void testLogin_DisabledAccount(){
        LoginData disabledLoginData = new LoginData("disabledUsername", "disabledPass");
        when(authenticationManager.authenticate(any())).thenThrow(DisabledException.class);
        var e =  assertThrows(ResponseStatusException.class, () -> controllerUnderTest.login(disabledLoginData));
        assertThat(e.getStatus(), is(FORBIDDEN));
        assertThat(e.getReason(), is(ERROR_TXT_ACCOUNT_DISABLED));
    }

    @Test
    void testLogin_LockedAccount(){
        LoginData lockedLoginData = new LoginData("lockedUsername", "lockedPass");
        when(authenticationManager.authenticate(any())).thenThrow(LockedException.class);
        var e =  assertThrows(ResponseStatusException.class, () -> controllerUnderTest.login(lockedLoginData));
        assertThat(e.getStatus(), is(LOCKED));
        assertThat(e.getReason(), is(ERROR_TXT_LOCKED_ACCOUNT));
    }

    class TestUnknownAuthenticationException extends AuthenticationException{
        public TestUnknownAuthenticationException(String msg, Throwable cause) {
            super(msg, cause);
        }
    }

    @Test
    void testLogin_AuthenticationExceptionUnknownReason(){
        LoginData someLoginData = new LoginData("someUsername", "somePass");
        when(authenticationManager.authenticate(any())).thenThrow(TestUnknownAuthenticationException.class);
        var e =  assertThrows(TestUnknownAuthenticationException.class, () -> controllerUnderTest.login(someLoginData));
    }

    @Test
    @DisplayName("Token should not be null with valid credentials.")
    void loginGetNotNullTokenWithValidCredentials() {
        when(testRepository.findByUsername("testUser")).thenReturn(Optional.of(testUser()));

        LoginData loginData = new LoginData("testUser", "testPW");

        ResponseEntity<String> login = testWebClient.post()
                .uri("http://localhost:" + port + "/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(loginData)
                .retrieve()
                .toEntity(String.class)
                .block();

        String token = login.getBody();

        ResponseEntity<String> getHello = testWebClient.get()
                .uri("http://localhost:" + port + "/api")
                .header("Authorization","Bearer"+token)
                .retrieve()
                .toEntity(String.class)
                .block();

        assertThat(getHello.getStatusCode(),is(HttpStatus.OK));
        assertThat(getHello.getBody(),is("Welcome testUser, hope you're doing fine."));
    }
}