package com.core.apiserver.usage.entity.domain;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;

import java.math.BigInteger;
import java.time.LocalDateTime;

@RedisHash(timeToLive = 60*60*24)
@Builder
@Getter
public class RedisUsage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Long userWalletId;
    private Long providerWalletId;
    private Long apiId;
    private LocalDateTime useAt;
}
