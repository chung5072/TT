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
import { Link } from 'react-router-dom'
import './MeetingEdit.css'

type meetingType = {
  meetingAuthor: string,
  meetingCode: string,
  meetingTitle: string,
  meetingContent: string,
  meetingPyNum: string,
  meetingPyTime: string
}

export default function MeetingEdit() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  let articleId = useParams().articleId

  const DOMAIN = "http://localhost:8080/"

  useEffect(() => {
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
  // const position = useSelector((state:RootState) => state.meeting.meetingPosition)



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
        // meetingPosition: position
      },
    })
      .then(res => {
        console.log(res)
        navigate(`/meeting/${articleId}`,)
      })
      .catch(err => {
        console.error(err.reponse.data)
      })
  }

  const formik = useFormik({
    initialValues: {meetingCode:articleId, meetingTitle: title, meetingContent: content, meetingPyNum: player, meetingPyTime: time, meetingAuthor: author, },
    onSubmit: (data) => {
      console.log(data)
      meetingEditRequest('PUT', `api/meeting/${articleId}`, data)}
  })


  return (
        <div id='meeting-edit' className='econtainer'>
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
                {/* <a onClick={() => navigate(`/profile/${userId}`)}>profile</a> */}
              </li>
            </ul>
          </nav>
          <div className='econtents'>
            <h1>MeetingEdit</h1>
            <form action="" onSubmit={ formik.handleSubmit }>
              <div className='erowgroup'>
                <label className='esubtitle' htmlFor="meetingTitle">Title</label>
                <div className='einpgroup'>
                  <input className='einp' type="text" onChange={ formik.handleChange } id="meetingTitle" defaultValue={title} />
                </div>
              </div>
                <div className='erowgroup'>
                  <label className='esubtitle' htmlFor="meetingPyNum">Player Number</label>
                  <div className='einpgroup'>
                    <input className='einp' type="number" min="2" max="6" onChange={ formik.handleChange } id="meetingPyNum" defaultValue={player} />
                  </div>
                </div>
                <div className='erowgroup'>
                  <label className='esubtitle' htmlFor="meetingTime">Play Time</label>
                  <div className='einpgroup'>
                    <input className='einp' type="time" onChange={ formik.handleChange } id="meetingPyTime" defaultValue={time} />
                  </div>
                </div>
                <div className='erowgroup'>
                  <label className='esubtitle' htmlFor="meetingContent">Content</label>
                  <div className='einpgroup'>
                    <textarea className='etxtarea' onChange={ formik.handleChange } id="meetingContent" defaultValue={content} />
                  </div>
                </div>
              <div className='ebtngroup'>
                <button className='ebtn' type="submit">SUBMIT</button>
              </div>
              <input type="hidden" id="meetingAuthor" value={author}/>
              <input type="hidden" id="meetingCode" value={code} />
            </form>
          </div>
        </div>
        
    )
}