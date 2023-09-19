package com.core.apiserver.usage.entity.dto.response;

import com.core.apiserver.usage.entity.domain.RedisUsage;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RedisUsageResponse {

    private Integer id;
    private Long userWalletId;
    private Long providerWalletId;
    private Long apiId;

    public RedisUsageResponse(RedisUsage redisUsage) {
        this.id = redisUsage.getId();
        this.userWalletId = redisUsage.getUserWalletId();
        this.apiId = redisUsage.getApiId();
        this.providerWalletId = redisUsage.getProviderWalletId();
    }
}
