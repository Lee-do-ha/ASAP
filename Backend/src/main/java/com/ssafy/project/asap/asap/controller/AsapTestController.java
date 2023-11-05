package com.ssafy.project.asap.asap.controller;

import com.ssafy.project.asap.asap.domain.request.LocalSearch;
import com.ssafy.project.asap.member.service.MemberService;
import com.ssafy.project.asap.redis.service.RedisService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.Collections;

@RestController
@RequestMapping("/api/v1/test")
@RequiredArgsConstructor
@Slf4j
public class AsapTestController {

    private final MemberService memberService;
    private final RedisService redisService;
    @Value("${server.test-header}")
    private String testHeader;

    @PostMapping("/local/search/address.json")
    public ResponseEntity<?> LocalSearch(@RequestBody LocalSearch request, Authentication authentication){

        log.info("LOCALSEARCH START");

        log.info(request.toString());

        Long id = memberService.findById(authentication.getName()).getWalletId();

        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.put("query", Collections.singletonList(request.getQuery()));
        map.put("analyze_type", Collections.singletonList(request.getAnalyze_type()));

        if(request.getPage() != 0){
            map.put("page", Collections.singletonList(String.valueOf(request.getPage())));
        }

        if(request.getSize() != 0){
            map.put("size", Collections.singletonList(String.valueOf(request.getSize())));
        }

        URI uri = UriComponentsBuilder
                .fromUriString("https://j9c202.p.ssafy.io")
                .path("/block/api/v1/asap/local/search/" + id + "/23")
                .queryParams(map)
                .encode()
                .build()
                .toUri();

        log.info(uri.toString());

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set(HttpHeaders.AUTHORIZATION, testHeader); // 이 부분에서 헤더를 설정합니다.

            HttpEntity<?> httpEntity = new HttpEntity<>(headers);

            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<?> responseEntity = restTemplate.exchange(uri, HttpMethod.GET, httpEntity, JSONObject.class);

            redisService.setCount(authentication.getName());

            return ResponseEntity.ok(responseEntity.getBody());

        } catch (Exception e) {
            log.info(e.getMessage());
            return ResponseEntity.ok(e.getMessage());
        }

    }

}
