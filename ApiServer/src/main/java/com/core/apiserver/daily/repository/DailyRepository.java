package com.core.apiserver.daily.repository;

import com.core.apiserver.api.entity.domain.Api;
import com.core.apiserver.daily.entity.domain.Daily;
import com.core.apiserver.wallet.entity.domain.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface DailyRepository extends JpaRepository<Daily, Long> {

    Optional<Daily> findByUserWalletAndApiAndDate(Wallet UserWallet, Api api, LocalDate date);

    List<Daily> findAllByUserWalletAndApiAndDateBetween(Wallet userWallet, Api api, LocalDate startDate, LocalDate endDate);

    List<Daily> findAllByApiAndDateBetween(Api api, LocalDate startDate, LocalDate endDate);

    List<Daily> findAllByUserWalletAndApiAndDateBetweenOrderByDateDesc(Wallet userWallet, Api api,
                                                                       LocalDate startDate, LocalDate endDate);
    List<Daily> findAllByDateBetween(LocalDate startDate, LocalDate endDate);

    List<Daily> findAllByDate(LocalDate Date);

    List<Daily> findAllByApiAndDate(Api api, LocalDate Date);

    @Query("SELECT d " +
            "FROM Daily d " +
            "WHERE d.userWallet.walletId = :userWallet and d.api.apiId = :api and d.date = :date")
    Optional<Daily> findByUserWalletIdAndApiIdAndDate(@Param("userWallet") Long userWalletId, @Param("api") Long apiId,
                                                  @Param("date") LocalDate date);

    @Query("SELECT d " +
            "FROM Daily d " +
            "WHERE d.api.apiId = :apiId and d.date between :startDate and :endDate")
    List<Daily> findAllByApiIdAndDateBetween(@Param("apiId") Long apiId,
                                                      @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

}
