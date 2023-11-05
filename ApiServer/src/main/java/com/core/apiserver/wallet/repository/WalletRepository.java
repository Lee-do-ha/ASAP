package com.core.apiserver.wallet.repository;

import com.core.apiserver.wallet.entity.domain.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WalletRepository extends JpaRepository<Wallet, Long> {

    Wallet findByAddress(String address);
}
