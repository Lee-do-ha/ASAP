package com.ssafy.project.asap.redis.controller;

import com.ssafy.project.asap.global.exception.CustomException;
import com.ssafy.project.asap.redis.service.RedisService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/redis")
public class RedisController {

    private final RedisService redisService;

    @GetMapping("/test")
    public ResponseEntity<?> getCount(Authentication authentication){

        return ResponseEntity.ok(redisService.getCount(authentication.getName()));

    }

}
