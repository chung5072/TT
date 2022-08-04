
import React from 'react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import axios from "axios"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import './LogIn.css'

import { saveToken } from "../../features/user/loginSlice"

// Login Dispatch
export default function Login() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const DOMAIN = "http://localhost:8080/"
  const loginRequest: any = (method: string, url: string, data: object) => {
    return axios({
      method,
      url: DOMAIN + url,
      data: data
    })
      .then(async (res) => {
        console.log(res.data)
        const token = res.data.accessToken
        const currentUser = res.data.userId
        const refreshToken = res.data.refreshToken
        const payload = {accessToken : token, currentUser: currentUser, refreshToken: refreshToken}
        await dispatch(saveToken(payload))
        navigate('/')
      })
      .catch(err => {
        console.error(err.response.data)
      })
  }
  
  //  user Formik
  const formik = useFormik({
    initialValues: {userId: '', userPw:''},
    validationSchema: Yup.object({
      userId: Yup.string()
      .required('Required'),
      userPw: Yup.string()
      .required('Required'),
    }),
    onSubmit: (credentials) => {loginRequest('POST', 'api/user/login', credentials)} 
  
  })

  // HTML
    return (
      <div id='container'>
        <div id='all-login'>
          <div id='login-form'>
            <h1 id='login-text'>Login</h1>
            <form id='login-form' action="" onSubmit={ formik.handleSubmit }>
              
              <label id='id-label' htmlFor="userId">ID</label>
              <input id="id-input" name="userId" type="text" onChange={formik.handleChange} value={ formik.values.userId }/>

              <label id='pwd-label' htmlFor="userPw">Password</label>
              <input id="pwd-input" name="userPw" type="text" onChange={formik.handleChange} value={ formik.values.userPw }/>
              <button id='login-button' type="submit">LogIn</button>
            </form>
          </div>
            <div id='login-with'>
              <div id='line'>
                <hr />
              </div>
              <div id='login-with-text'>
                <p>or LogIn with</p>
              </div>
              <div id='line'>
                <hr />
              </div>
          </div>
          <div id='login-with-btn'>
            <button id='login-with-google'></button>
            <button id='login-with-kakao'></button>  
          </div>

          <div id='find-id-pwd'>
            <p>Forgot Id or Password</p>
          </div>

        </div>
      </div>
        
    )
}