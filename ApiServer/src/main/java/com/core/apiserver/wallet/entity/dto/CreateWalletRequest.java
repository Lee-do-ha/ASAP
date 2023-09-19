package com.core.apiserver.wallet.entity.dto;

import com.core.apiserver.wallet.entity.domain.Wallet;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CreateWalletRequest {

    private String address;

    public Wallet toWallet() {
        return Wallet.builder()
                .address(address)
                .build();
    }
}
