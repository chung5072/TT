package com.tt9ood.api.service;


import com.tt9ood.api.dto.CommentDto;
import com.tt9ood.db.entity.Comment;
import com.tt9ood.db.entity.User;

public interface CommentService {
    Comment commentSave(User user, Long shareCode, CommentDto.Request dto);
}
