import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
import {warrior, wizard, hunter, thief, priest} from "../Game/ProfileInfoList"
import ProfileSlice, { getPlayerProfile } from "../../features/Game/ProfileSlice"
import { useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { getRoomInfo } from "../../features/room/RoomSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import './PlayerProfile.css'


export default function PlayerProfile() {
    const playerNum = useSelector((state: RootState) => state.left.playerNum)
    const playerUserCode = useSelector((state:RootState)=>state.profile.playerUserCode)
    let roomInfo = useParams().gameId
    const player1 = useAppSelector((state:RootState) => state.room.py1Code)
    const player2 = useAppSelector((state:RootState) => state.room.py2Code)
    const player3 = useAppSelector((state:RootState) => state.room.py3Code)
    const player4 = useAppSelector((state:RootState) => state.room.py4Code)
    const player5 = useAppSelector((state:RootState) => state.room.py5Code)
    const thisPlayerCode = playerNum === 1? player1: playerNum === 2? player2 : playerNum === 3? player3: playerNum === 4? player4 : player5
    const dispatch = useAppDispatch()

    const DOMAIN = "http://localhost:8080/"
    useEffect(() => {
      console.log(player1)
      axios({
        method: 'GET',
        url: DOMAIN + `api/player/${thisPlayerCode}`
      })
      .then((res) => {
        console.log(res.data)
        dispatch(getPlayerProfile(res.data))
      })
      .catch(err => {
        console.error(err.response.data)
      })
    })

    
    
    const species = useSelector((state:RootState)=>state.profile.playerSpecies)
    const name = useSelector((state:RootState)=>state.profile.playerName)
    const look = useSelector((state:RootState)=>state.profile.playerLook)
    const value = useSelector((state:RootState)=>state.profile.playerValue)
    const weapon = useSelector((state:RootState)=>state.profile.playerWeapon)
    const armor = useSelector((state:RootState)=>state.profile.playerArmor)
    const hp = useSelector((state:RootState)=>state.profile.playerHP)
    const level = useSelector((state:RootState)=>state.profile.chooseLevel)
    const job = useSelector((state:RootState)=>state.profile.playerClass)
    const sup1 = useSelector((state:RootState)=>state.profile.playerSup1)
    const sup2 = useSelector((state:RootState)=>state.profile.playerSup2)
    const sup3 = useSelector((state:RootState)=>state.profile.playerSup3)
    const stat1 = useSelector((state:RootState)=>state.profile.playerstat1)
    const stat2 = useSelector((state:RootState)=>state.profile.playerstat2)
    const stat3 = useSelector((state:RootState)=>state.profile.playerstat3)
    const stat4 = useSelector((state:RootState)=>state.profile.playerstat4)
    const stat5 = useSelector((state:RootState)=>state.profile.playerstat5)
    const stat6 = useSelector((state:RootState)=>state.profile.playerstat6)
    const skill1 = useSelector((state:RootState)=>state.profile.skill1)
    const skill2 = useSelector((state:RootState)=>state.profile.skill2)
    const skill3 = useSelector((state:RootState)=>state.profile.skill3)

    return (
      <div id="player-profile">
      {/* {playerNum === selectPyNum() ? */}
      <div className="">
        <h1>PlayerProfile {playerNum}</h1>
          <div>
            <label className="gameprofile-subtitle" htmlFor="name">name</label>
            {name}
          </div>
          <div>
            <label className="gameprofile-subtitle" htmlFor="job">job</label>
            {job}
          </div>
          <div>
            <label className="gameprofile-subtitle" htmlFor="species">species</label>
            {species}
          </div>
          <div>
            <label className="gameprofile-subtitle" htmlFor="look">look</label>
            {look}
          </div>            
          <div>
            <label className="gameprofile-subtitle" htmlFor="value">value</label>
            {value}
          </div>
          <div>
            <label className="gameprofile-subtitle" htmlFor="weapon">weapon</label>
            {weapon}
          </div>
          <div>
            <label className="gameprofile-subtitle" htmlFor="armor">armor</label>
            {armor}
          </div>
          <div>
            <label className="gameprofile-subtitle" htmlFor="hp">hp</label>
            {hp}
          </div>
          <div>
            <label className="gameprofile-subtitle" htmlFor="level">level</label>
            {level}
          </div>
          <div>
            <label className="gameprofile-subtitle" htmlFor="sup">sup</label>
            {sup1}
            {sup2}
            {sup3}
          </div>
          <div>
            <label className="gameprofile-subtitle" htmlFor="stat">stat</label>
            {stat1}
            {stat2}
            {stat3}
            {stat4}
            {stat5}
            {stat6}
          </div>
          <div>
            <label className="gameprofile-subtitle" htmlFor="skill">skill</label>
            {skill1}
            {skill2}
            {skill3}
          </div>
      </div> 
      {/* : null} */}
      </div>
    )
}