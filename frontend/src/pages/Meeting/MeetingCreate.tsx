import React from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { useFormik } from "formik"
import { useSelector } from "react-redux"
import { RootState } from "../../app/store"


export default function MeetingCreate() {
  const DOMAIN = "http://localhost:8080/"
  const navigate = useNavigate()
  let articleId = useParams().articleId

  const code = useSelector((state:RootState) => state.meeting.meetingCode)
  const meetingRegisterRequest: any = (method: string, url: string, data: object) => {
    return axios({
      method,
      url: DOMAIN + url,
      data: data
    })
    .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.error(err.response.data)
      })
  }

  const formik = useFormik({
    initialValues: {meetingCode:'', meetingTitle: '', meetingContent: '', meetingAuthor: '', meetingPyNum:'', meetingPyTime:'', meetingPositoin:''},
    onSubmit: (data) => {meetingRegisterRequest('POST', 'api/meeting/register', data)},

  })


    return (
        <div>
          <h1>MeetingCreate</h1>
          <form action="" onSubmit={ formik.handleSubmit }>
            <div>
              <label htmlFor="meetingTitle">Title</label>
              <input type="text" id="meetingTitle" name="meetingTitle" onChange={formik.handleChange} value={formik.values.meetingTitle} />
            </div>
            <div>
              <label htmlFor="meetingContent">Content</label>
              <input id="meetingContent" name="meetingContent" type="text" onChange={formik.handleChange} value={ formik.values.meetingContent} />
            </div>
            <div>
              <label htmlFor="meetingPyNum">플레이 인원</label>
              <input id="meetingPyNum" name="meetingPyNum" type="number" min="2" max="6" onChange={formik.handleChange} value={ formik.values.meetingPyNum} />
            </div>
            <div>
              <label htmlFor="meetingPyTime">입장시간</label>
              <input id="meetingPyTime" name="meetingPyTime" type="time" onChange={formik.handleChange} value={ formik.values.meetingPyTime} />
            </div>
            <div>
              <label htmlFor="meetingPosition">Position</label>
              <input id="gameMaster" type="radio" name="position" /><span>GM</span>
              <input id="gamePlayer" type="radio" name="position" /><span>Player</span>
            </div>
            <button type="submit">Create</button>
            <button onClick={() => navigate('/meeting')}>Cancle</button>
          </form>
        </div>
        
    )
}