import React, { useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { request } from '../../utils/axios'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import { getArticleDetail }  from '../../features/article/articleSlice';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';
import { Formik, useFormik } from 'formik';
import { Root } from 'react-dom/client';
import '../ArticleDetail.css'


export default function InfoDetail() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  let articleId = useParams().articleId
  

  function onClickUpdScrn() {
    window.location.replace("/share/edit/" + `${articleId}`)
  }

  const onClickDeleteBtn = () => {
    return axios.delete(`api/share/${articleId}`)
  }

  const DOMAIN = "https://i7a809.p.ssafy.io/"

  useEffect(() => {
      axios({ 
        method: 'GET',
        url: DOMAIN +`api/share/${articleId}`
      })
        .then((res) => {
          dispatch(getArticleDetail(res.data))

        })
        .catch(err => {
          console.error(err.response.data)
        })
  })
  const shareDeleteRequest: any = (method: string, url: string, data:object) => {
    return axios({
      method,
      url: DOMAIN + url
      // data: {
      //   shareCode: articleId,
      // },
    })
      .then(res => {
        console.log(res.data)
        navigate('/share')
      })
      .catch(err => {
        console.error(err.reponse.data)
      })
  }


  const title = useSelector((state:RootState ) => state.info.shareTitle)
  const content = useSelector((state:RootState) => state.info.shareContent)
  const author = useSelector((state:RootState) => state.info.shareAuthor)
  const like = useSelector((state:RootState) => state.info.shareLike)
  const view = useSelector((state:RootState) => state.info.shareView)

  const formik = useFormik({
    initialValues: {shareCode:articleId},
    onSubmit: (data) => {
      console.log(data)
      shareDeleteRequest('DELETE', `api/share/${articleId}`, data)}
  })
  
    return (
        <div id='detail'>
          <div className='detail-container'>
            <h1 className='detail-title'>{title}</h1>
            <form action="" onSubmit={formik.handleSubmit}>
              <div className='author-views'>
                <div className='postedby'>
                  <label className='author-tag' htmlFor="shareAuthor">POSTED BY | </label>
                  <div className='author-name'>
                    {author}
                  </div>
                </div>
                <div className='views'>
                  <label className='view-tag' htmlFor="shareView">VIEWS | </label>
                  <div className='view-cnt'>
                    {view}
                  </div>
                </div>
              </div>
              <div className='detail-rows'>
                {/* <label className='detail-mini-title' htmlFor="shareContent">CONTENT</label> */}
                <div className='content-part'>
                  {content}
                </div>
              </div>
              <div className='detail-rows'>
                <div className='like-part'>
                  <div>
                      {like}
                  </div>
                  <div>
                    <button className='like-btn'>like</button>
                  </div>
                </div>
              </div>
              <div className='detail-btn-group'>
                <button className='detail-btn' onClick={onClickUpdScrn}>edit</button>
                <button className='detail-btn' type='submit'>delete</button>
              </div>
              <hr className='comment-hr'/>
                <div className='mini-comment-title'>
                  comment
                </div>
              <hr className='comment-hr'/>
              <div className='comment-part'>
                댓글이 없습니다.
              </div>
            </form>
          </div>
        </div>
        
    )
}