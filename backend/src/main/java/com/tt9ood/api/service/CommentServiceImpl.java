package com.tt9ood.api.service;

import com.tt9ood.api.dto.CommentDto;
import com.tt9ood.db.entity.Comment;
import com.tt9ood.db.entity.Share;
import com.tt9ood.db.repository.CommentRepository;
import com.tt9ood.db.repository.ShareRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service("commentService")
public class CommentServiceImpl implements CommentService {
    @Autowired
    ShareRepository shareRepository;
    @Autowired
    CommentRepository commentRepository;

    /**
     * 생성
     * @param shareCode 공유 게시글 고유 코드
     * @param commentDto 댓글 내용
     * @return 저장한 공유 게시글
     */
    @Override
    public Comment createComment(Long shareCode, CommentDto commentDto) {
        Comment comment = new Comment();

        comment.setCommentAuthor(commentDto.getCommentAuthor());
        comment.setCommentContent(commentDto.getCommentContent());
        // id에 해당하는 공유 게시글 찾아옴
        Optional<Share> byId = shareRepository.findById(shareCode);
        Share findShare = byId.get();
        findShare.addComment(comment);

        commentRepository.save(comment);
        shareRepository.save(findShare);

        return comment;
    }

    @Override
    public List<CommentDto> readAllComment(Long shareCode) {
        List<CommentDto> findAllCommentByshareCode = commentRepository.findAllByshareCode(shareCode);
        return findAllCommentByshareCode;
    }

    // 조회

    // 삭제

    // 수정
}
