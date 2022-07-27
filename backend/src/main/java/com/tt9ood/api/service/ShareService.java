package com.tt9ood.api.service;

import com.tt9ood.api.dto.ShareDto;
import com.tt9ood.db.entity.Share;

public interface ShareService {
    Share createShare(ShareDto.Request dto);
    ShareDto.Response readShare(Long shareCode);
}
