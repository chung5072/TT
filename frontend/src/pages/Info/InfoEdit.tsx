import React, {useEffect} from 'react'
// import { initialState } from "../../features/article/articleSlice"
import { Formik, useFormik } from 'formik'
import { request } from "../../utils/axios"
import axios from 'axios'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { useAppDispatch } from '../../app/hooks'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { getArticleDetail }  from '../../features/article/articleSlice';
import { Navigate } from 'react-router-dom'

export default function InfoEdit() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  let articleId = useParams().articleId
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
  
  const title = useSelector((state:RootState ) => state.info.shareTitle)
  const content = useSelector((state:RootState) => state.info.shareContent)
  const author = useSelector((state:RootState) => state.info.shareAuthor)
  const code = useSelector((state:RootState) => state.info.shareCode)




  const shareEditRequest: any = (method: string, url: string, data:object) => {
    return axios({
      method,
      url: DOMAIN + url,
      data: {
        shareCode: articleId,
        shareTitle: title,
        shareContent: content,
        shareAuthor: author,

      },
    })
      .then(res => {
        console.log(res.data)
        navigate(`/share/${articleId}`,)
      })
      .catch(err => {
        console.error(err.reponse.data)
      })
  }

  const formik = useFormik({
    initialValues: {shareCode:articleId, shareTitle: title, shareContent: content, shareAuthor:author},
    onSubmit: (data) => {
      console.log(data)
      shareEditRequest('PUT', `api/share/${articleId}`, data)}
  })

  
    return (
        <div>
          <h1>InfoEdit</h1>
          <form action="" onSubmit={formik.handleSubmit}>
            <table>
              <thead></thead>
              <tbody>
              <tr>
                <td>
                  Title
                </td>
                <td>
                  <input type="text" onChange={formik.handleChange} id="shareTitle" defaultValue={title} />
                </td>
              </tr>
              <tr>
                <td>
                  Content
                </td>
                <td>
                  <input type="text" onChange={formik.handleChange} id="shareContent" defaultValue={content} />
                </td>
              </tr>
              </tbody>
            </table>
              <button type="submit">submit</button>
              <button onClick={() => navigate('/share')}>cancle</button>
              <input type="hidden" id="shareAuthor" value={author}/>
              <input type="hidden" id="shareCode" value={code} />
          </form>

        </div>
       
        
    )
}