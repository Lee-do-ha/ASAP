package com.core.apiserver.api.service;

import com.core.apiserver.api.entity.dto.request.KakaoRequest;
import com.core.apiserver.api.repository.ApiRepository;
import com.core.apiserver.wallet.repository.WalletRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class KakaoService {

    private final ApiRepository apiRepository;
    private final WalletRepository walletRepository;

    @Value("${private-key.kakao.rest-api}")
    public String kakaoRestKey;


    public Object koGpt(KakaoRequest kakaoRequest) {
        URI uri = UriComponentsBuilder
                .fromUriString("https://api.kakaobrain.com")
                .path("/v1/inference/kogpt/generation")
                .encode()
                .build()
                .toUri();

        return commonPostForm(uri, kakaoRequest);
    }


    public Object commonPostForm(URI uri, KakaoRequest kakaoRequest) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set(HttpHeaders.AUTHORIZATION, kakaoRestKey); // 이 부분에서 헤더를 설정합니다.

            HttpEntity<?> httpEntity = new HttpEntity<>(kakaoRequest, headers);

            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<?> responseEntity = restTemplate.exchange(uri, HttpMethod.POST, httpEntity, Object.class);


            return responseEntity.getBody();

        } catch (Exception e) {
            log.info(e.getMessage());
            Map<String, String> map = new HashMap<>();
            map.put("status", e.getMessage());
            return map;
        }
    }
}
