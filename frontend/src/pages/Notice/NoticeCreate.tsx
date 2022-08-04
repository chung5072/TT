import React from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function NoticeCreate() {
  const DOMAIN = "http://localhost:8080/"
  const navigate = useNavigate()

  const noticeRegisterRequest: any = (method: string, url: string, data: object) => {
    return axios({
      method,
      url: DOMAIN + url,
      data: data
    })
      .then(res => {
        console.log(res.data)
        navigate('/notice')
      })
      .catch(err => {
        console.error(err.response.data)
      })
  }

  const formik = useFormik({
    initialValues: {noticeTitle:'', noticeContent: '', noticeAuthor:''},
    onSubmit: (data) => {noticeRegisterRequest('POST', 'api/notice', data)}
  })

    return (
        <div>
          <h1>NoticeCreate</h1>
          <form action="" onSubmit={ formik.handleSubmit }>
            <label htmlFor='noticeTitle'>Title</label>
            <input id='noticeTitle' name='noticeTitle' type='text' onChange={formik.handleChange} value={formik.values.noticeTitle} />

            <label htmlFor="noticeContent">Content</label>
            <input id="noticeContent" name="noticeContent" type="text" onChange={formik.handleChange} value={ formik.values.noticeContent} />

            <button type="submit">Submit</button>
            {/* <button onClick={() => navigate('/notice')}>Cancle</button> */}
          </form>
        </div>
        
    )
}