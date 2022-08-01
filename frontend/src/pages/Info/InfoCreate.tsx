import React from 'react'
// import { initialState } from "../../features/article/articleSlice"
import { useFormik } from 'formik'
import { request } from "../../utils/axios"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function InfoCreate() {
  const DOMAIN = "http://localhost:8080/"
  const navigate = useNavigate()

  const shareRegisterRequest: any = (method: string, url: string, data: object) => {
    return axios({
      method,
      url: DOMAIN + url,
      data: data
    })
      .then(res => {
        console.log(res.data)
        navigate('/share')
      })
      .catch(err => {
        console.error(err.response.data)
      })
  }

  const formik = useFormik({
    initialValues: {shareTitle:'', shareContent: '', shareAuthor:''},
    onSubmit: (data) => {shareRegisterRequest('POST', 'api/share/register', data)}
  })

    return (
        <div>
          <h1>InfoCreate</h1>
          <form action="" onSubmit={ formik.handleSubmit }>
            <label htmlFor='shareTitle'>Title</label>
            <input id='shareTitle' name='shareTitle' type='text' onChange={formik.handleChange} value={formik.values.shareTitle} />

            <label htmlFor="shareContent">Content</label>
            <input id="shareContent" name="shareContent" type="text" onChange={formik.handleChange} value={ formik.values.shareContent} />

            <label htmlFor="shareAuthor">Author</label>
            <input id="shareAuthor" name="shareAuthor" type="text" onChange={formik.handleChange} value={ formik.values.shareAuthor} />

            <button type="submit">Submit</button>
          </form>
        </div>
        
    )
}

