package com.core.apiserver.batch.service;

import com.core.apiserver.api.entity.domain.Api;
import com.core.apiserver.api.repository.ApiRepository;
import com.core.apiserver.batch.dto.RegisterPaymentRequest;
import com.core.apiserver.daily.entity.domain.Daily;
import com.core.apiserver.daily.entity.dto.request.DailyUsageRequest;
import com.core.apiserver.daily.repository.DailyRepository;
import com.core.apiserver.daily.service.DailyService;
import com.core.apiserver.total.service.TotalService;
import com.core.apiserver.transaction.entity.domain.Transaction;
import com.core.apiserver.transaction.entity.dto.request.TransactionRequest;
import com.core.apiserver.transaction.repository.TransactionRepository;
import com.core.apiserver.transaction.service.TransactionService;
import com.core.apiserver.usage.entity.domain.RedisUsage;
import com.core.apiserver.usage.repository.RedisUsageRepository;
import com.core.apiserver.wallet.entity.domain.Wallet;
import com.core.apiserver.wallet.repository.WalletRepository;
import com.core.apiserver.wallet.service.EthereumService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.math.BigInteger;
import java.net.URI;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.*;
import java.util.concurrent.ExecutionException;

@RequiredArgsConstructor
@Component
@Slf4j
public class BatchService {

    private final DailyService dailyService;
    private final TotalService totalService;
    private final DailyRepository dailyRepository;
    private final RedisUsageRepository redisUsageRepository;
    private final TransactionService transactionService;
    private final TransactionRepository transactionRepository;
    private final ApiRepository apiRepository;
    private final WalletRepository walletRepository;
    private final EthereumService ethereumService;


    private String from = "0xb2f25bea384704fc26d60f1bf7490444df21babe";
    private String pwd = "pass";

    // redis 데이터 처리 - 30분
//    @Scheduled(fixedRate = 1000 * 60 * 30)
    @Transactional
    public void processRedisData() {
        log.info("redis 처리 시작");
        Iterable<RedisUsage> redisUsages = redisUsageRepository.findAll();

        for (RedisUsage redisUsage : redisUsages) {
            Optional<Daily> daily = dailyRepository.findByUserWalletIdAndApiIdAndDate(redisUsage.getUserWalletId(),
                    redisUsage.getApiId(), redisUsage.getUseAt().toLocalDate());

            if (daily.isEmpty()) {
                dailyService.register(new DailyUsageRequest(redisUsage.getUserWalletId(), redisUsage.getApiId(),
                        1L, redisUsage.getUseAt().toLocalDate()));
            } else {
                dailyService.updateAmount(daily.get(), 1L);
            }

            Wallet wallet = walletRepository.findById(redisUsage.getUserWalletId()).orElseThrow();
            Api api = apiRepository.findById(redisUsage.getApiId()).orElseThrow();

            Optional<Transaction> transaction = transactionRepository.findByUserWalletAddressAndApiTitleAndStartDate(
                    wallet.getAddress(), api.getTitle(),
                    redisUsage.getUseAt().toLocalDate().minusDays(dateCalculate(redisUsage.getUseAt().toLocalDate())));

            if (transaction.isEmpty()) {
                transactionService.register(new TransactionRequest(wallet.getAddress(), api.getWallet().getAddress(),
                                api.getTitle(), redisUsage.getUseAt().toLocalDate().minusDays(dateCalculate(redisUsage.getUseAt().toLocalDate())),
                                redisUsage.getUseAt().toLocalDate().minusDays(dateCalculate(redisUsage.getUseAt().toLocalDate())).plusDays(6)),
                        redisUsage.getUseAt());
            } else {
                transactionService.update(transaction.get().get_id(), String.valueOf(redisUsage.getUseAt()));
            }
        }
        redisUsageRepository.deleteAll(redisUsages);
    }

    // 데일리 데이터 토탈 집계 - 매일 새벽 2시
    @Transactional
    public void processTotal() {
        LocalDate yesterday = LocalDate.now().minusDays(1);
        List<Daily> dailies = dailyRepository.findAllByDate(yesterday);

        for (Daily daily : dailies) {
            totalService.updateAmount(daily);
        }
    }

    // 트랜잭션 블록 생성 - 매주 일요일
//    @Scheduled(cron = "0 0 1 * * 0")
    @Transactional
    public void processTransactionBlock() throws NoSuchAlgorithmException, IOException, ExecutionException, InterruptedException {
        List<Transaction> transactions = transactionRepository.findAllByTransactionHashAndEndDate(null,
                LocalDate.now().minusDays(dateCalculate(LocalDate.now()) + 1));
        log.info(String.valueOf(LocalDate.now().minusDays(dateCalculate(LocalDate.now()) + 1)));
        for (Transaction transaction : transactions) {
            transactionService.toBlock(transaction);
            log.info(transaction.toString());
        }
    }

    // 결제 - 매월 1일에 실행

    //    @Scheduled(cron = "0 0 1 1 * ?")
    @Transactional
    public void processCredit() throws IOException, ExecutionException, InterruptedException {

        YearMonth current = YearMonth.now().minusMonths(1);

        List<Daily> dailies = dailyRepository.findAllByDateBetween(current.atDay(1), current.atEndOfMonth());
        Map<Wallet, Long> usageMap = new HashMap<>();
        Map<String, Long> provideMap = new HashMap<>();

        for (Daily daily : dailies) {
            if (usageMap.containsKey(daily.getUserWallet())) {
                usageMap.put(daily.getUserWallet(),
                        usageMap.get(daily.getUserWallet()) + daily.getUseAmount() * daily.getApi().getPrice());
            } else {
                usageMap.put(daily.getUserWallet(), daily.getUseAmount() * daily.getApi().getPrice());
            }

            if (provideMap.containsKey(daily.getApi().getWallet().getAddress())) {
                provideMap.put(daily.getApi().getWallet().getAddress(),
                        provideMap.get(daily.getApi().getWallet().getAddress()) + daily.getUseAmount() * daily.getApi().getPrice());
            } else {
                provideMap.put(daily.getApi().getWallet().getAddress(), daily.getUseAmount() * daily.getApi().getPrice());
            }
        }

        for (Wallet wallet : usageMap.keySet()) {
            if (!wallet.getAddress().equals(from)) {
                ethereumService.sendEther(wallet.getAddress(), wallet.getPrivateKey(), from, BigInteger.valueOf(usageMap.get(wallet)));
            }
            serverPostConnect(new RegisterPaymentRequest(wallet.getAddress(), usageMap.get(wallet)));
        }

        for (String walletAddress : provideMap.keySet()) {
            if (!walletAddress.equals(from)) {
                ethereumService.sendEther(from, pwd, walletAddress, BigInteger.valueOf(provideMap.get(walletAddress)));
            }
        }

    }

//    @PostMapping
///api/v1/payment/approve
    public void serverPostConnect(RegisterPaymentRequest request) {

        URI uri = UriComponentsBuilder
//                .fromUriString("http://localhost:9000")
                .fromUriString("https://j9c202.p.ssafy.io")
                .path("/api/v1/payment/approve")
                .encode()
                .build()
                .toUri();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<?> httpEntity = new HttpEntity<>(request, headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<?> responseEntity = restTemplate.exchange(uri, HttpMethod.POST, httpEntity, String.class);
        log.info((String) responseEntity.getBody());
    }



    public void dataMake() {
        Random random = new Random();
        for (int i = 0; i < 188; i++) {
            Optional<Daily> daily1 = dailyRepository.findByUserWalletIdAndApiIdAndDate(999999L, 30L, LocalDate.now().minusDays(i));
            Optional<Daily> daily2 = dailyRepository.findByUserWalletIdAndApiIdAndDate(999999L, 31L, LocalDate.now().minusDays(i));
            long randLong = random.nextLong(20);
            long randLong2 = 0L;
            if (randLong > 0) {
                randLong2 = random.nextLong(randLong);
            } else {
                randLong2 = random.nextLong(20);
            }
            if (daily1.isEmpty()) {
                Daily saveDaily1 = dailyService.register(new DailyUsageRequest(999999L, 30L, randLong2 * (188-i),
                        LocalDate.now().minusDays(i)));

                totalService.updateAmount(saveDaily1);
            } else {
                dailyService.updateAmount(daily1.get(), randLong2 * (188-i));
                totalService.updateAmount(daily1.get());
            }

            if (daily2.isEmpty()) {
                Daily saveDaily2 = dailyService.register(new DailyUsageRequest(999999L, 31L, randLong * (188-i),
                        LocalDate.now().minusDays(i)));

                totalService.updateAmount(saveDaily2);
            } else {
                dailyService.updateAmount(daily2.get(), randLong * (188-i));
                totalService.updateAmount(daily2.get());
            }

        }
    }

    public Integer dateCalculate(LocalDate localDate) {
        return switch (localDate.getDayOfWeek()) {
            case SUNDAY -> 0;
            case MONDAY -> 1;
            case TUESDAY -> 2;
            case WEDNESDAY -> 3;
            case THURSDAY -> 4;
            case FRIDAY -> 5;
            case SATURDAY -> 6;
        };
    }
}
