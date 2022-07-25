import { initialState } from "../../features/user/userSlice"
import React from 'react'
import { useFormik } from 'formik'
import { sendRegisterRequest } from "../../features/user/userSlice"
import { request } from "../../utils/axios"


export default function SignUp() {
  const formik = useFormik({
    initialValues: initialState,
    onSubmit: (data) => {request('POST', 'api/user/register', data)} 
    
  })
    return (
      <div>
      <h1>SignUp</h1>
      <form action="" onSubmit={ formik.handleSubmit }>

        <label htmlFor="id">Id</label>
        <input id="id" name="id" type="text" onChange={formik.handleChange} value={ formik.values.id }/>

        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="text" onChange={formik.handleChange} value={ formik.values.password }/>

        <label htmlFor="nickname">Nickname</label>
        <input id="nickname" name="nickname" type="text" onChange={formik.handleChange} value={ formik.values.nickname }/>

        <label htmlFor="email">e-mail</label>
        <input id="email" name="email" type="text" onChange={formik.handleChange} value={ formik.values.email }/>

        <label htmlFor="phone">Phone</label>
        <input id="phone" name="phone" type="text" onChange={formik.handleChange} value={ formik.values.phone }/>

        <label htmlFor="gender">Gender</label>
        <input id="gender" name="gender" type="text" onChange={formik.handleChange} value={ formik.values.gender } />
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