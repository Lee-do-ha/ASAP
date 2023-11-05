package com.core.apiserver.usage.repository;

import com.core.apiserver.usage.entity.domain.MongoUsage;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface MongoUsageRepository extends MongoRepository<MongoUsage, LocalDateTime> {
    List<MongoUsage> findAllByUserWalletIdAndApiId(Long userWalletId, Long apiId);
}
