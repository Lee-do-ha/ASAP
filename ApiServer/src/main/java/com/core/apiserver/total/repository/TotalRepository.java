package com.core.apiserver.total.repository;

import com.core.apiserver.api.entity.domain.Api;
import com.core.apiserver.total.entity.domain.Total;
import com.core.apiserver.wallet.entity.domain.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TotalRepository extends JpaRepository<Total, Long> {
    Optional<Total> findByUserWalletAndApi(Wallet userWallet, Api api);

    List<Total> findAllByUserWallet(Wallet wallet);

    List<Total> findAllByApi(Api api);

    Optional<Total> findByUserWalletWalletIdAndApiApiId(Long userWalletId, Long apiId);
}
