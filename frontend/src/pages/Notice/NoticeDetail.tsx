import React, { useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { request } from '../../utils/axios'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import { getNoticeDetail }  from '../../features/notice/noticeSlice';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';
import { Formik, useFormik } from 'formik';

export default function NoticeDetail() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  let articleId = useParams().articleId

  function onClickUpdScrn() {
    window.location.replace("edit/" + `${articleId}`)
  }

  const DOMAIN = "http://localhost:8080/"

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
const noticeDeleteRequest: any = (method: string, url: string, data:object) => {
  return axios({
    method,
    url: DOMAIN + url
    // data: {
    //   noticeCode: articleId,
    // },
  })
    .then(res => {
      console.log(res.data)
      navigate('/notice')
    })
    .catch(err => {
      console.error(err.reponse.data)
    })
}

const title = useSelector((state:RootState ) => state.notice.noticeTitle)
const content = useSelector((state:RootState) => state.notice.noticeContent)
const author = useSelector((state:RootState) => state.notice.noticeAuthor)

const formik = useFormik({
  initialValues: {noticeCode:articleId},
  onSubmit: (data) => {
    console.log(data)
    noticeDeleteRequest('DELETE', `api/notice/${articleId}`, data)}
  })
  
  console.log(content)
    return (
        <div>
          <h1>NoticeDetail</h1>
          <form action="" onSubmit={formik.handleSubmit}>
            <div>
              <h3>
                {title}
              </h3>
            </div>
            <div>
              {author}
            </div>
            <div>
              {content}
            </div>
            <div>
              <button onClick={onClickUpdScrn}>edit</button>
              <button type='submit'>delete</button>
            </div>
          </form>
        </div>
        
    )
}