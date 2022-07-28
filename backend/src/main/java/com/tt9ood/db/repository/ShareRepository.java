package com.tt9ood.db.repository;

import com.tt9ood.db.entity.Share;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ShareRepository extends JpaRepository<Share, Long> {
    @Modifying
    @Query("update share s set s.share_view = s.view + 1 where s.share_code = :share_id")
    int updateView(Long shareCode);
}
