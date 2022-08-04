import { useFormik } from "formik"
import { useState } from "react"
import { useSelector } from "react-redux"
import * as Yup from 'yup'
import { useAppDispatch } from "../../app/hooks"
import { RootState } from "../../app/store"
import { setProfileDone } from "../../features/Game/GameSlice"
import { addChooseLevel, setJobInfo, subtractChooseLevel } from "../../features/Game/ProfileSlice"
import "./SetProfile.css"
import { hunter, priest, thief, warrior,wizard } from "./ProfileInfoList"
import axios from "axios"

export default function SetProfile() {
  const dispatch = useAppDispatch()
  const chooseLevel = useSelector((state: RootState) => state.profile.chooseLevel)
  const profileDone = useSelector((state:RootState) => state.game.profileDone)
  const jobInfo = useSelector((state:RootState) => state.profile.jobInfo)
  const selectJobInfo = (job:string) => {
    if (job === 'warrior') {
      dispatch(setJobInfo(warrior))
    }
    if (job === 'wizard') {
      dispatch(setJobInfo(wizard))
    }
    if (job === 'hunter') {
      dispatch(setJobInfo(hunter))
    }
    if (job === 'thief') {
      dispatch(setJobInfo(thief))
    }
    if (job === 'priest') {
      dispatch(setJobInfo(priest))
    }

    
  }
  
  const formik = useFormik({
    initialValues: {
      playerUserCode: 0,
      playerSpecies: '',
      playerName: '',
      playerLook: '',
      playerValue: '',
      playerWeapon: '',
      playerArmor: '',
      playerHP: 0,
      playerSup1: 0,
      playerSup2: 0,
      playerSup3: 0,
      playerstat1: 0,
      playerstat2: 0,
      playerstat3: 0,
      playerstat4: 0,
      playerstat5: 0,
      playerstat6: 0,
      class_name: '',
      skill1: '',
      skill2: '',
      skill3: '',
    
    },
    // validationSchema: Yup.object({
    //   playerSpecies: Yup.string()
    //   .required('Required'),
    //   playerName: Yup.string()
    //   .required('Required'),
    //   playerLook: Yup.string()
    //   .required('Required'),
    //   playerValue: Yup.string()
    //   .required('Required'),
    //   playerstat1: Yup.number()
    //   .required('Required'),
    //   playerstat2: Yup.number()
    //   .required('Required'),
    //   playerstat3: Yup.number()
    //   .required('Required'),
    //   playerstat4: Yup.number()
    //   .required('Required'),
    //   playerstat5: Yup.number()
    //   .required('Required'),
    //   playerstat6: Yup.number()
    //   .required('Required'),
    //   class_name: Yup.string()
    //   .required('Required'),

     
    // }),
    onSubmit: (profile) => {
      console.log('보내는중')
      if (profile.class_name === 'warrior') {
        formik.values.playerHP =10
        formik.values.skill1 = "피의 향기"
        formik.values.skill2 = "고유 병기의 종류"
        formik.values.skill3 = "병기의 영"
        formik.values.playerWeapon = "평범한 한손 대검"
      }
      if (profile.class_name === 'wizard') {
        formik.values.playerHP =4
        formik.values.skill1 = "주문강화"
        formik.values.skill2 = "화염탄"
        formik.values.skill3 = "마력의 방패"
        formik.values.playerWeapon = "평범한 완드"
      }
      if (profile.class_name === 'hunter') {
        formik.values.playerHP =8
        formik.values.skill1 = "암습"
        formik.values.skill2 = "프로의 솜씨"
        formik.values.skill3 = "덫 전문가"
        formik.values.playerWeapon = "평범한 활"
      }
      if (profile.class_name === 'hunter') {
        formik.values.playerHP =8
        formik.values.skill1 = "정조준"
        formik.values.skill2 = "야성의 교감"
        formik.values.skill3 = "더블샷"
        formik.values.playerWeapon = "평범한 활"
      }
      if (profile.class_name === 'thief') {
        formik.values.playerHP =6
        formik.values.skill1 = "암습"
        formik.values.skill2 = "프로의 솜씨"
        formik.values.skill3 = "덫 전문가"
        formik.values.playerWeapon = "평범한 단도"
      }
      if (profile.class_name === 'priest') {
        formik.values.playerHP =8
        formik.values.skill1 = "신 + 탄원"
        formik.values.skill2 = "치유"
        formik.values.skill3 = "천벌"
        formik.values.playerWeapon = "평범한 기도서"
      }
      console.log(profile)
      axios({
        method: 'POST',
        url: 'http://localhost:8080/api/player',
        data: profile
      })
      .then( (res) => {
        console.log(res)
      }

      )
      dispatch(setProfileDone())
    }}
  )
    return (
        <div id="select-profile-modal" className={profileDone? "off-btn" : "on"}>
          <div id="blank">{chooseLevel===-1? jobInfo.name: chooseLevel===0 ?"Select Class" : chooseLevel===1 ? "Input Profile" :"Roll Stats"}</div>
          <form action="" onSubmit={formik.handleSubmit}>

            {/* job */}
            <div id="job-form" className={chooseLevel===0 ?"on" : "off-btn"}>
              <h1>{formik.values.class_name}</h1>
              <div className="btn-box">
                <button id="warrior" name="class_name" className="job-btn" type="button" onClick={formik.handleChange} value = "warrior">전사</button>
                <button id="wizard" name="class_name" className="job-btn" type="button" onClick={formik.handleChange} value = "wizard">마법사</button>
              </div>
              <div className="btn-box">
                <button id="hunter" name="class_name" className="job-btn" type="button" onClick={formik.handleChange} value = "hunter">사냥꾼</button>
                <button id="thief" name="class_name" className="job-btn" type="button" onClick={formik.handleChange} value = "thief">도적</button>
              </div>
              <div className="btn-box">
                <button id="priest" name="class_name" className="job-btn" type="button" onClick={formik.handleChange} value = "priest">사제</button>
              </div>
            </div>
            <div id="profile-form" className={chooseLevel===1 ?"on" : "off-btn"}>
              <div className="profile-input-box">
                <label htmlFor="playerName" className="profile-label">Name</label>
                <input id="playerName" name="playerName" type="text" className="profile-input" onChange={formik.handleChange} value={ formik.values.playerName }/>
              </div>

              {/* profile */}
              <div className="profile-input-box">
                <label htmlFor="playerSpecies" className="profile-label">Species</label>
                <input id="playerSpecies" name="playerSpecies" type="text" className="profile-input" onChange={formik.handleChange} value={ formik.values.playerSpecies }/>
              </div>
              <div className="profile-input-box">
                <label htmlFor="playerLook" className="profile-label">Look</label>
                <textarea id="playerLook" name="playerLook"  className="profile-text" onChange={formik.handleChange} value={ formik.values.playerLook}/>
              </div>
              <div className="profile-input-box">
                <label htmlFor="playerValue" className="profile-label">Value</label>
                <select name="playerValue" id="playerValue" onChange={formik.handleChange} value={ formik.values.playerValue} className="profile-input">
                  <option value="good">Good</option>
                  <option value="evil">Evil</option>
                  <option value="neutral">Neutral</option>
                </select>
              </div>
            </div>
             
             {/* stat */}
            <div id="stat-form" className={chooseLevel===2 ?"on" : "off-btn"}>
              <div className="profile-stat-box">
                <label htmlFor="playerstat1" className="profile-label">Stat1 :</label>
                <div className="stat-container">
                  <span>{formik.values.playerstat1}</span>
                  <button className="stat-btn" id="playerstat1" name="playerstat1" type="button" onClick={formik.handleChange} value = {(Math.floor(Math.random() * (6 - 1 + 1) + 1)) + (Math.floor(Math.random() * (6 - 1 + 1) + 1)) + (Math.floor(Math.random() * (6 - 1 + 1) + 1))}>
                    Roll
                  </button>
                </div> 
              </div>
              <div className="profile-stat-box">
                <label htmlFor="playerstat2" className="profile-label">Stat2 :</label>
                <div className="stat-container">
                  <span>{formik.values.playerstat2}</span>
                  <button className="stat-btn" id="playerstat2" name="playerstat2" type="button" onClick={formik.handleChange} value = {(Math.floor(Math.random() * (6 - 1 + 1) + 1)) + (Math.floor(Math.random() * (6 - 1 + 1) + 1)) + (Math.floor(Math.random() * (6 - 1 + 1) + 1))}>
                    Roll
                  </button>
                </div> 
              </div>
              <div className="profile-stat-box">
                <label htmlFor="playerstat3" className="profile-label">Stat3 :</label>
                <div className="stat-container">
                  <span>{formik.values.playerstat3}</span>
                  <button className="stat-btn" id="playerstat3" name="playerstat3" type="button" onClick={formik.handleChange} value = {(Math.floor(Math.random() * (6 - 1 + 1) + 1)) + (Math.floor(Math.random() * (6 - 1 + 1) + 1)) + (Math.floor(Math.random() * (6 - 1 + 1) + 1))}>
                    Roll
                  </button>
                </div> 
              </div>
              <div className="profile-stat-box">
                <label htmlFor="playerstat4" className="profile-label">Stat4 :</label>
                <div className="stat-container">
                  <span>{formik.values.playerstat4}</span>
                  <button className="stat-btn" id="playerstat4" name="playerstat4" type="button" onClick={formik.handleChange} value = {(Math.floor(Math.random() * (6 - 1 + 1) + 1)) + (Math.floor(Math.random() * (6 - 1 + 1) + 1)) + (Math.floor(Math.random() * (6 - 1 + 1) + 1))}>
                    Roll
                  </button>
                </div> 
              </div>
              <div className="profile-stat-box">
                <label htmlFor="playerstat5" className="profile-label">Stat5 :</label>
                <div className="stat-container">
                  <span>{formik.values.playerstat5}</span>
                  <button className="stat-btn" id="playerstat5" name="playerstat5" type="button" onClick={formik.handleChange} value = {(Math.floor(Math.random() * (6 - 1 + 1) + 1)) + (Math.floor(Math.random() * (6 - 1 + 1) + 1)) + (Math.floor(Math.random() * (6 - 1 + 1) + 1))}>
                    Roll
                  </button>
                </div> 
              </div>
              <div className="profile-stat-box">
                <label htmlFor="playerstat6" className="profile-label">Stat6 :</label>
                <div className="stat-container">
                  <span>{formik.values.playerstat6}</span>
                  <button className="stat-btn" id="playerstat6" name="playerstat6" type="button" onClick={formik.handleChange} value = {(Math.floor(Math.random() * (6 - 1 + 1) + 1)) + (Math.floor(Math.random() * (6 - 1 + 1) + 1)) + (Math.floor(Math.random() * (6 - 1 + 1) + 1))}>
                    Roll
                  </button>
                </div> 
              </div>
              
            </div>

            {/* Info */}
            <div className={chooseLevel=== -1 ?"on" : "off-btn"} id="job-info">
              <div className="job-info-btn-box">
                <button onClick={() => selectJobInfo('warrior')} type="button" className="job-info-btn">Warrior</button>
                <button onClick={() => selectJobInfo('wizard')} type="button" className="job-info-btn">Wizard</button>
                <button onClick={() => selectJobInfo('hunter')} type="button" className="job-info-btn">Hunter</button>
                <button onClick={() => selectJobInfo('thief')} type="button" className="job-info-btn">Thief</button>
                <button onClick={() => selectJobInfo('priest')}type="button"  className="job-info-btn">Priest</button>
              </div>
              <div className="job-info-hp-box">
                HP : {jobInfo.hp}
              </div>
              <div className="job-info-skill-box">
                <div className="job-info-skill">
                  <span>{jobInfo.skill[0][0]} : {jobInfo.skill[0][1]}</span>
                  <span>{jobInfo.skill[0][2]}</span>
                </div>
                <div className="job-info-skill">
                  <span>{jobInfo.skill[1][0]} : {jobInfo.skill[1][1]}</span>
                  <span>{jobInfo.skill[1][2]}</span>
                </div>
                <div className="job-info-skill">
                  <span>{jobInfo.skill[1][0]} : {jobInfo.skill[1][1]}</span>
                  <span>{jobInfo.skill[1][2]}</span>
                </div>
              </div>
              <div className="job-info-value-box">
                <div className="job-info-value">
                  <span>Good : {jobInfo.value.good}</span>
                </div>
                <div className="job-info-value">
                  <span>Evil : {jobInfo.value.evil}</span>
                </div>
                <div className="job-info-value">
                  <span>Neutral : {jobInfo.value.neutral}</span>
                </div>
              </div>
            </div>
            <div className={chooseLevel===3 ?"on" : "off-btn"} id="job-submit">
              <button type="submit" className="ctrl-btn">Submit</button>
            </div>
        </form>


          {/* Navbar */}
          {chooseLevel===-1 ? <div className="nav-bot" id="first-nav-bot">
            <button onClick={() => dispatch(addChooseLevel()) } className="ctrl-btn">Next</button>
          </div> : chooseLevel===0 ?
          <div className="nav-bot">
            <button onClick={() => dispatch(subtractChooseLevel()) } className="ctrl-btn">Info</button>
            <button onClick={() => dispatch(addChooseLevel()) } className="ctrl-btn">Next</button>
          </div> : chooseLevel === 1?
          <div className="nav-bot">
            <button onClick={() => dispatch((subtractChooseLevel()))} className="ctrl-btn">Back</button>
            <button onClick={() => dispatch(addChooseLevel()) } className="ctrl-btn">Next</button>
          </div> : chooseLevel === 2?
          <div className="nav-bot">
            <button onClick={() => dispatch((subtractChooseLevel()))} className="ctrl-btn">Back</button>
            <button onClick={() => dispatch(addChooseLevel()) } className="ctrl-btn">Next</button>
            
          </div> :
          <div><button onClick={() => dispatch((subtractChooseLevel()))} className="ctrl-btn">Back</button></div>}
          
        </div>
        
    )
}