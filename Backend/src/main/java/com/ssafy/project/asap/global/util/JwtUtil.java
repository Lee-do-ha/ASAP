package com.ssafy.project.asap.global.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.security.Key;
import java.util.Date;

@Slf4j
@RequiredArgsConstructor
public class JwtUtil {

    public static String createToken(String id, Key key, Long accessExpiration){

        Claims claims = Jwts.claims();
        claims.put("id", id);

        log.info("id = " + id);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + accessExpiration))
                .signWith(key)
                .compact();
    }

    public static boolean isExpired(String token, Key key){

//        log.info(String.valueOf(Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJwt(token).getBody().getExpiration()));

        log.error("exp = " + Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().getExpiration());

        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().getExpiration().before(new Date(System.currentTimeMillis()));

    }

    public static String getId(String token, Key key){

        return (String) Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().get("id");

    }

}
