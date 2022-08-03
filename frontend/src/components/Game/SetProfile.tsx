import { useFormik } from "formik"
import { useState } from "react"
import { useSelector } from "react-redux"
import * as Yup from 'yup'
import { useAppDispatch } from "../../app/hooks"
import { RootState } from "../../app/store"
import { addChooseLevel, subtractChooseLevel } from "../../features/Game/ProfileSlice"
import "./SetProfile.css"

export default function SetProfile() {
  const dispatch = useAppDispatch()
  const chooseLevel = useSelector((state: RootState) => state.profile.chooseLevel)
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
      class_name: '11',
      skill1: '',
      skill2: '',
      skill3: '',
    
    },
    validationSchema: Yup.object({
      playerSpecies: Yup.string()
      .required('Required'),
      playerName: Yup.string()
      .required('Required'),
      playerLook: Yup.string()
      .required('Required'),
      playerValue: Yup.string()
      .required('Required'),
      playerWeapon: Yup.string()
      .required('Required'),
      playerArmor: Yup.string()
      .required('Required'),
      playerstat1: Yup.number()
      .required('Required'),
      playerstat2: Yup.number()
      .required('Required'),
      playerstat3: Yup.number()
      .required('Required'),
      playerstat4: Yup.number()
      .required('Required'),
      playerstat5: Yup.number()
      .required('Required'),
      playerstat6: Yup.number()
      .required('Required'),
      class_name: Yup.string()
      .required('Required'),

     
    }),
    onSubmit: (credentials) => console.log('done')}
  )
    return (
        <div id="select-profile-modal">
          <div id="blank"></div>
          <form action="" onSubmit={formik.handleSubmit}>
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
              <h1>hi</h1>
            </div>
          </form>
          <div id="nav-bot">
            <button onClick={() => dispatch((subtractChooseLevel()))} className="ctrl-btn">Back</button>
            <button onClick={() => dispatch(addChooseLevel()) } className="ctrl-btn">Next</button>
          </div>
        </div>
        
    )
}