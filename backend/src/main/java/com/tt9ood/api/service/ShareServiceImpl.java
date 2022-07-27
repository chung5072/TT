package com.tt9ood.api.service;

import com.tt9ood.api.dto.ShareDto;
import com.tt9ood.db.entity.Share;
import com.tt9ood.db.repository.ShareRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("shareService")
public class ShareServiceImpl implements ShareService{

    @Autowired
    ShareRepository shareRepository;

    @Override
    public Share createShare(ShareDto.Request dto) {
        Share share = dto.toEntity();
        return shareRepository.save(share);
    }

    @Override
    public ShareDto.Response readShare(Long shareCode) {
        return null;
    }
}
