package com.ssafy.project.asap.api.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.project.asap.api.entity.domain.Api;

import com.ssafy.project.asap.api.entity.dto.request.RegisterBlockApiRequest;
import com.ssafy.project.asap.api.entity.dto.response.ApproveApisResponse;
import com.ssafy.project.asap.api.entity.dto.response.FindApiResponse;
import com.ssafy.project.asap.api.entity.dto.response.FindApisResponse;
import com.ssafy.project.asap.api.entity.dto.response.GuideApiResponse;
import com.ssafy.project.asap.api.repository.ApiRepository;
import com.ssafy.project.asap.global.exception.CustomException;
import com.ssafy.project.asap.global.exception.ErrorCode;
import com.ssafy.project.asap.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class ApiService {

    private final ApiRepository apiRepository;
    private final MemberRepository memberRepository;

    @Value("${server.test-header}")
    private String allowHeader;

    public List<FindApisResponse> findAll(){

        List<FindApisResponse> list = new ArrayList<>();

        for(Api api : apiRepository.findAll(Sort.by(Sort.Direction.DESC, "modifyDate"))){
            list.add(FindApisResponse.builder()
                    .apiId(api.getApiId())
                    .title(api.getTitle())
                    .content(api.getContent())
                    .category(api.getCategory().getCategory())
                    .tags(api.getTags())
                    .build());
        }

        return list;

    }

    public FindApiResponse findApiResponse(Long apiId){

        Api api = apiRepository.findByApiId(apiId);

        return FindApiResponse.builder()
                .apiId(api.getApiId())
                .title(api.getTitle())
                .content(api.getContent())
                .output(api.getOutput())
                .tags(api.getTags())
                .price(api.getPrice())
                .category(api.getCategory().getCategory())
                .memberName(memberRepository.findById(api.getMember().getId())
                        .orElseThrow(() -> new CustomException(ErrorCode.USER_ID_NOT_FOUND)).getName())
                .build();

    }

    public GuideApiResponse findGuideApiResponse(Long apiId){

        Api api = apiRepository.findByApiId(apiId);

        return GuideApiResponse.builder()
                .title(api.getTitle())
                .api(api.getApi())
                .method(api.getMethod())
                .input(api.getInput())
                .inputExample(api.getInputExample())
                .output(api.getOutput())
                .outputExample(api.getOutputExample())
                .build();

    }

    public void registerApi(RegisterBlockApiRequest request){

        log.info("request = " + request.toString());

        URI uri = UriComponentsBuilder
                .fromUriString("https://j9c202.p.ssafy.io")
                .path("/block/api/v1/asap/register")
                .encode()
                .build()
                .toUri();

        log.info(uri.toString());

        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.AUTHORIZATION, allowHeader);
        headers.setContentType(MediaType.APPLICATION_JSON); // Content-Type을 application/json으로 설정

        ObjectMapper objectMapper = new ObjectMapper();
        String requestBody;

        try {
            requestBody = objectMapper.writeValueAsString(request);
        } catch (JsonProcessingException e) {
            log.error("JSON ERROR = " + e.getMessage());
            throw new RuntimeException(e);
        }

        HttpEntity<?> httpEntity = new HttpEntity<>(requestBody, headers);

        RestTemplate restTemplate = new RestTemplate();
        restTemplate.exchange(uri, HttpMethod.POST, httpEntity, Object.class);

//        log.info((String) responseEntity.getBody());

    }

    public Api findByApiId(Long apiId){

        return apiRepository.findByApiId(apiId);

    }

    public List<ApproveApisResponse> findAllByMember(String id){

        List<ApproveApisResponse> list = new ArrayList<>();

        for(Api api : apiRepository.findAllByMember(memberRepository.findById(id).get())){

            list.add(ApproveApisResponse.builder()
                            .apiId(api.getApiId())
                            .title(api.getTitle())
                    .build());
        }

        return list;

    }

    public Object findCategoryIdsById(Map<String, String> param) {
        Api api = findByApiId(Long.parseLong(param.get("apiId")));

        StringBuilder ids = new StringBuilder();
        List<Api> apis = apiRepository.findAllByCategory(api.getCategory());
        for (Api api1 : apis) {
            ids.append(api1.getApiId().toString()).append(",");
        }
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.put("ids", Collections.singletonList(ids.toString()));
        params.put("apiId", Collections.singletonList(param.get("apiId")));
        params.put("year", Collections.singletonList(param.get("year")));
        params.put("month", Collections.singletonList(param.get("month")));

        return serverGetConnect(params, "/api/v1/usage/category/average");
    }

    public Object findMonthlyUsage(Map<String, String> param, Long walletId) {

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.put("userWalletId", Collections.singletonList(String.valueOf(walletId)));
        params.put("year", Collections.singletonList(param.get("year")));
        params.put("month", Collections.singletonList(param.get("month")));


        return serverGetConnect(params, "/api/v1/usage/monthly/use");
    }

    public Object findOneMonthUsage(Map<String, String> param, Long walletId) {

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.put("userWalletId", Collections.singletonList(String.valueOf(walletId)));
        params.put("year", Collections.singletonList(param.get("year")));
        params.put("month", Collections.singletonList(param.get("month")));


        return serverGetConnect(params, "/api/v1/usage/monthly/use/one");
    }

    public Object findMonthlyProviding(Map<String, String> param, Long walletId) {

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.put("userWalletId", Collections.singletonList(String.valueOf(walletId)));
        params.put("year", Collections.singletonList(param.get("year")));
        params.put("month", Collections.singletonList(param.get("month")));

        return serverGetConnect(params, "/api/v1/usage/monthly/provide");
    }

    public Object findOneMonthlyProviding(Map<String, String> param, Long walletId) {

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.put("userWalletId", Collections.singletonList(String.valueOf(walletId)));
        params.put("year", Collections.singletonList(param.get("year")));
        params.put("month", Collections.singletonList(param.get("month")));

        return serverGetConnect(params, "/api/v1/usage/monthly/provide/one");
    }

    public Object findDailyUsage(Map<String, String> param, Long walletId) {

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.put("userWalletId", Collections.singletonList(String.valueOf(walletId)));
        params.put("apiId", Collections.singletonList(String.valueOf(param.get("apiId"))));

        return serverGetConnect(params, "/api/v1/usage/daily/use");
    }

    public Object findDailyProviding(Map<String, String> param, Long walletId) {

        if (apiRepository.findByApiId(Long.valueOf(param.get("apiId"))).getMember().getWalletId().equals(walletId)) {

            MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
            params.put("apiId", Collections.singletonList(param.get("apiId")));

            return serverGetConnect(params, "/api/v1/usage/daily/provide");
        } else {
         throw new CustomException(ErrorCode.NOT_API_OWNER);
        }
    }

    public Object serverGetConnect(MultiValueMap<String, String> params, String path) {

        URI uri = UriComponentsBuilder
//                .fromUriString("http://localhost:9001")
                .fromUriString("https://j9c202.p.ssafy.io/block")
                .path(path)
                .encode()
                .queryParams(params)
                .build()
                .toUri();

        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.AUTHORIZATION, allowHeader);
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<?> httpEntity = new HttpEntity<>(headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<?> responseEntity = restTemplate.exchange(uri, HttpMethod.GET, httpEntity, Object.class);
        return responseEntity.getBody();
    }
}
