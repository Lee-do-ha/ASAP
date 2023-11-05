package com.core.apiserver.wallet.service;

import com.core.apiserver.wallet.entity.domain.Wallet;
import com.core.apiserver.wallet.entity.dto.CreateWalletRequest;
import com.core.apiserver.wallet.repository.WalletRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class WalletService {

    private final WalletRepository walletRepository;

    @Transactional
    public Long register(CreateWalletRequest createWalletRequest) {
        Wallet wallet = walletRepository.save(createWalletRequest.toWallet());
        return wallet.getWalletId();
    }

    public String findPwdByAddress(String address) {
        return walletRepository.findByAddress(address).getPrivateKey();
    }



}
