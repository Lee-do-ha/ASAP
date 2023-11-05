package com.ssafy.project.asap.asap.controller;

import com.ssafy.project.asap.asap.domain.request.KoGptRequest;
import com.ssafy.project.asap.member.entity.domain.Member;
import com.ssafy.project.asap.member.service.MemberService;
import com.ssafy.project.asap.purpose.service.PurposeService;
import com.ssafy.project.asap.redis.service.RedisService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.Objects;

@RestController
@RequestMapping("/api/v1/asap")
@RequiredArgsConstructor
@Slf4j
public class AsapKoGptController {

    private final MemberService memberService;
    private final PurposeService purposeService;
    private final RedisService redisService;
    @Value("${server.allow-header}")
    private String allowHeader;
    @Value("${server.test-header}")
    private String testHeader;

    @PostMapping("/kogpt/generation")
    public ResponseEntity<?> koGptGeneration(@RequestBody KoGptRequest koGptRequest, HttpServletRequest httpServletRequest) {

        log.info("HttpHeaders.AUTHORIZATION = " + httpServletRequest.getHeader(HttpHeaders.AUTHORIZATION));

        Member member = memberService.findMemberByWallet(httpServletRequest.getHeader(HttpHeaders.AUTHORIZATION));
        if (koGptRequest.getTest().equals("asap")) {
            log.info("어딘가에 기록");
        } else {
            purposeService.checkApplyByApiIdAndMemberId(30L, member.getMemberId());
        }

        URI uri = UriComponentsBuilder
                .fromUriString("https://j9c202.p.ssafy.io/block")
//                .fromUriString("http://localhost:9001")
                .path("/api/v1/asap/kogpt/generation/" + member.getWalletId() + "/30")
                .encode()
                .build()
                .toUri();

        return commonForm(uri, koGptRequest, httpServletRequest);
    }

    public ResponseEntity<?> commonForm(URI uri, KoGptRequest koGptRequest, HttpServletRequest httpServletRequest) {

        try {
            HttpHeaders headers = new HttpHeaders();
            if (koGptRequest.getTest().equals("asap")) {
                log.info("테스트로 진행");

                String id = memberService.findMemberByWallet(httpServletRequest.getHeader(HttpHeaders.AUTHORIZATION)).getId();
                redisService.setCount(id);

                headers.set(HttpHeaders.AUTHORIZATION, testHeader);
            } else {
                headers.set(HttpHeaders.AUTHORIZATION, allowHeader); // 이 부분에서 헤더를 설정합니다.
            }

            HttpEntity<?> httpEntity = new HttpEntity<>(koGptRequest, headers);

            RestTemplate restTemplate = new RestTemplate();

            ResponseEntity<?> responseEntity = restTemplate.exchange(uri, HttpMethod.POST, httpEntity, Object.class);
            if (Objects.requireNonNull(responseEntity.getBody()).toString().startsWith("{status")) {
                return ResponseEntity.status(Integer.parseInt(responseEntity.getBody().toString().substring(8, 11))).body(responseEntity.getBody());
            }
            return ResponseEntity.ok(responseEntity.getBody());

        } catch (Exception e) {
            log.info(e.getMessage());
            return ResponseEntity.ok(e.getMessage());
        }
    }
}
