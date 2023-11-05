package com.core.apiserver.usage.entity.dto.request;

import com.core.apiserver.usage.entity.domain.MongoUsage;
import com.core.apiserver.usage.entity.domain.RedisUsage;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CreateMongoUsageRequest {

    private Long userWalletId;
    private Long providerWalletId;
    private Long apiId;
    private Long useAt;

    public MongoUsage toMongoUsage() {
        return MongoUsage.builder()
                .useAt(useAt)
                .userWalletId(userWalletId)
                .providerWalletId(providerWalletId)
                .apiId(apiId)
                .build();
    }

    public CreateMongoUsageRequest(RedisUsage redisUsage) {
        this.userWalletId = redisUsage.getUserWalletId();
        this.providerWalletId = redisUsage.getProviderWalletId();
        this.apiId = redisUsage.getApiId();
        this.useAt = Timestamp.valueOf(redisUsage.getUseAt()).getTime();
    }
}
