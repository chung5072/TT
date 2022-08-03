package com.tt9ood.api.dto;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 플레이어 캐릭터 전달 클래스
 */
@Getter
@Setter
@NoArgsConstructor
@ApiModel("PlayerCharInfoDto")
public class PlayerCharInfoDto {

    private Long playerCode;
    private String playerSpecies;
    private String playerName;
    private String playerLook;
    private String playerValue;
    private String playerWeapon;
    private String playerArmor;
    private Long playerHP;
    private Long playerSup1;
    private Long playerSup2;
    private Long playerSup3;
    private Long playerUserCode;
    private Long playerStat1;
    private Long playerStat2;
    private Long playerStat3;
    private Long playerStat4;
    private Long playerStat5;
    private Long playerStat6;
    private String playerClassName;
    private String playerSkill1;
    private String playerSkill2;
    private String playerSkill3;

    public PlayerCharInfoDto(Long playerCode, Long playerUserCode, String playerSpecies, String playerName, String playerLook, String playerValue, String playerWeapon, String playerArmor, Long playerHP, Long playerSup1, Long playerSup2, Long playerSup3, Long playerStat1, Long playerStat2, Long playerStat3, Long playerStat4, Long playerStat5, Long playerStat6, String playerClassName, String playerSkill1, String playerSkill2, String playerSkill3) {
        this.playerCode = playerCode;
        this.playerUserCode = playerUserCode;
        this.playerSpecies = playerSpecies;
        this.playerName = playerName;
        this.playerLook = playerLook;
        this.playerValue = playerValue;
        this.playerWeapon = playerWeapon;
        this.playerArmor = playerArmor;
        this.playerHP = playerHP;
        this.playerSup1 = playerSup1;
        this.playerSup2 = playerSup2;
        this.playerSup3 = playerSup3;
        this.playerStat1 = playerStat1;
        this.playerStat2 = playerStat2;
        this.playerStat3 = playerStat3;
        this.playerStat4 = playerStat4;
        this.playerStat5 = playerStat5;
        this.playerStat6 = playerStat6;
        this.playerClassName = playerClassName;
        this.playerSkill1 = playerSkill1;
        this.playerSkill2 = playerSkill2;
        this.playerSkill3 = playerSkill3;
    }
}
