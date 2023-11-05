package com.core.apiserver.daily.service;

import com.core.apiserver.api.entity.domain.Api;
import com.core.apiserver.api.entity.dto.response.ApiResponse;
import com.core.apiserver.api.repository.ApiRepository;
import com.core.apiserver.daily.entity.domain.Daily;
import com.core.apiserver.daily.entity.dto.request.DailyUsageRequest;
import com.core.apiserver.daily.entity.dto.request.GetCategoryApiIds;
import com.core.apiserver.daily.entity.dto.request.GetDailyRequest;
import com.core.apiserver.daily.entity.dto.request.MonthlyUsageRequest;
import com.core.apiserver.daily.entity.dto.response.*;
import com.core.apiserver.daily.repository.DailyRepository;
import com.core.apiserver.total.entity.domain.Total;
import com.core.apiserver.total.repository.TotalRepository;
import com.core.apiserver.wallet.entity.domain.Wallet;
import com.core.apiserver.wallet.repository.WalletRepository;
import io.lettuce.core.GeoArgs;
import lombok.RequiredArgsConstructor;

import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DailyService {
    private final DailyRepository dailyRepository;
    private final ApiRepository apiRepository;
    private final TotalRepository totalRepository;
    private final WalletRepository walletRepository;

    @Transactional
    public Daily register(@NotNull DailyUsageRequest dailyUsageRequest) {

        Api api = apiRepository.findById(dailyUsageRequest.getApiId()).orElseThrow();
        Wallet userWallet = walletRepository.findById(dailyUsageRequest.getUserWalletId()).orElseThrow();

        return dailyRepository.save(Daily.builder()
                        .userWallet(userWallet)
                        .providerWallet(api.getWallet())
                        .api(api)
                        .useAmount(dailyUsageRequest.getAmount())
                        .date(dailyUsageRequest.getDate())
                .build());
    }

    @Transactional
    public void updateAmount(Daily daily, Long amount) {
        daily.updateAmount(amount);
        dailyRepository.save(daily);
    }

    @Transactional
    public void update(@NotNull DailyUsageRequest dailyUsageRequest) {

        Api api = apiRepository.findById(dailyUsageRequest.getApiId()).orElseThrow();
        Wallet userWallet = walletRepository.findById(dailyUsageRequest.getUserWalletId()).orElseThrow();

        Daily daily = dailyRepository.findByUserWalletAndApiAndDate(userWallet, api, dailyUsageRequest.getDate()).orElseThrow();
        daily.updateAmount(dailyUsageRequest.getAmount());
        dailyRepository.save(daily);
    }

    public Map<YearMonth, List<UsageResponse>> monthlyUsage(@NotNull MonthlyUsageRequest monthlyUsageRequest) {

        List<Total> totals = totalRepository.findAllByUserWallet(walletRepository.findById(monthlyUsageRequest.getUserWalletId()).orElseThrow());
        Map<YearMonth, List<UsageResponse>> map = new HashMap<>();


        for (int i = 0; i < 3; i++) {
            List<UsageResponse> usageResponses = new ArrayList<>();
            YearMonth yearMonth = YearMonth.of(monthlyUsageRequest.getYear(), monthlyUsageRequest.getMonth()).minusMonths(i);
            for (Total total : totals) {
                List<Daily> dailies = dailyRepository.findAllByUserWalletAndApiAndDateBetween(total.getUserWallet(),
                        total.getApi(),
                        yearMonth.atDay(1), yearMonth.atEndOfMonth());

                Long amount = 0L;

                for (Daily d : dailies) {
                    amount += d.getUseAmount();
                }
                Long price = amount * total.getApi().getPrice();
                if (amount == 0) {
                    continue;
                }

                usageResponses.add(new UsageResponse(new ApiResponse(total.getApi()), amount, price));
            }
            usageResponses.sort((o1, o2) -> {
                return Double.compare(o2.getPrice(), o1.getPrice());
            });
            map.put(yearMonth, usageResponses);

        }


        return map;
    }

    public Map<YearMonth, List<UsageResponse>> oneMonthlyUsage(@NotNull MonthlyUsageRequest monthlyUsageRequest) {

        List<Total> totals = totalRepository.findAllByUserWallet(walletRepository.findById(monthlyUsageRequest.getUserWalletId()).orElseThrow());
        Map<YearMonth, List<UsageResponse>> map = new HashMap<>();
        List<UsageResponse> usageResponses = new ArrayList<>();

        YearMonth yearMonth = YearMonth.of(monthlyUsageRequest.getYear(), monthlyUsageRequest.getMonth());

        for (Total total : totals) {
            List<Daily> dailies = dailyRepository.findAllByUserWalletAndApiAndDateBetween(total.getUserWallet(),
                    total.getApi(),
                    yearMonth.atDay(1), yearMonth.atEndOfMonth());

            Long amount = 0L;

            for (Daily d : dailies) {
                amount += d.getUseAmount();
            }
            Long price = amount * total.getApi().getPrice();
            if (amount == 0) {
                continue;
            }

            usageResponses.add(new UsageResponse(new ApiResponse(total.getApi()), amount, price));
        }
        usageResponses.sort((o1, o2) -> {
            return Double.compare(o2.getPrice(), o1.getPrice());
        });
        map.put(yearMonth, usageResponses);




        return map;
    }

    public Map<YearMonth, List<UsageResponse>> monthlyProviding(@NotNull MonthlyUsageRequest monthlyUsageRequest) {
        Map<YearMonth, List<UsageResponse>> map = new HashMap<>();
        List<Api> apis = apiRepository.findAllByWallet(walletRepository.findById(monthlyUsageRequest.getUserWalletId()).orElseThrow());
        for (int i = 0; i < 3; i++) {
            YearMonth yearMonth = YearMonth.of(monthlyUsageRequest.getYear(), monthlyUsageRequest.getMonth()).minusMonths(i);
            List<UsageResponse> usageResponses = new ArrayList<>();
            for (Api api : apis) {
                List<Daily> dailies = dailyRepository.findAllByApiAndDateBetween(api,
                        yearMonth.atDay(1), yearMonth.atEndOfMonth());

                Long amount = 0L;

                for (Daily d : dailies) {
                    amount += d.getUseAmount();
                }
                Long price = amount * api.getPrice();
                if (amount == 0) {
                    continue;
                }

                usageResponses.add(new UsageResponse(new ApiResponse(api), amount, price));

            }
            usageResponses.sort((o1, o2) -> {
                return Double.compare(o2.getPrice(), o1.getPrice());
            });
            map.put(yearMonth, usageResponses);

        }

        return map;
    }

    public Map<YearMonth, List<UsageResponse>> oneMonthlyProviding(@NotNull MonthlyUsageRequest monthlyUsageRequest) {
        Map<YearMonth, List<UsageResponse>> map = new HashMap<>();
        List<Api> apis = apiRepository.findAllByWallet(walletRepository.findById(monthlyUsageRequest.getUserWalletId()).orElseThrow());

        YearMonth yearMonth = YearMonth.of(monthlyUsageRequest.getYear(), monthlyUsageRequest.getMonth());
        List<UsageResponse> usageResponses = new ArrayList<>();
        for (Api api : apis) {
            List<Daily> dailies = dailyRepository.findAllByApiAndDateBetween(api,
                    yearMonth.atDay(1), yearMonth.atEndOfMonth());

            Long amount = 0L;

            for (Daily d : dailies) {
                amount += d.getUseAmount();
            }
            Long price = amount * api.getPrice();
            if (amount == 0) {
                continue;
            }

            usageResponses.add(new UsageResponse(new ApiResponse(api), amount, price));
        }
        usageResponses.sort((o1, o2) -> {
            return Double.compare(o2.getPrice(), o1.getPrice());
        });
        map.put(yearMonth, usageResponses);



        return map;
    }

    public List<DailyUsageResponse> dailyUsage(@NotNull GetDailyRequest getDailyRequest) {

        Wallet wallet = walletRepository.findById(getDailyRequest.getUserWalletId()).orElseThrow();
        Api api = apiRepository.findById(getDailyRequest.getApiId()).orElseThrow();
        List<Daily> dailies = dailyRepository.findAllByUserWalletAndApiAndDateBetweenOrderByDateDesc(wallet,
                api, LocalDate.now().minusDays(30), LocalDate.now());
        Map<LocalDate, DailyUsageResponse> map = new HashMap<>();

        for (int i = 0; i < 31; i++) {
            map.put(LocalDate.now().minusDays(30-i), new DailyUsageResponse(LocalDate.now().minusDays(30-i), 0L, 0L));
        }

        for (Daily daily: dailies) {
            map.get(daily.getDate()).update(daily);
        }

        List<DailyUsageResponse> arrayList = new ArrayList<>(map.values());
        arrayList.sort((o1, o2) -> {
            return o1.getDate().compareTo(o2.getDate());
        });

        return arrayList;
    }

    public List<DailyUsageResponse> dailyProviding(Map<String, String> map) {
        List<Daily> dailies = dailyRepository.findAllByApiIdAndDateBetween(Long.parseLong(map.get("apiId")),
                LocalDate.now().minusDays(30), LocalDate.now());

        Map<LocalDate, DailyProvidingResponse> dateMap = new HashMap<>();

        for (int i = 0; i < 31; i++) {
            dateMap.put(LocalDate.now().minusDays(30-i), new DailyProvidingResponse(0L, 0L));
        }

        for (Daily daily: dailies) {
            dateMap.get(daily.getDate()).update(daily.getUseAmount(), Long.valueOf(daily.getApi().getPrice()));
        }

        List<DailyUsageResponse> list = new ArrayList<>();
        for (LocalDate localDate : dateMap.keySet()) {
            list.add(new DailyUsageResponse(localDate, dateMap.get(localDate).getAmount(), dateMap.get(localDate).getPrice()));
        }


        list.sort((o1, o2) -> {
            return o1.getDate().compareTo(o2.getDate());
        });

        return list;
    }



    public Map<YearMonth, CategoryResponse> categoryAverage(GetCategoryApiIds getCategoryApiIds) {
        Map<YearMonth, CategoryResponse> map = new HashMap<>();
        for (int i = 0; i < 5; i++) {
            YearMonth yearMonth = YearMonth.of(getCategoryApiIds.getYear(), getCategoryApiIds.getMonth()).minusMonths(i);
            Long amount = 0L;
            Long myApiAmount = 0L;
            for (Long id : getCategoryApiIds.getIds()) {
                Api api = apiRepository.findById(id).orElseThrow();
                if (api.getApiId().equals(getCategoryApiIds.getApiId())) {
                    myApiAmount = amount(yearMonth, api);
                }
                amount += amount(yearMonth, api);
            }
            map.put(yearMonth, new CategoryResponse(amount/getCategoryApiIds.getIds().length, myApiAmount));
        }
        return map;
    }

    public Long amount(@NotNull YearMonth yearMonth, Api api) {
        Long amount = 0L;
        List<Daily> dailies = dailyRepository.findAllByApiAndDateBetween(api, yearMonth.atDay(1), yearMonth.atEndOfMonth());
        for (Daily daily: dailies) {
            amount += daily.getUseAmount();
        }
        return amount;
    }
}
