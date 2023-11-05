package com.core.apiserver.global.increase.entity;

import jakarta.persistence.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Auto_Sequence")
public class AutoIncrease {
    @Id
    private String id;
    private Long seq;

    public AutoIncrease() {}

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public long getSeq() {
        return seq;
    }

    public void setSeq(long seq) {
        this.seq = seq;
    }
}
