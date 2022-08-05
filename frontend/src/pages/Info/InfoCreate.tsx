import React from 'react'
// import { initialState } from "../../features/article/articleSlice"
import { useFormik } from 'formik'
import { request } from "../../utils/axios"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../ArticleCreate.css'

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
        console.log(1, res.data)
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
        <div id='create'>
          <div className='create-container'>
              <h1>InfoCreate</h1>
            <form action="" onSubmit={ formik.handleSubmit }>
              <div className='rows'>
                <label className='mini-title' htmlFor='shareTitle'>Title</label>
                <div className='inp-group'>
                  <input className='inp-tags' id='shareTitle' name='shareTitle' type='text' onChange={formik.handleChange} value={formik.values.shareTitle} />
                </div>           
              </div>
              <div className='rows'>
                <label className='mini-title' htmlFor="shareContent">Content</label>
                <div className='inp-group'>
                  <textarea className='txtarea-tags' id="shareContent" name="shareContent" onChange={formik.handleChange} value={ formik.values.shareContent} />
                </div>
              </div>
              <div className='btn-group'>
                <button className='btn-tags' type="submit">Submit</button>
              </div>
              {/* <button onClick={() => navigate('/share')}>Cancle</button> */}
            </form>
          </div>
        </div>
        
    )
}

