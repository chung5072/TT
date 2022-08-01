import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
import ItemList from "../GamePlay/ItemList"
import Map from "../GamePlay/Map"
import MonsterList from "../GamePlay/MonsterList"
import PlayerProfile from "../GamePlay/PlayerProfile"
import RuleBook from "../GamePlay/RuleBook"


export default function GamePlay() {
  const divStatus = useSelector((state: RootState) => state.left.divStatus )
    return (
        <div id={divStatus === 1 ? 'player-profile-theme' : divStatus === 2 ? 'map-theme' : divStatus === 3 ? 'item-theme' : divStatus === 0 ? 'basic-theme':divStatus === 4 ? 'monster-theme' : 'rulebook-theme'}>
          <h1>GamePlay</h1>
          {divStatus === 1 ? <PlayerProfile/> : divStatus === 2 ? <Map/> : divStatus === 3 ? <ItemList/> : divStatus === 0 ? <div/>: divStatus === 4 ? <MonsterList/> : <RuleBook/>}
        </div>
        
    )
}