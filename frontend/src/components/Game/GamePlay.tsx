import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
import GmControl from "../GamePlay/GmControl"
import ItemList from "../GamePlay/ItemList"
import Map from "../GamePlay/Map"
import MonsterList from "../GamePlay/MonsterList"
import PlayerProfile from "../GamePlay/PlayerProfile"
import RuleBook from "../GamePlay/RuleBook"
import "./GamePlay.css"

export default function GamePlay({client, gameId} : {client : any, gameId : any}) {
  const divStatus = useSelector((state: RootState) => state.left.divStatus )
    return (
        <div className="game-play" id={divStatus === 1 ? 'player-profile-theme' : divStatus === 2 ? 'map-theme' : divStatus === 3 ? 'item-theme' : divStatus === 0 ? 'basic-theme':divStatus === 4 ? 'monster-theme' : 'rulebook-theme'}>
          {divStatus === 1 ? <PlayerProfile/> : divStatus === 2 ? <Map/> : divStatus === 3 ? <ItemList/> : divStatus === 0 ? <div/>: divStatus === 4 ? <MonsterList/> : divStatus === 5 ? <RuleBook/>: <GmControl/>}
          {divStatus === 1 ? <PlayerProfile/> : divStatus === 2 ? <Map client = {client} gameId = {gameId}/> : divStatus === 3 ? <ItemList/> : divStatus === 0 ? <div/>: divStatus === 4 ? <MonsterList/> : divStatus === 5 ? <RuleBook/>: <GmControl/>}
        </div>
        
    )
}
