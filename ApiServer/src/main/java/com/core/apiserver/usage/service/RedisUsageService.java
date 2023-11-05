package com.core.apiserver.usage.service;

import com.core.apiserver.usage.entity.domain.RedisUsage;
import com.core.apiserver.usage.entity.dto.request.CreateMongoUsageRequest;
import com.core.apiserver.usage.entity.dto.request.CreateRedisUsageRequest;
import com.core.apiserver.usage.repository.RedisUsageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.TimeZone;


@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RedisUsageService {

    private final RedisUsageRepository usageRepository;
    private final MongoUsageService mongoUsageService;

    @Transactional
    public RedisUsage save(CreateRedisUsageRequest createRedisUsageRequest) {
        return usageRepository.save(createRedisUsageRequest.toRedisUsage());
    }

    @Transactional
    public void delete() {
        usageRepository.deleteAll();
    }

}
