import { initialState } from "../../features/user/userSlice"
import React from 'react'
import { useFormik } from 'formik'
import { request } from "../../utils/axios"
import * as Yup from 'yup'
import './SignUp.css'
import axios from "axios"
import {Select} from "@chakra-ui/select"
import { useNavigate } from "react-router-dom"

export default function SignUp() {
  // const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const DOMAIN = "http://localhost:8080/"
  const registerRequest: any = (method: string, url: string, data: object) => {
    return axios({
      method,
      url: url,
      data: data
    })
      .then((res) =>{ 
      
      console.log(res.data)
      navigate('/')
    })
      .catch(err => {
        console.error(err.response.data)
      })
  }

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: Yup.object({
      userId: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
      userPw: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .min(10, 'Must be 10 characters or more')
      .required('Required'),
      userNickname: Yup.string()
      .max(10, 'Must be 10 characters or less')
      .required('Required'),
      userEmail: Yup.string()
      .email('Invalid email address')
      .required('Required'),
      userPhone: Yup.string()
      .required('Required'),
      userGender: Yup.string() 
      .required('Required')
    }),
    onSubmit: (credentials) => {
      console.log(credentials)
      {registerRequest('POST','/api' + '/user/register', credentials)}
    } 
    
  })
  const test: any = () => {
    console.log('아아아아앙ㅜㅜ')
  }
    return (
      <div className="signup-background" id='container'>
        <div id='all-signup'>
          <div id='signup-form'>
            <h1 id='signup-text'>SignUp</h1>
            <form id='signup-form' action="" onSubmit={formik.handleSubmit}>

            <label className="signup-label" htmlFor="userId">Id</label>
            <input id="userId" name="userId" type="text" onChange={formik.handleChange} value={ formik.values.userId }/>

            <label className="signup-label" htmlFor="userPw">Password</label>
            <input id="userPw" name="userPw" type="password" onChange={formik.handleChange} value={ formik.values.userPw }/>

            <label className="signup-label" htmlFor="userNickname">Nickname</label>
            <input id="userNickname" name="userNickname" type="text" onChange={formik.handleChange} value={ formik.values.userNickname }/>

            <label className="signup-label"  htmlFor="userEmail">e-mail</label>
            <input id="userEmail" name="userEmail" type="text" onChange={formik.handleChange} value={ formik.values.userEmail }/>

            <label className="signup-label"  htmlFor="userPhone">Phone</label>
            <input id="userPhone" name="userPhone" type="text" onChange={formik.handleChange} value={ formik.values.userPhone }/>

            <label className="signup-label" htmlFor="userGender">Gender</label>
            <select id="userGender" name="userGender" onChange={formik.handleChange} value={ formik.values.userGender }>
              <option value="1">Male</option>
              <option value="2">Female</option>
              <option value="3">None</option>
            </select>
            <button id="signup-button" type="submit">Sign up</button>
          </form>
          </div>
          <div id='signup-with'>
              <div id='line'>
                <hr />
              </div>
              <div id='signup-with-text'>
                <p>or Sign Up with</p>
              </div>
              <div id='line'>
                <hr />
              </div>
          </div>
          <div className='signup-with-btn'>
            <div className='signup-with-naver'></div>
            {/* <button className='signup-with-kakao'></button>   */}
          </div>
        </div>
    </div>
        
    )
}