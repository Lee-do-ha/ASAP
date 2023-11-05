package com.core.apiserver.usage.entity.dto.response;

import com.core.apiserver.usage.entity.domain.RedisUsage;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigInteger;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RedisUsageResponse {

    private Integer id;
    private Long userWalletId;
    private Long providerWalletId;
    private Long apiId;
    private LocalDateTime useAt;

    public RedisUsageResponse(RedisUsage redisUsage) {
        this.id = redisUsage.getId();
        this.userWalletId = redisUsage.getUserWalletId();
        this.apiId = redisUsage.getApiId();
        this.providerWalletId = redisUsage.getProviderWalletId();
        this.useAt = redisUsage.getUseAt();
    }
}
