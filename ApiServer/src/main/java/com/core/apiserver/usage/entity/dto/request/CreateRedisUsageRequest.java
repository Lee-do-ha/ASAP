package com.core.apiserver.usage.entity.dto.request;

import com.core.apiserver.usage.entity.domain.RedisUsage;
import com.core.apiserver.usage.entity.dto.response.RedisUsageResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CreateRedisUsageRequest {

    private Long userWalletId;
    private Long providerWalletId;
    private Long apiId;
    
    public RedisUsage toRedisUsage() {
        return RedisUsage.builder()
                .userWalletId(userWalletId)
                .providerWalletId(providerWalletId)
                .apiId(apiId)
                .useAt(LocalDateTime.now())
                .build();
    }

}
