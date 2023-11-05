package com.core.apiserver.global.increase.service;

import com.core.apiserver.global.increase.entity.AutoIncrease;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.Objects;

import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;
import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

@Service
@RequiredArgsConstructor
public class AutoIncreaseService {

    private final MongoOperations mongoOperations;

    public long generateSequence(String seqName) {

        AutoIncrease counter = mongoOperations.findAndModify(query(where("_id").is(seqName)),
                new Update().inc("seq",1), options().returnNew(true).upsert(true),
                AutoIncrease.class);
        return !Objects.isNull(counter) ? counter.getSeq() : 1;

    }
}
