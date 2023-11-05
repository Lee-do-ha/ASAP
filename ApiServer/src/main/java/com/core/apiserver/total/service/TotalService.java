package com.core.apiserver.total.service;

import com.core.apiserver.api.entity.domain.Api;
import com.core.apiserver.api.repository.ApiRepository;
import com.core.apiserver.daily.entity.domain.Daily;
import com.core.apiserver.total.entity.domain.Total;
import com.core.apiserver.total.entity.dto.request.FindTotalRequest;
import com.core.apiserver.total.entity.dto.request.TotalRequest;
import com.core.apiserver.total.repository.TotalRepository;
import com.core.apiserver.wallet.entity.domain.Wallet;
import com.core.apiserver.wallet.repository.WalletRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TotalService {

    private final TotalRepository totalRepository;
    private final WalletRepository walletRepository;
    private final ApiRepository apiRepository;

    @Transactional
    public boolean register(TotalRequest totalRequest) {
        Api api = apiRepository.findById(totalRequest.getApiId()).orElseThrow();
        System.out.println("여기까지는 가능?");
        Wallet userWallet = walletRepository.findById(totalRequest.getUserWalletId()).orElseThrow();

        Total total = Total.builder()
                .userWallet(userWallet)
                .providerWallet(api.getWallet())
                .api(api)
                .useAmount(0L)
                .build();

        totalRepository.save(total);

        return true;
    }

    @Transactional
    public boolean delete(FindTotalRequest totalRequest) {
        try {
            Wallet wallet = walletRepository.findById(totalRequest.getWalletId()).orElseThrow(() ->
                    new IllegalArgumentException("지갑 주소가 존재하지 않습니다"));
            Api api = apiRepository.findById(totalRequest.getApiId()).orElseThrow(() ->
                    new IllegalArgumentException("api가 존재하지 않습니다."));

            Total total = totalRepository.findByUserWalletAndApi(wallet, api).orElseThrow(() ->
                    new IllegalArgumentException("누계 정보가 없습니다."));

            totalRepository.delete(total);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Transactional
    public void updateAmount(Daily daily) {
        Total total = totalRepository.findByUserWalletAndApi(daily.getUserWallet(), daily.getApi()).orElseThrow(() ->
                new IllegalArgumentException("누계 정보가 없습니다."));
        total.updateAmount(daily.getUseAmount());
        totalRepository.save(total);
    }
}
