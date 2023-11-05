package com.core.apiserver.daily.entity.domain;

import com.core.apiserver.api.entity.domain.Api;
import com.core.apiserver.wallet.entity.domain.Wallet;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;


@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Daily {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long dailyId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(referencedColumnName = "wallet_id", name = "userWalletId", nullable = false)
    private Wallet userWallet;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(referencedColumnName = "wallet_id", name = "providerWalletId", nullable = false)
    private Wallet providerWallet;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "api_id")
    private Api api;

    private Long useAmount;
    private LocalDate date;

    public void updateAmount(Long amount) {
        this.useAmount = amount;
    }
}
