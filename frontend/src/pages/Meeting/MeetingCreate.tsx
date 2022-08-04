import React from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { useFormik } from "formik"
import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
import './MeetingCreate.css'
import { Link } from "react-router-dom"


export default function MeetingCreate() {
  const DOMAIN = "http://localhost:8080/"
  const navigate = useNavigate()
  let articleId = useParams().articleId
  let userId = useParams().userId

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
        <div id="meeting-create" className="container">
          <nav className="menu">
            <div className="logo">
              <Link to='/'>home</Link>
            </div>
            <ul>
              <li>
                <Link className="commu" to='/notice'>notice</Link>
              </li>
              <li>
                <Link className="commu" to='/meeting'>meeting</Link>
              </li>
              <li>
                <Link className="commu" to='/share'>information</Link>
              </li>
              <li>
                <a onClick={() => navigate(`/profile/${userId}`)}>profile</a>
              </li>
            </ul>
          </nav>
          <div className="contents">
            <h1>MeetingCreate</h1>
            <form action="" onSubmit={ formik.handleSubmit }>
              <div className="rowgroup">
                <label className="subtitle" htmlFor="meetingTitle">Title</label>
                <div className="ininp">
                  <input className="inp" type="text" id="meetingTitle" name="meetingTitle" onChange={formik.handleChange} value={formik.values.meetingTitle} />
                </div>
              </div>
              <div className="rowgroup">
                <label className="subtitle" htmlFor="meetingPyNum">Player Number</label>
                <div className="ininp">
                  <input className="inp" id="meetingPyNum" name="meetingPyNum" type="number" min="2" max="6" onChange={formik.handleChange} value={ formik.values.meetingPyNum} />
                </div>
              </div>
              <div className="rowgroup">
                <label className="subtitle" htmlFor="meetingPyTime">Play Time</label>
                <div className="ininp">
                  <input className="inp" id="meetingPyTime" name="meetingPyTime" type="datetime-local" onChange={formik.handleChange} value={ formik.values.meetingPyTime} />
                </div>
              </div>
              <div className="rowgroup">
                <label className="subtitle" htmlFor="meetingPosition">Position</label>
                <div className="radiogroup">
                  <input id="gameMaster" type="radio" name="position" /><label htmlFor="gameMaster" className="choice">GM</label>
                  <input id="gamePlayer" type="radio" name="position" /><label htmlFor="gamePlayer" className="choice">Player</label>
                </div>
              </div>
              <div className="rowgroup">
                <label className="subtitle" htmlFor="meetingContent">Content</label>
                <div className="ininp">
                  <textarea className="txtarea" id="meetingContent" name="meetingContent" onChange={formik.handleChange} value={ formik.values.meetingContent} />
                </div>
              </div>
              <div className="btngroup">
                <button className="btn" type="submit">SUBMIT</button>
                {/* <button className="btn" onClick={() => navigate('/meeting')}>Cancle</button> */}
              </div>
            </form>
          </div>
        </div>
        
    )
}