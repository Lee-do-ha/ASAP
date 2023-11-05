package com.core.apiserver.usage.entity.dto.response;

import com.core.apiserver.usage.entity.domain.MongoUsage;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MongoUsageResponse {

    private Long useAt;
    private Long userWalletId;
    private Long providerWalletId;
    private Long apiId;

    public MongoUsageResponse(MongoUsage mongoUsage) {
        this.useAt = mongoUsage.getUseAt();
        this.userWalletId = mongoUsage.getUserWalletId();
        this.providerWalletId = mongoUsage.getProviderWalletId();
        this.apiId = mongoUsage.getApiId();
    }
}
