package de.neuefische.backend.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.Date;
import java.util.Map;

@Service
public class JWTUtils {

    static final String SECRET = "testingSecretWillBeChangedLater"; //todo change secret

    public String createToken(Map<String, Object> claims, String subject){
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(Date.from(Instant.now()))
                .setExpiration(Date.from(Instant.now().plus(Duration.ofHours(12))))
                .signWith(SignatureAlgorithm.HS256, SECRET)
                .compact();
    }

    public String extractUserName(String token){
        Claims claims = extractAllClaims(token);
        return claims.getSubject();
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody();
    }

    private Boolean isTokenExpired(String token){
        Claims claims = extractAllClaims(token);
        return claims.getExpiration().before(new Date());
    }
    public Boolean validateToken(String token, String username){
        String userName = extractUserName(token);
        return (userName.equals(username) && !isTokenExpired(token));
    }
}
