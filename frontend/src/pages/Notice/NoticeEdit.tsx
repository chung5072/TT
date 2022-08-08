import React, {useEffect} from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { useAppDispatch } from '../../app/hooks'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { getNoticeDetail } from '../../features/notice/noticeSlice'
import '../ArticleCreate.css'
import * as Yup from 'yup'


export default function NoticeEdit() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  let articleId = useParams().articleId
  const DOMAIN = "http://172.26.15.89:3000/"

  useEffect(() => {
    axios({ 
      method: 'GET',
      url: DOMAIN +`api/notice/${articleId}`
    })
      .then((res) => {
        dispatch(getNoticeDetail(res.data))
      })
      .catch(err => {
        console.error(err.response.data)
      })
})
const title = useSelector((state:RootState ) => state.notice.noticeTitle)
const content = useSelector((state:RootState) => state.notice.noticeContent)
const author = useSelector((state:RootState) => state.notice.noticeAuthor)
const code = useSelector((state:RootState) => state.notice.noticeCode)




const noticeEditRequest: any = (method: string, url: string, data:object) => {
  return axios({
    method,
    url: DOMAIN + url,
    data: {
      noticeCode: articleId,
      noticeTitle: title,
      noticeContent: content,
      noticeAuthor: author,

    },
  })
    .then(res => {
      console.log(res.data)
      navigate(`/notice/${articleId}`,)
    })
    .catch(err => {
      console.error(err.reponse.data)
    })
}

const formik = useFormik({
  initialValues: {noticeCode:articleId, noticeTitle: title, noticeContent: content, noticeAuthor:author},
  onSubmit: (data) => {
    console.log(data)
    noticeEditRequest('PUT', `api/notice/${articleId}`, data)}
})

    return (
      <div id='edit'>
      <div className='create-container'>
        <h1>NoticeEdit</h1>
        <form action="" onSubmit={formik.handleSubmit}>
          <div className='rows'>
            <label className='mini-title' htmlFor='noticeTitle'>Title</label>
            <div className='inp-group'>
              <input className='inp-tags' type="text" onChange={formik.handleChange} id="noticeTitle" defaultValue={title} />
              {/* {formik.touched.noticeTitle && formik.errors.noticeTitle ? (
                <div className='error-message'>{formik.errors.noticeTitle}</div>
              ) : null} */}
            </div>           
          </div>
          <div className='rows'>
            <label className='mini-title' htmlFor="noticeContent">Content</label>
              <div className='inp-group'>
                <textarea className='txtarea-tags' onChange={formik.handleChange} id="noticeContent" defaultValue={content} />
                {/* {formik.touched.noticeContent && formik.errors.noticeContent ? (
                <div className='error-message'>{formik.errors.noticeContent}</div>
              ) : null} */}
              </div>
          </div >
          <div className='btn-group'>
            <button className='edit-btn-tags' type="submit">submit</button>
            <button className='edit-btn-tags' onClick={() => navigate('/notice')}>cancle</button>
          </div>
        </form>
      </div>
    </div>
        
    )
}