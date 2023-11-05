package com.core.apiserver.api.service;

import com.core.apiserver.api.entity.domain.Api;
import com.core.apiserver.api.entity.dto.request.CreateApiRequest;
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
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.*;
import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ApiService {

    private final ApiRepository apiRepository;
    private final WalletRepository walletRepository;

    @Value("${private-key.kakao.rest-api}")
    public String kakaoRestKey;

    @Transactional
    public Api register(CreateApiRequest createApiRequest) {
        if (!walletRepository.existsById(createApiRequest.getWalletId())) {
            throw new IllegalArgumentException("맞는 지갑 주소가 없습니다.");
        }

        Api api = apiRepository.save(Api.builder()
                        .apiId(createApiRequest.getApiId())
                        .wallet(walletRepository.findById(createApiRequest.getWalletId()).orElseThrow())
                        .title(createApiRequest.getTitle())
                        .price(createApiRequest.getPrice())
                .build());

        return api;
    }


    public Long findProviderIdById(Long id) {
        return apiRepository.findById(id).orElseThrow().getWallet().getWalletId();
    }

    public Object kakaoLocal(MultiValueMap<String, String> params) {
        URI uri = UriComponentsBuilder
                .fromUriString("https://dapi.kakao.com")
                .path("/v2/local/search/address")
                .queryParams(params)
                .encode()
                .build()
                .toUri();

        return commonForm(uri);
    }

    public Object kakaoLocalKeyword(MultiValueMap<String, String> params) {

        URI uri = UriComponentsBuilder
                .fromUriString("https://dapi.kakao.com")
                .path("/v2/local/search/keyword")
                .queryParams(params)
                .encode()
                .build()
                .toUri();

        return commonForm(uri);
    }

    public Object kakaoLocalCategory(MultiValueMap<String, String> params) {

        URI uri = UriComponentsBuilder
                .fromUriString("https://dapi.kakao.com")
                .path("/v2/local/search/category")
                .queryParams(params)
                .encode()
                .build()
                .toUri();

        return commonForm(uri);
    }

    public Object kakaoWebSearch(MultiValueMap<String, String> params) {

        URI uri = UriComponentsBuilder
                .fromUriString("https://dapi.kakao.com")
                .path("/v2/search/web")
                .queryParams(params)
                .encode()
                .build()
                .toUri();

        return commonForm(uri);
    }

    public Object kakaoImageSearch(MultiValueMap<String, String> params) {

        URI uri = UriComponentsBuilder
                .fromUriString("https://dapi.kakao.com")
                .path("/v2/search/image")
                .queryParams(params)
                .encode()
                .build()
                .toUri();

        return commonForm(uri);
    }

    public Object kakaoBookSearch(MultiValueMap<String, String> params) {

        URI uri = UriComponentsBuilder
                .fromUriString("https://dapi.kakao.com")
                .path("/v3/search/book")
                .queryParams(params)
                .encode()
                .build()
                .toUri();

        return commonForm(uri);
    }

    public Object kakaoMobilityDirection(MultiValueMap<String, String> params) {

        URI uri = UriComponentsBuilder
                .fromUriString("https://apis-navi.kakaomobility.com")
                .path("/v1/directions")
                .queryParams(params)
                .encode()
                .build()
                .toUri();

        return commonForm(uri);
    }

    public Object commonForm(URI uri) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set(HttpHeaders.AUTHORIZATION, kakaoRestKey); // 이 부분에서 헤더를 설정합니다.

            HttpEntity<?> httpEntity = new HttpEntity<>(headers);

            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<?> responseEntity = restTemplate.exchange(uri, HttpMethod.GET, httpEntity, Object.class);


            return responseEntity.getBody();

        } catch (Exception e) {
            log.info(e.getMessage());
            Map<String, String> map = new HashMap<>();
            map.put("status", e.getMessage());
            return map;
        }
    }
}
