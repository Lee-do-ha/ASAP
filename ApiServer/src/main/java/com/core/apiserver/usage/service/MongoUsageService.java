package com.core.apiserver.usage.service;

import com.core.apiserver.usage.entity.domain.MongoUsage;
import com.core.apiserver.usage.entity.dto.request.CreateMongoUsageRequest;
import com.core.apiserver.usage.repository.MongoUsageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MongoUsageService {

    private final MongoUsageRepository mongoUsageRepository;

    @Transactional
    public void save(CreateMongoUsageRequest createMongoUsageRequest) {
        mongoUsageRepository.save(createMongoUsageRequest.toMongoUsage());
    }

    public List<MongoUsage> findAll() {
        return mongoUsageRepository.findAll();
    }
}
