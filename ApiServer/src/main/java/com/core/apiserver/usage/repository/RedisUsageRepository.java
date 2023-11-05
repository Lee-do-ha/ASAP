package com.core.apiserver.usage.repository;

import com.core.apiserver.usage.entity.domain.RedisUsage;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface RedisUsageRepository extends CrudRepository<RedisUsage, Integer> {
}
