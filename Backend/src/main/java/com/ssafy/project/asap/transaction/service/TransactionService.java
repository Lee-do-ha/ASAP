package com.ssafy.project.asap.transaction.service;

import com.ssafy.project.asap.api.service.ApiService;
import com.ssafy.project.asap.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.Collections;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class TransactionService {

    private final ApiService apiService;

    public Object findTransaction(Map<String, String> param, String userWalletAddress) {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.put("userWalletAddress", Collections.singletonList(String.valueOf(userWalletAddress)));
        params.put("apiTitle", Collections.singletonList(param.get("apiTitle")));
        params.put("startDate", Collections.singletonList(param.get("startDate")));
        params.put("endDate", Collections.singletonList(param.get("endDate")));

        return apiService.serverGetConnect(params, "/api/v1/transaction");
    }
}
