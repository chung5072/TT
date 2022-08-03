
import React from 'react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import axios from "axios"
import { useAppDispatch, useAppSelector } from "../../app/hooks"

import { saveToken } from "../../features/user/loginSlice"
import { fetchProfile } from '../../features/user/userSlice'

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
        axios({
          method: "GET",
          url: `http://localhost:8080/api/user/userinfo/${localStorage.getItem('current_user')}`,
          
        })
          .then((res) => {
            dispatch(fetchProfile(res.data))
            localStorage.setItem('userCode', res.data.userCode)
          })
          .catch((err) => {
            console.error(err.response.data);
          });
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
      <div>
      <h1>Login</h1>
      <form action="" onSubmit={ formik.handleSubmit }>

        <label htmlFor="userId">Id</label>
        <input id="loginId" name="userId" type="text" onChange={formik.handleChange} value={ formik.values.userId }/>

        <label htmlFor="userPw">Password</label>
        <input id="password" name="userPw" type="text" onChange={formik.handleChange} value={ formik.values.userPw }/>
        <button type="submit">Submit</button>
      </form>
    </div>
        
    )
}