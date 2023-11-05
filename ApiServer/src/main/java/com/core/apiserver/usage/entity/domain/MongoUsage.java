package com.core.apiserver.usage.entity.domain;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;


@Document(collection = "Usage")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MongoUsage {
    @Id
    private Long useAt;
    private Long userWalletId;
    private Long providerWalletId;
    private Long apiId;
}
