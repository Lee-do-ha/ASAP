package com.core.apiserver.transaction.repository;

import com.core.apiserver.transaction.entity.domain.Transaction;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface TransactionRepository extends MongoRepository<Transaction, Long> {

    Transaction findByUserWalletAddressAndApiTitleAndStartDateAndEndDate(String userWalletAddress, String ApiTitle,
                                                                         LocalDate startDate, LocalDate endDate);

    Optional<Transaction> findByUserWalletAddressAndApiTitleAndStartDate(String userWalletAddress, String ApiTitle,
                                                                         LocalDate startDate);
    List<Transaction> findAllByTransactionHashAndEndDate(String transactionHash, LocalDate endDate);
}
