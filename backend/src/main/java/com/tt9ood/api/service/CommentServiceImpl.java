package com.tt9ood.api.service;

import com.tt9ood.api.dto.CommentDto;
import com.tt9ood.db.entity.Comment;
import com.tt9ood.db.entity.Share;
import com.tt9ood.db.entity.User;
import com.tt9ood.db.repository.CommentRepository;
import com.tt9ood.db.repository.ShareRepository;
import com.tt9ood.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class CommentServiceImpl implements CommentService{
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final ShareRepository shareRepository;

    @Override
    public Comment commentSave(User user, Long shareCode, CommentDto.Request dto) {
        Share share = shareRepository.findById(shareCode).orElseThrow(()->
                new IllegalArgumentException("댓글 쓰기 실패: 해당 게시글이 존재하지 않습니다." + shareCode));
        dto.save(user, share);
        return commentRepository.save(dto.toEntity());
    }
}
