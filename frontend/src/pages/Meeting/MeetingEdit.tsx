import React, {useEffect} from 'react'
import { Formik, useFormik } from 'formik'
import { request } from "../../utils/axios"
import axios from 'axios'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { useAppDispatch } from '../../app/hooks'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { getMeetingDetail }  from '../../features/meeting/meetingSlice';
import { Navigate } from 'react-router-dom'

export default function MeetingEdit() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  let articleId = useParams().articleId
  console.log(articleId)

  const DOMAIN = "http://localhost:8080/"

  useEffect(() => {
    console.log(articleId)
      axios({ 
        method: 'GET',
        url: DOMAIN + `api/meeting/${articleId}`
      })
        .then((res) => {
          dispatch(getMeetingDetail(res.data))
        })
        .catch(err => {
          console.error(err.response.data)
        })
  })
  
  const title = useSelector((state:RootState ) => state.meeting.meetingTitle)
  const content = useSelector((state:RootState) => state.meeting.meetingContent)
  const author = useSelector((state:RootState) => state.meeting.meetingAuthor)
  const code = useSelector((state:RootState) => state.meeting.meetingCode)
  const player = useSelector((state:RootState) => state.meeting.meetingPyNum)
  const time = useSelector((state:RootState) => state.meeting.meetingPyTime)



  const meetingEditRequest: any = (method: string, url: string, data:object) => {
    return axios({
      method,
      url: DOMAIN + url,
      data: {
        meetingCode: articleId,
        meetingTitle: title,
        meetingContent: content,
        meetingAuthor: author,
        meetingPyNum: player,
        meetingPyTime: time,
      },
    })
      .then(res => {
        console.log(res.data)
        navigate(`/meeting/${articleId}`,)
      })
      .catch(err => {
        console.error(err.reponse.data)
      })
  }

  const formik = useFormik({
    initialValues: {meetingCode:articleId, meetingTitle: title, meetingContent: content, meetingAuthor:author},
    onSubmit: (data) => {
      console.log(data)
      meetingEditRequest('PUT', `api/meeting/${articleId}`, data)}
  })


  return (
        <div>
          <h1>MeetingEdit</h1>
          <form action="" onSubmit={ formik.handleSubmit }>
            <table>
              <thead></thead>
              <tbody>
                <tr>
                  <td>
                    Title
                  </td>
                  <td>
                    <input type="text" onChange={ formik.handleChange } id="meetingTitle" defaultValue={title} />
                  </td>
                </tr>
                <tr>
                  <td>
                    Content
                  </td>
                  <td>
                    <input type="text" onChange={ formik.handleChange } id="meetingContent" defaultValue={content} />
                  </td>
                </tr>
              </tbody>
            </table>
            <button type="submit">submit</button>
            <button onClick={() => navigate('/meeting')}>cancle</button>
          </form>
        </div>
        
    )
}