import React, {useEffect} from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { useAppDispatch } from '../../app/hooks'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { getNoticeDetail } from '../../features/notice/noticeSlice'


export default function NoticeEdit() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  let articleId = useParams().articleId
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
        <div>
          <h1>NoticeEdit</h1>
          <form action="" onSubmit={formik.handleSubmit}>
            <table>
              <thead></thead>
              <tbody>
              <tr>
                <td>
                  Title
                </td>
                <td>
                  <input type="text" onChange={formik.handleChange} id="noticeTitle" defaultValue={title} />
                </td>
              </tr>
              <tr>
                <td>
                  Content
                </td>
                <td>
                  <input type="text" onChange={formik.handleChange} id="noticeContent" defaultValue={content} />
                </td>
              </tr>
              </tbody>
            </table>
              <button type="submit">submit</button>
              <button onClick={() => navigate('/notice')}>cancle</button>
              <input type="hidden" id="noticeAuthor" value={author}/>
              <input type="hidden" id="noticeCode" value={code} />
            </form>
        </div>
        
    )
}