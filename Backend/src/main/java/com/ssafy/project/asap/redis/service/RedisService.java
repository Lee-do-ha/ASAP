package com.ssafy.project.asap.redis.service;

import com.ssafy.project.asap.global.exception.CustomException;
import com.ssafy.project.asap.global.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@Slf4j
public class RedisService {

    private final RedisTemplate redisTemplate;

    // 레디스 value 가져오기
    public String getValue(String key){
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();

        return valueOperations.get(key);

    }

    // 레디스 key, value 저장
    public void setValue(String key, String value){

        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();

        long expireTime = 300L;

        valueOperations.set(key, value, expireTime, TimeUnit.SECONDS);

    }

    public void setCount(String id){

//        log.info("setCount");

        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();

        if(valueOperations.get(id) == null){

            LocalDateTime now = LocalDateTime.now();

            LocalDateTime midnight = now.toLocalDate().atStartOfDay().plusDays(1);
            long secondsUntilNight = now.until(midnight, ChronoUnit.SECONDS);

            valueOperations.set(id, "1", secondsUntilNight, TimeUnit.SECONDS);

        }

//        log.info("value = " + valueOperations.get(id));

        int curCount = Integer.parseInt(valueOperations.get(id));

        LocalDateTime now = LocalDateTime.now();

        LocalDateTime midnight = now.toLocalDate().atStartOfDay().plusDays(1);
        Long secondsUntilNight = now.until(midnight, ChronoUnit.SECONDS);

        redisTemplate.delete(id);
        valueOperations.set(id, String.valueOf(++curCount), secondsUntilNight, TimeUnit.SECONDS);

    }

    public Integer getCount(String id){

//        log.info("getCount");

        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();

        if(valueOperations.get(id) == null){
            return 0;
        }else{
            return Integer.parseInt(valueOperations.get(id));
        }

    }

}
