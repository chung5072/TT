
import React from 'react'
import { useFormik } from 'formik'

import * as Yup from 'yup'
import axios from "axios"
import { useAppDispatch } from "../../app/hooks"
import { saveToken } from "../../features/user/loginSlice"

// Login Dispatch
export default function Login() {
  const dispatch = useAppDispatch()
  const DOMAIN = "http://localhost:8080/"
  const loginRequest: any = (method: string, url: string, data: object) => {
    return axios({
      method,
      url: DOMAIN + url,
      data: data
    })
      .then(res => {
        const token = res.data.key
        dispatch(saveToken(token))
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

        <label htmlFor="loginId">Id</label>
        <input id="loginId" name="loginId" type="text" onChange={formik.handleChange} value={ formik.values.userId }/>

        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="text" onChange={formik.handleChange} value={ formik.values.userPw }/>
        <button type="submit">Submit</button>
      </form>
    </div>
        
    )
}