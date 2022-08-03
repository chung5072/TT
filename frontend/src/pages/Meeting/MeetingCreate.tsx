import React from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { useFormik } from "formik"
import { useSelector } from "react-redux"
import { RootState } from "../../app/store"


export default function MeetingCreate() {
  const DOMAIN = "http://localhost:8080/"
  const navigate = useNavigate()
  let articleId = useParams()

  const meetingRegisterRequest: any = (method: string, url: string, data: object) => {
    return axios({
      method,
      url: DOMAIN + url,
      data: data
    })
      .then(res => {
        console.log(1, res.data)
        // console.log(1, articleId)
        // navigate(`/meeting/`)
      })
      .catch(err => {
        console.error(err.response.data)
      })
  }

  const formik = useFormik({
    initialValues: {meetingCode:'', meetingTitle: '', meetingContent: '', meetingAuthor: '', meetingPyNum:'', meetingPyTime:''},
    onSubmit: (data) => {meetingRegisterRequest('POST', 'api/meeting/register', data)}, 
  })


    return (
        <div>
          <h1>MeetingCreate</h1>
          <form action="" onSubmit={ formik.handleSubmit }>
            <label htmlFor="meetingTitle">Title</label>
            <input type="text" id="meetingTitle" name="meetingTitle" onChange={formik.handleChange} value={formik.values.meetingTitle} />
            
            <label htmlFor="meetingContent">Content</label>
            <input id="meetingContent" name="meetingContent" type="text" onChange={formik.handleChange} value={ formik.values.meetingContent} />

            <label htmlFor="meetingPyNum">플레이 인원</label>
            <input id="meetingPyNum" name="meetingPyNum" type="text" onChange={formik.handleChange} value={ formik.values.meetingPyNum} />

            <label htmlFor="meetingPyTime">입장시간</label>
            <input id="meetingPyTime" name="meetingPyTime" type="text" onChange={formik.handleChange} value={ formik.values.meetingPyTime} />
          
            <button type="submit">Create</button>
          </form>
        </div>
        
    )
}