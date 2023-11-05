package com.ssafy.project.asap.member.entity.domain;

import com.ssafy.project.asap.api.entity.domain.Api;
import com.ssafy.project.asap.apply.entity.domain.Apply;
import com.ssafy.project.asap.credit.entity.domain.Credit;
import com.ssafy.project.asap.global.common.BaseTime;
import com.ssafy.project.asap.notice.entity.domain.Notice;
import com.ssafy.project.asap.payment.entity.domain.Payment;
import com.ssafy.project.asap.purpose.entity.domain.Purpose;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
public class Member extends BaseTime implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(nullable = false, unique = true)
    private String id;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;

    @Column(unique = true)
    @Setter
    private String address;

    @Column(unique = true)
    @Setter
    private Long walletId;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(mappedBy = "member")
    private final List<Payment> paymentList = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private final List<Notice> noticeList = new ArrayList<>();

    @OneToOne(mappedBy = "member", cascade = CascadeType.ALL)
    private Credit credit;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private final List<Apply> applyList = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private final List<Api> apiList = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private final List<Purpose> purposeList = new ArrayList<>();

    public void setPassword(String password) {
        this.password = password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        System.out.println(this.role.name());

        Collection<GrantedAuthority> collection = new ArrayList<>();
        collection.add(() -> this.role.name());

        return collection;
    }

    @Override
    public String getUsername() {
        return this.id;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
