package com.core.apiserver.api.entity.domain;

import com.core.apiserver.wallet.entity.domain.Wallet;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Api {
    @Id
    @Column(name = "api_id")
    private Long apiId;

    private String title;
    private Integer price;

    @ManyToOne
    @JoinColumn(name = "wallet_id")
    private Wallet wallet;
}
