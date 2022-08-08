import React from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { useFormik } from "formik"
import { useSelector } from "react-redux"
import { RootState } from "../../app/store"
import '../ArticleCreate.css'
import { Link } from "react-router-dom"
import * as Yup from 'yup'

export default function MeetingCreate() {
  const DOMAIN = "https://i7a809.p.ssafy.io/"
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
        navigate('/meeting')
      })
      .catch(err => {
        console.error(err.response.data)
      })
  }

  const formik = useFormik({
    initialValues: {meetingCode:'', meetingTitle: '', meetingContent: '', meetingAuthor: '', meetingPyNum:'', meetingPyTime:'', meetingPosition:''},
    validationSchema: Yup.object({
      meetingTitle: Yup.string()
        .required('제목을 입력해주세요.')
        .max(30, '30자를 초과할 수 없습니다.'),

      meetingContent: Yup.string()
        .required('내용을 입력해주세요.')
        .max(1000, '1000자를 초과할 수 없습니다.'),
      
      meetingPyNum: Yup.number()
        .required('플레이 인원을 입력해주세요.'),
      
      meetingPyTime: Yup.string()
        .required('게임 시작 시간을 입력해주세요.'),

      meetingPosition: Yup.string()
        .required('포지션을 선택해주세요.')
    }),
    onSubmit: (data) => {meetingRegisterRequest('POST', 'api/meeting/register', data)},
  })

    return (
        <div id="create">
          <div className="create-container">
            <h1>MeetingCreate</h1>
            <form action="" onSubmit={ formik.handleSubmit }>
              <div className="rows">
                <label className="mini-title" htmlFor="meetingTitle">Title</label>
                <div className="inp-group">
                  <input className="inp-tags" type="text" id="meetingTitle" name="meetingTitle" onChange={formik.handleChange} value={formik.values.meetingTitle} />
                  {formik.touched.meetingTitle && formik.errors.meetingTitle ? (
                    <div className='error-message'>{formik.errors.meetingTitle}</div>
                  ) : null}
                </div>
              </div>
              <div className="rows">
                <label className="mini-title" htmlFor="meetingPyNum">Player Number</label>
                <div className="inp-group">
                  <input className="inp-tags" id="meetingPyNum" name="meetingPyNum" type="number" min="2" max="6" onChange={formik.handleChange} value={ formik.values.meetingPyNum} />
                  {formik.touched.meetingPyNum && formik.errors.meetingPyNum ? (
                    <div className='error-message'>{formik.errors.meetingPyNum}</div>
                  ) : null}
                </div>
              </div>
              <div className="rows">
                <label className="mini-title" htmlFor="meetingPyTime">Play Time</label>
                <div className="inp-group">
                  <input className="inp-tags" id="meetingPyTime" name="meetingPyTime" type="datetime-local" onChange={formik.handleChange} value={ formik.values.meetingPyTime} />
                  {formik.touched.meetingPyTime && formik.errors.meetingPyTime ? (
                    <div className='error-message'>{formik.errors.meetingPyTime}</div>
                  ) : null}
                </div>
              </div>
              <div className="rows">
                <label className="mini-title" htmlFor="meetingPosition">Position</label>
                <div className="radio-group">
                  <div className="position-choice">
                    <input id="gamePlayer" type="radio" name="position" /><label htmlFor="gameMaster" className="choice">GM</label>
                  </div>
                  <div className="position-choice">
                    <input id="gamePlayer" type="radio" name="position" /><label htmlFor="gamePlayer" className="choice">Player</label>
                  </div>
                  {/* {formik.touched.meetingPosition && formik.errors.meetingPosition ? (
                    <div className='error-message'>{formik.errors.meetingPosition}</div>
                  ) : null} */}
                </div>
              </div>
              <div className="rows">
                <label className="mini-title" htmlFor="meetingContent">Content</label>
                <div className="inp-group">
                  <textarea className="txtarea-tags" id="meetingContent" name="meetingContent" onChange={formik.handleChange} value={ formik.values.meetingContent} />
                  {formik.touched.meetingContent && formik.errors.meetingContent ? (
                    <div className='error-message'>{formik.errors.meetingContent}</div>
                  ) : null}
                </div>
              </div>
              <div className="btn-group">
                <button className="btn-tags" type="submit">SUBMIT</button>
              </div>
            </form>
          </div>
        </div>
        
    )
}