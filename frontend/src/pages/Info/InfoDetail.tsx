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

  const DOMAIN = "http://localhost:8080/"

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

  const formik = useFormik({
    initialValues: {shareCode:articleId},
    onSubmit: (data) => {
      console.log(data)
      shareDeleteRequest('DELETE', `api/share/${articleId}`, data)}
  })
  
    return (
        <div>
          <h1>InfoDetail </h1>
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
              {like}
            </div>
            <div>
              <button onClick={onClickUpdScrn}>edit</button>
              <button type='submit'>delete</button>
            </div>
          </form>
        </div>
        
    )
}