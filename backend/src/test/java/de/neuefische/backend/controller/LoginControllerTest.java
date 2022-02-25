package de.neuefische.backend.controller;

import de.neuefische.backend.model.LoginData;
import de.neuefische.backend.model.UserMongo;
import de.neuefische.backend.repo.MongoUserRepository;
import de.neuefische.backend.service.MongoUserDetailsService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Optional;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.mockito.Mockito.*;
import static org.hamcrest.Matchers.is;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class LoginControllerTest {

    @LocalServerPort
    private int port;

    @MockBean
    private MongoUserRepository testRepository;

    @Autowired
    private PasswordEncoder testEncoder;

    private final WebClient testWebClient = WebClient.create();

    private UserMongo testUser(){
        return UserMongo.builder()
                .username("testUser")
                .password(testEncoder.encode("testPW"))
                .email("test@test.com")
                .authorities(List.of(new SimpleGrantedAuthority(MongoUserDetailsService.AUTHORITY_API_READWRITE)))
                .enabled(true)
                .accountNonExpired(true)
                .accountNonLocked(true)
                .credentialsNonExpired(true)
                .build();
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