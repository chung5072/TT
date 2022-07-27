package com.tt9ood.api.controller;

import com.tt9ood.api.dto.ShareDto;
import com.tt9ood.api.service.ShareService;
import com.tt9ood.common.model.response.BaseResponseBody;
import com.tt9ood.db.entity.Share;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/share")
@RequiredArgsConstructor
@RestController
public class ShareController {
    @Autowired
    private final ShareService shareService;

    /*
     정보 공유 게시글 작성 CREATE
     */
    @PostMapping("/register")
    @ApiOperation(value = "정보 공유 게시글 작성", notes = "정보 공유 게시글을 작성한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> save(@RequestBody ShareDto.Request dto){
        Share share = shareService.createShare(dto);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    /*
     정보 공유 게시글 조회 READ
     */
    @GetMapping("{shareCode}")
    @ApiOperation(value = "정보 공유 게시글 조회", notes = "정보 공유 게시글을 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> read(@PathVariable Long shareCode){
        return null;
    }

}
