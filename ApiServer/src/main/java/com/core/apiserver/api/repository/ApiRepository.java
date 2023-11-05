package com.core.apiserver.api.repository;

import com.core.apiserver.api.entity.domain.Api;
import com.core.apiserver.wallet.entity.domain.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApiRepository extends JpaRepository<Api, Long> {

    List<Api> findAllByWallet(Wallet wallet);
}
