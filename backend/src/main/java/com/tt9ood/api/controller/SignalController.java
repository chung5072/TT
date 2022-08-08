package com.tt9ood.api.controller;

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
 * 같은 방에 있는 사람들끼리 통보하는 컨트롤로
 * 사용처:
 * 1. GM이 누르면 맵이 이동했다는 정보를 플레이어들에게 전송
 * 2. 이벤트 로그
 */
@RestController
@RequestMapping("/api/signal")
public class SignalController {
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/map/{gameId}/sendSignal")
    public void sendLog(@DestinationVariable String gameId, @Payload String signalMessage) {
        System.out.println("gameId = " + gameId);
        JSONObject jObject = new JSONObject(signalMessage);
        String areaName = jObject.getString("name");
        System.out.println("areaName = " + areaName);
        simpMessagingTemplate.convertAndSend(format("/topic/%s", gameId) , areaName);
    }

}
