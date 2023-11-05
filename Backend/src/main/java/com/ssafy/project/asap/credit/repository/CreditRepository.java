package com.ssafy.project.asap.credit.repository;

import com.ssafy.project.asap.credit.entity.domain.Credit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CreditRepository extends JpaRepository<Credit, Long> {

    @Query("select c " +
            "from Credit c " +
            "where c.member.id = :id")
    Optional<Credit> findByMemberId(@Param("id") String id);

}
