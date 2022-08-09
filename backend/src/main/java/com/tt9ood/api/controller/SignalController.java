package com.tt9ood.api.controller;

import com.tt9ood.api.dto.MonSignalDto;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static java.lang.String.format;

/**
 * 같은 방에 있는 사람들끼리 통보하는 controller
 * 이벤트 로그가 게임 방에 있는 정보를 관통하기에 이벤트 로그를 활용함
 * 사용처:
 * 1. GM이 누르면 맵이 이동했다는 정보를 플레이어들에게 전송
 * 2. 이벤트 로그
 *  - 지역 이동
 *  - 몬스터 등장
 */
@RestController
@RequestMapping("/api/signal")
public class SignalController {
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    /**
     * 프론트에서 메세지를 보내면 같은 방에 있는 사람들에게 통보하는 메서드
     * @MessageMapping은 client.send와 url을 맞춤
     * simpleMessagingTemplate.convertAndSend는 client.subscribe와 맞춤
     * @param gameId : 게임 방 아이디
     * @param signalMessage : 받은 메세지 - 문자열 형태
     */
    @MessageMapping("/event/{gameId}/sendSignal")
    public void sendEventSignal(@DestinationVariable String gameId, @Payload String signalMessage) {
        // 테스트 출력
        System.out.println("프론트에서 받는 메세지 = " + signalMessage);
        System.out.println("게임 방 아이디 = " + gameId);
        // 입력받은 메세지에 coords 값이 들어있다면
        // 해당 내용은 지역 이름과 관련된 로그
        if (signalMessage.contains("coords")) {
            // 문자열을 json 객체로 변환
            JSONObject jObject = new JSONObject(signalMessage);
            // 해당 키값에 있는 내용을 불러옴
            String areaName = jObject.getString("name");
            // 테스트 출력
            // System.out.println("반환할 지역 이름 = " + areaName);
            simpMessagingTemplate.convertAndSend(format("/topic/%s/eventLog", gameId) , areaName);
        }
        // 입력받은 메세지에 coords 값이 들어있지 않다면
        // 해당 내용은 현재로서는 몬스터 정보에 관련된 로그
        else {
            JSONObject jsonObject = new JSONObject(signalMessage);
            int mapArea = jsonObject.getInt("mapArea");
            int monsterId = jsonObject.getInt("monsterId");
            int monsterNum = jsonObject.getInt("monsterNum");
            // 몬스터 정보같은 경우 새로운 객체로 만들어서 반환
            MonSignalDto monSignalDto = new MonSignalDto();
            monSignalDto.setMapArea(mapArea);
            monSignalDto.setMonsterId(monsterId);
            monSignalDto.setMonsterNum(monsterNum);
            // 테스트 출력
            // System.out.println("어느 지역의 몬스터 종류인지 = " + monSignalDto.getMapArea());
            // System.out.println("해당 지역의 몬스터 아이디 = " + monSignalDto.getMonsterId());
            // System.out.println("해당 몬스터의 숫자 = " + monSignalDto.getMonsterNum());
            simpMessagingTemplate.convertAndSend(format("/topic/%s/eventLog", gameId) , monSignalDto);
        }
    }
}
