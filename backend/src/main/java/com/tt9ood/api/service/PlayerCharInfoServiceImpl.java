package com.tt9ood.api.service;

import com.tt9ood.api.dto.PlayerCharInfoDto;
import com.tt9ood.db.entity.PlayerCharInfo;
import com.tt9ood.db.repository.PlayerCharInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Optional;

@Service("PlayerCharInfoService")
public class PlayerCharInfoServiceImpl implements PlayerCharInfoService {

    @Autowired
    PlayerCharInfoRepository playerCharInfoRepository;

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public PlayerCharInfo createPlayerInfo(PlayerCharInfoDto playerInfoDto) {
        PlayerCharInfo playerCharInfo=new PlayerCharInfo(playerInfoDto.getPlayerCode(),
                playerInfoDto.getPlayerUserCode(),
                playerInfoDto.getPlayerSpecies(),
                playerInfoDto.getPlayerName(),
                playerInfoDto.getPlayerLook(),
                playerInfoDto.getPlayerValue(),
                playerInfoDto.getPlayerWeapon(),
                playerInfoDto.getPlayerArmor(),
                playerInfoDto.getPlayerHP(),
                playerInfoDto.getPlayerSup1(),
                playerInfoDto.getPlayerSup2(),
                playerInfoDto.getPlayerSup3(),
                playerInfoDto.getPlayerStat1(),
                playerInfoDto.getPlayerStat2(),
                playerInfoDto.getPlayerStat3(),
                playerInfoDto.getPlayerStat4(),
                playerInfoDto.getPlayerStat5(),
                playerInfoDto.getPlayerStat6(),
                playerInfoDto.getPlayerClassName(),
                playerInfoDto.getPlayerSkill1(),
                playerInfoDto.getPlayerSkill2(),
                playerInfoDto.getPlayerSkill3());
        return playerCharInfoRepository.save(playerCharInfo);
    }

    @Override
    public PlayerCharInfoDto readPlayerInfo(long playerCode) {
        PlayerCharInfoDto playerInfoDto=new PlayerCharInfoDto();
        Optional<PlayerCharInfo> byId=playerCharInfoRepository.findById(playerCode);
        if(byId!=null){
            PlayerCharInfo playerInfo=byId.get();
            playerInfoDto.setPlayerUserCode(playerInfo.getPlayerUserCode());
            playerInfoDto.setPlayerSpecies(playerInfo.getPlayerSpecies());
            playerInfoDto.setPlayerName(playerInfo.getPlayerName());
            playerInfoDto.setPlayerLook(playerInfo.getPlayerLook());
            playerInfoDto.setPlayerValue(playerInfo.getPlayerValue());
            playerInfoDto.setPlayerWeapon(playerInfo.getPlayerWeapon());
            playerInfoDto.setPlayerArmor(playerInfo.getPlayerArmor());
            playerInfoDto.setPlayerHP(playerInfo.getPlayerHP());
            playerInfoDto.setPlayerSup1(playerInfo.getPlayerSup1());
            playerInfoDto.setPlayerSup2(playerInfo.getPlayerSup2());
            playerInfoDto.setPlayerSup3(playerInfo.getPlayerSup3());
            playerInfoDto.setPlayerStat1(playerInfo.getPlayerStat1());
            playerInfoDto.setPlayerStat2(playerInfo.getPlayerStat2());
            playerInfoDto.setPlayerStat3(playerInfo.getPlayerStat3());
            playerInfoDto.setPlayerStat4(playerInfo.getPlayerStat4());
            playerInfoDto.setPlayerStat5(playerInfo.getPlayerStat5());
            playerInfoDto.setPlayerStat6(playerInfo.getPlayerStat6());
            playerInfoDto.setPlayerClassName(playerInfo.getPlayerClassName());
            playerInfoDto.setPlayerSkill1(playerInfo.getPlayerSkill1());
            playerInfoDto.setPlayerSkill2(playerInfo.getPlayerSkill2());
            playerInfoDto.setPlayerSkill3(playerInfo.getPlayerSkill3());

            return playerInfoDto;
        }
        return null;
    }

    @Override
    public PlayerCharInfoDto updatePlayerInfo(long playerCode, PlayerCharInfoDto playerInfoForUpdate) {
        PlayerCharInfoDto playerInfoDto=new PlayerCharInfoDto();

        Optional<PlayerCharInfo> byId=playerCharInfoRepository.findById(playerCode);
        if(byId!=null){
            PlayerCharInfo playerInfo=byId.get();

            playerInfo.updatePlayerCharInfo(playerInfoForUpdate.getPlayerCode(),
                    playerInfoForUpdate.getPlayerUserCode(),
                    playerInfoForUpdate.getPlayerSpecies(),
                    playerInfoForUpdate.getPlayerName(),
                    playerInfoForUpdate.getPlayerLook(),
                    playerInfoForUpdate.getPlayerValue(),
                    playerInfoForUpdate.getPlayerWeapon(),
                    playerInfoForUpdate.getPlayerArmor(),
                    playerInfoForUpdate.getPlayerHP(),
                    playerInfoForUpdate.getPlayerSup1(),
                    playerInfoForUpdate.getPlayerSup2(),
                    playerInfoForUpdate.getPlayerSup3(),
                    playerInfoForUpdate.getPlayerStat1(),
                    playerInfoForUpdate.getPlayerStat2(),
                    playerInfoForUpdate.getPlayerStat3(),
                    playerInfoForUpdate.getPlayerStat4(),
                    playerInfoForUpdate.getPlayerStat5(),
                    playerInfoForUpdate.getPlayerStat6(),
                    playerInfoForUpdate.getPlayerClassName(),
                    playerInfoForUpdate.getPlayerSkill1(),
                    playerInfoForUpdate.getPlayerSkill2(),
                    playerInfoForUpdate.getPlayerSkill3());

            playerCharInfoRepository.flush();
            entityManager.clear();

            playerInfoDto.setPlayerUserCode(playerInfo.getPlayerUserCode());
            playerInfoDto.setPlayerName(playerInfo.getPlayerName());
            playerInfoDto.setPlayerLook(playerInfo.getPlayerLook());
            playerInfoDto.setPlayerValue(playerInfo.getPlayerValue());
            playerInfoDto.setPlayerWeapon(playerInfo.getPlayerWeapon());
            playerInfoDto.setPlayerArmor(playerInfo.getPlayerArmor());
            playerInfoDto.setPlayerHP(playerInfo.getPlayerHP());
            playerInfoDto.setPlayerSup1(playerInfo.getPlayerSup1());
            playerInfoDto.setPlayerSup2(playerInfo.getPlayerSup2());
            playerInfoDto.setPlayerSup3(playerInfo.getPlayerSup3());
            playerInfoDto.setPlayerStat1(playerInfo.getPlayerStat1());
            playerInfoDto.setPlayerStat2(playerInfo.getPlayerStat2());
            playerInfoDto.setPlayerStat3(playerInfo.getPlayerStat3());
            playerInfoDto.setPlayerStat4(playerInfo.getPlayerStat4());
            playerInfoDto.setPlayerStat5(playerInfo.getPlayerStat5());
            playerInfoDto.setPlayerStat6(playerInfo.getPlayerStat6());
            playerInfoDto.setPlayerClassName(playerInfo.getPlayerClassName());
            playerInfoDto.setPlayerSkill1(playerInfo.getPlayerSkill1());
            playerInfoDto.setPlayerSkill2(playerInfo.getPlayerSkill2());
            playerInfoDto.setPlayerSkill3(playerInfo.getPlayerSkill3());

            return playerInfoDto;

        }
        return null;
    }

    @Override
    public void deletePlayerInfo(long playerCode) {
        Optional<PlayerCharInfo> byId=playerCharInfoRepository.findById(playerCode);
        PlayerCharInfo playerInfo=null;

        if(byId!=null)
            playerInfo=byId.get();

        playerCharInfoRepository.delete(playerInfo);

    }
}
