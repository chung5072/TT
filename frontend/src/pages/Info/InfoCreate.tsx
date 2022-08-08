import React from 'react'
// import { initialState } from "../../features/article/articleSlice"
import { useFormik } from 'formik'
import { Formik, Field } from 'formik';
import { request } from "../../utils/axios"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../ArticleCreate.css'
import * as Yup from 'yup'


export default function InfoCreate() {
  const DOMAIN = "http://172.26.15.89:3000/"
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
    initialValues: {shareTitle:'', shareContent: ''},
    validationSchema: Yup.object({
      shareTitle: Yup.string()
        .required('제목을 입력해주세요.')
        .max(30, '30자를 초과할 수 없습니다.'),

      shareContent: Yup.string()
        .required('내용을 입력해주세요.')
        .max(1000, '1000자를 초과할 수 없습니다.')
    }),
    onSubmit: (data) => {shareRegisterRequest('POST', 'api/share/register', data)},
    })


    return (
        <div id='create'>
          <div className='create-container'>
              <h1>InfoCreate</h1>
            <form action="" onSubmit={ formik.handleSubmit }>
              <div className='rows'>
                <label className='mini-title' htmlFor='shareTitle'>Title</label>
                <div className='inp-group'>
                  <input className='inp-tags' name='shareTitle' type='text' onChange={formik.handleChange} value={formik.values.shareTitle} />
                  {formik.touched.shareTitle && formik.errors.shareTitle ? (
                    <div className='error-message'>{formik.errors.shareTitle}</div>
                  ) : null}
                </div>           
              </div>
              <div className='rows'>
                <label className='mini-title' htmlFor="shareContent">Content</label>
                <div className='inp-group'>
                  <textarea className='txtarea-tags' name="shareContent" onChange={formik.handleChange} value={ formik.values.shareContent} />
                  {formik.touched.shareContent && formik.errors.shareContent ? (
                    <div className='error-message'>{formik.errors.shareContent}</div>
                  ) : null}
                </div>
              </div>
              <div className='btn-group'>
                <button className='btn-tags' type="submit" >Submit</button>
              </div>
            </form>
          </div>
        </div>
        
    )
}

