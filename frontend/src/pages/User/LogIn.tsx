import { initialState } from "../../features/user/userSlice"
import React from 'react'
import { useFormik } from 'formik'
import { request } from "../../utils/axios"
import * as Yup from 'yup'
import axios from "axios"
import { useAppDispatch } from "../../app/hooks"
import { saveToken } from "../../features/user/loginSlice"


export default function Login() {
  const dispatch = useAppDispatch()
  const DOMAIN = "http://localhost:8080/"
  const loginRequest: any = (method: string, url: string, data: object) => {
    return axios({
      url: DOMAIN + url,
      method: 'post',
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

  const formik = useFormik({
    initialValues: {id: '', password:''},
    validationSchema: Yup.object({
      id: Yup.string()
      .required('Required'),
      password: Yup.string()
      .required('Required'),
    }),
    onSubmit: (credentials) => {loginRequest('POST', 'api/user/login', credentials)} 
  
  })
    return (
      <div>
      <h1>Login</h1>
      <form action="" onSubmit={ formik.handleSubmit }>

        <label htmlFor="id">Id</label>
        <input id="id" name="id" type="text" onChange={formik.handleChange} value={ formik.values.id }/>

        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="text" onChange={formik.handleChange} value={ formik.values.password }/>
        <button type="submit">Submit</button>
      </form>
    </div>
        
    )
}