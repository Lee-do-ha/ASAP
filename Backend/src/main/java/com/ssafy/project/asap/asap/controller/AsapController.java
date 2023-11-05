package com.ssafy.project.asap.asap.controller;

import com.ssafy.project.asap.api.entity.domain.Api;
import com.ssafy.project.asap.api.entity.domain.ApiMethod;
import com.ssafy.project.asap.api.repository.ApiRepository;
import com.ssafy.project.asap.asap.domain.request.LocalSearch;
import com.ssafy.project.asap.global.exception.CustomException;
import com.ssafy.project.asap.global.exception.ErrorCode;
import com.ssafy.project.asap.member.entity.domain.Member;
import com.ssafy.project.asap.member.service.MemberService;
import com.ssafy.project.asap.purpose.service.PurposeService;
import com.ssafy.project.asap.redis.service.RedisService;
import jakarta.servlet.http.HttpServletRequest;
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
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/api/v1/asap")
@RequiredArgsConstructor
@Slf4j
public class AsapController {

    private final MemberService memberService;
    private final ApiRepository apiRepository;
    private final PurposeService purposeService;
    private final RedisService redisService;
    @Value("${server.allow-header}")
    private String allowHeader;
    @Value("${server.test-header}")
    private String testHeader;


    // https://j9c202.p.ssafy.io/block/api/v1/asap/local/search.address.json
    @GetMapping("/local/search/address")
    public ResponseEntity<?> addressSearch(@RequestParam MultiValueMap<String, String> param, HttpServletRequest httpServletRequest, Authentication authentication) {

        log.info("HttpHeaders.AUTHORIZATION = " + httpServletRequest.getHeader(HttpHeaders.AUTHORIZATION));

        Member member = memberService.findMemberByWallet(httpServletRequest.getHeader(HttpHeaders.AUTHORIZATION));
        if (param.containsKey("test") && param.get("test").toString().equals("[asap]")) {
            log.info("어딘가에 기록");
        } else {
            purposeService.checkApplyByApiIdAndMemberId(23L, member.getMemberId());
        }

        URI uri = UriComponentsBuilder
                .fromUriString("https://j9c202.p.ssafy.io/block")
                .path("/api/v1/asap/local/search/keyword/" + member.getWalletId() + "/23")
                .queryParams(param)
                .encode()
                .build()
                .toUri();

        return commonForm(uri, param, httpServletRequest);
    }

    @GetMapping("/local/search/keyword")
    public ResponseEntity<?> KeywordSearch(@RequestParam MultiValueMap<String, String> param, HttpServletRequest httpServletRequest, Authentication authentication) {

        log.info("HttpHeaders.AUTHORIZATION = " + httpServletRequest.getHeader(HttpHeaders.AUTHORIZATION));

        Member member = memberService.findMemberByWallet(httpServletRequest.getHeader(HttpHeaders.AUTHORIZATION));
        if (param.containsKey("test") && param.get("test").toString().equals("[asap]")) {
            log.info("어딘가에 기록");
        } else {
            purposeService.checkApplyByApiIdAndMemberId(28L, member.getMemberId());
        }

        URI uri = UriComponentsBuilder
                .fromUriString("https://j9c202.p.ssafy.io/block")
                .path("/api/v1/asap/local/search/keyword/" + member.getWalletId() + "/28")
                .queryParams(param)
                .encode()
                .build()
                .toUri();

        return commonForm(uri, param, httpServletRequest);
    }

    @GetMapping("/local/search/category")
    public ResponseEntity<?> CategorySearch(@RequestParam MultiValueMap<String, String> param, HttpServletRequest httpServletRequest, Authentication authentication) throws IllegalAccessException {

        log.info("HttpHeaders.AUTHORIZATION = " + httpServletRequest.getHeader(HttpHeaders.AUTHORIZATION));

        Member member = memberService.findMemberByWallet(httpServletRequest.getHeader(HttpHeaders.AUTHORIZATION));
        if (param.containsKey("test") && param.get("test").toString().equals("[asap]")) {
            log.info("어딘가에 기록");
        } else {
            purposeService.checkApplyByApiIdAndMemberId(29L, member.getMemberId());
        }

        URI uri = UriComponentsBuilder
                .fromUriString("https://j9c202.p.ssafy.io/block")
                .path("/api/v1/asap/local/search/category/" + member.getWalletId() + "/29")
                .queryParams(param)
                .encode()
                .build()
                .toUri();

        return commonForm(uri, param, httpServletRequest);
    }

    @GetMapping("/web/search")
    public ResponseEntity<?> kakaoWebSearch(@RequestParam MultiValueMap<String, String> param, HttpServletRequest httpServletRequest, Authentication authentication) {

        log.info("HttpHeaders.AUTHORIZATION = " + httpServletRequest.getHeader(HttpHeaders.AUTHORIZATION));

        Member member = memberService.findMemberByWallet(httpServletRequest.getHeader(HttpHeaders.AUTHORIZATION));
        if (param.containsKey("test") && param.get("test").toString().equals("[asap]")) {
            log.info("어딘가에 기록");
        } else {
            purposeService.checkApplyByApiIdAndMemberId(31L, member.getMemberId());
        }

        URI uri = UriComponentsBuilder
                .fromUriString("https://j9c202.p.ssafy.io/block")
//                .fromUriString("http://localhost:9001")
                .path("/api/v1/asap/web/search/" + member.getWalletId() + "/31")
                .queryParams(param)
                .encode()
                .build()
                .toUri();

        return commonForm(uri, param, httpServletRequest);
    }

    @GetMapping("/image/search")
    public ResponseEntity<?> kakaoImageSearch(@RequestParam MultiValueMap<String, String> param, HttpServletRequest httpServletRequest, Authentication authentication) {

        log.info("HttpHeaders.AUTHORIZATION = " + httpServletRequest.getHeader(HttpHeaders.AUTHORIZATION));
        log.info("URI = " + httpServletRequest.getRequestURI());
        Api api = apiRepository.findByApiAndMethod(String.valueOf("https://j9c202.p.ssafy.io"+ httpServletRequest.getRequestURI()), ApiMethod.GET).orElseThrow();

        Member member = memberService.findMemberByWallet(httpServletRequest.getHeader(HttpHeaders.AUTHORIZATION));
        if (param.containsKey("test") && param.get("test").toString().equals("[asap]")) {
            log.info("어딘가에 기록");
        } else {
            purposeService.checkApplyByApiIdAndMemberId(api.getApiId(), member.getMemberId());
        }

        URI uri = UriComponentsBuilder
                .fromUriString("https://j9c202.p.ssafy.io/block")
//                .fromUriString("http://localhost:9001")
                .path("/api/v1/asap/image/search/" + member.getWalletId() + "/" + api.getApiId())
                .queryParams(param)
                .encode()
                .build()
                .toUri();

        return commonForm(uri, param, httpServletRequest);
    }

    @GetMapping("/book/search")
    public ResponseEntity<?> kakaoBookSearch(@RequestParam MultiValueMap<String, String> param, HttpServletRequest httpServletRequest, Authentication authentication) {

        log.info("HttpHeaders.AUTHORIZATION = " + httpServletRequest.getHeader(HttpHeaders.AUTHORIZATION));

        Member member = memberService.findMemberByWallet(httpServletRequest.getHeader(HttpHeaders.AUTHORIZATION));
        if (param.containsKey("test") && param.get("test").toString().equals("[asap]")) {
            log.info("어딘가에 기록");
        } else {
            purposeService.checkApplyByApiIdAndMemberId(33L, member.getMemberId());
        }

        URI uri = UriComponentsBuilder
                .fromUriString("https://j9c202.p.ssafy.io/block")
//                .fromUriString("http://localhost:9001")
                .path("/api/v1/asap/book/search/" + member.getWalletId() + "/33")
                .queryParams(param)
                .encode()
                .build()
                .toUri();

        return commonForm(uri, param, httpServletRequest);
    }

    @GetMapping("/mobility/directions")
    public ResponseEntity<?> kakaoMobilityDirections(@RequestParam MultiValueMap<String, String> param, HttpServletRequest httpServletRequest, Authentication authentication) {

        log.info("HttpHeaders.AUTHORIZATION = " + httpServletRequest.getHeader(HttpHeaders.AUTHORIZATION));

        Member member = memberService.findMemberByWallet(httpServletRequest.getHeader(HttpHeaders.AUTHORIZATION));
        if (param.containsKey("test") && param.get("test").toString().equals("[asap]")) {
            log.info("어딘가에 기록");
        } else {
            purposeService.checkApplyByApiIdAndMemberId(34L, member.getMemberId());
        }

        URI uri = UriComponentsBuilder
                .fromUriString("https://j9c202.p.ssafy.io/block")
//                .fromUriString("http://localhost:9001")
                .path("/api/v1/asap/mobility/directions/" + member.getWalletId() + "/34")
                .queryParams(param)
                .encode()
                .build()
                .toUri();

        return commonForm(uri, param, httpServletRequest);
    }

    public ResponseEntity<?> commonForm(URI uri, MultiValueMap<String, String> param, HttpServletRequest httpServletRequest) {

        try {
            HttpHeaders headers = new HttpHeaders();
            if (param.containsKey("test") && param.get("test").toString().equals("[asap]")) {
                log.info("테스트로 진행");

                String id = memberService.findMemberByWallet(httpServletRequest.getHeader(HttpHeaders.AUTHORIZATION)).getId();
                redisService.setCount(id);

                headers.set(HttpHeaders.AUTHORIZATION, testHeader);
            } else {
                headers.set(HttpHeaders.AUTHORIZATION, allowHeader); // 이 부분에서 헤더를 설정합니다.
            }

            HttpEntity<?> httpEntity = new HttpEntity<>(headers);

            RestTemplate restTemplate = new RestTemplate();

            ResponseEntity<?> responseEntity = restTemplate.exchange(uri, HttpMethod.GET, httpEntity, Object.class);
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
