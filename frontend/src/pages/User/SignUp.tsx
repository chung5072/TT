import { initialState } from "../../features/user/userSlice"
import React from 'react'
import { useFormik } from 'formik'
import { request } from "../../utils/axios"
import * as Yup from 'yup'

export default function SignUp() {
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
    onSubmit: (data) => {console.log(data)} 
  
  })
    return (
      <div>
      <h1>SignUp</h1>
      <form action="" onSubmit={ formik.handleSubmit }>

        <label htmlFor="userId">Id</label>
        <input id="userId" name="userId" type="text" onChange={formik.handleChange} value={ formik.values.userId }/>

        <label htmlFor="userPw">Password</label>
        <input id="userPw" name="userPw" type="text" onChange={formik.handleChange} value={ formik.values.userPw }/>

        <label htmlFor="userNickname">Nickname</label>
        <input id="userNickname" name="userNickname" type="text" onChange={formik.handleChange} value={ formik.values.userNickname }/>

        <label htmlFor="userEmail">e-mail</label>
        <input id="userEmail" name="userEmail" type="text" onChange={formik.handleChange} value={ formik.values.userEmail }/>

        <label htmlFor="userPhone">Phone</label>
        <input id="userPhone" name="userPhone" type="text" onChange={formik.handleChange} value={ formik.values.userPhone }/>

        <label htmlFor="userGender">Gender</label>
        <input id="userGender" name="userGender" type="text" onChange={formik.handleChange} value={ formik.values.userGender } />
        {/* <select name="" id="">
          <option value="">Male</option>
          <option value="">Female</option>
          <option value="">None</option>
        </select> */}
        <button type="submit">Submit</button>
      </form>
    </div>
        
    )
}