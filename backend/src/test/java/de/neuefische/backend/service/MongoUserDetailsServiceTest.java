package de.neuefische.backend.service;

import de.neuefische.backend.model.UserMongo;
import de.neuefische.backend.repo.MongoUserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class MongoUserDetailsServiceTest {

    private final MongoUserRepository testRepository = mock(MongoUserRepository.class);
    private final MongoUserDetailsService testService = new MongoUserDetailsService(testRepository);

    @Test
    void shouldReturnUser() {
        UserMongo user = UserMongo.builder().username("TestUser").password("TestPasswword").email("test@test.com")
                .authorities(List.of()).enabled(true).accountNonExpired(true).accountNonLocked(true)
                .credentialsNonExpired(true).build();

        when(testRepository.findByUsername(anyString())).thenReturn(user);

        assertEquals(user, testService.loadUserByUsername(""));
    }

    @Test
    void shouldThrowExceptionIfUserIsNull(){
        when(testRepository.findByUsername(anyString())).thenReturn(null);

        assertThrows(UsernameNotFoundException.class, () -> testService.loadUserByUsername(""));
    }

    @Test
    void shouldReturnPrincipal() {
        Principal principal = mock(Principal.class);
        UserMongo actualUser = UserMongo.builder().username("TestUser").password("TestPasswword").email("test@test.com")
                .authorities(List.of()).enabled(true).accountNonExpired(true).accountNonLocked(true)
                .credentialsNonExpired(true).build();

        when(principal.getName()).thenReturn(actualUser.getUsername());
        when(testRepository.findByUsername(anyString())).thenReturn(actualUser);

        UserMongo user = testService.getUserByPrincipal(principal);

        assertEquals(actualUser, user);
    }

    @Test
    void shouldThrowExceptionIfPrincipalIsNull(){
        assertThrows(UsernameNotFoundException.class, () -> testService.getUserByPrincipal(null));
    }
}