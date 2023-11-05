package com.core.apiserver.wallet.entity.domain;


import com.core.apiserver.daily.entity.domain.Daily;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Wallet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "wallet_id")
    private Long walletId;

    private String address;
    private String privateKey;

//    @OneToMany(mappedBy = "user_wallet_id")
//    private List<Daily> userDailies = new ArrayList<>();
//    @OneToMany(mappedBy = "provider_wallet_id")
//    private List<Daily> providerDailies = new ArrayList<>();

}
