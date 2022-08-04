import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector} from '../../app/hooks';
import { request } from '../../utils/axios'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import { getMeetingDetail }  from '../../features/meeting/meetingSlice';
import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import './MeetingDetail.css'
import { Link } from 'react-router-dom';


export default function MeetingDetail() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  let articleId = useParams().articleId
  
  function onClickUpdScrn() {
    window.location.replace("/meeting/edit/" + `${articleId}`)
  }

  const onClickDeleteBtn = () => {
    return axios.delete(`api/meeting/${articleId}`)
  }

  const DOMAIN = "http://localhost:8080/"

  useEffect(() => {
      axios({ 
        method: 'GET',
        url: DOMAIN +`api/meeting/${articleId}`
      })
        .then((res) => {
          dispatch(getMeetingDetail(res.data))

        })
        .catch(err => {
          console.error(err.response.data)
        })
  })
  const meetingDeleteRequest: any = (method: string, url: string, data:object) => {
    return axios({
      method,
      url: DOMAIN + url
      // data: {
      //   shareCode: articleId,
      // },
    })
      .then(res => {
        console.log(res.data)
        navigate('/meeting')
      })
      .catch(err => {
        console.error(err.reponse.data)
      })
  }


  const title = useSelector((state:RootState ) => state.meeting.meetingTitle)
  const content = useSelector((state:RootState) => state.meeting.meetingContent)
  const author = useSelector((state:RootState) => state.meeting.meetingAuthor)
  const player = useSelector((state:RootState) => state.meeting.meetingPyNum)
  const time = useSelector((state:RootState) => state.meeting.meetingPyTime)
  const code = useSelector((state:RootState) => state.meeting.meetingCode)

  const formik = useFormik({
    initialValues: {meetingCode:articleId},
    onSubmit: (data) => {
      console.log(data)
      meetingDeleteRequest('DELETE', `api/meeting/${articleId}`, data)}
  })


    return (
        <div id='meeting-detail' className='dcontainer'>
          {/* <nav className="menu">
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
          </nav> */}
          <div>           
            <form action="" onSubmit={formik.handleSubmit}>
                <div className='dcontents'>
                  <div className='backbtn'>
                    <button className='bbtn' onClick={() => navigate('/meeting')}>Back</button>
                  </div>
                  <div className='headtitle'>
                    {title}
                  </div>
                  <div className='drowgroup'>
                    <label className='dsubtitle' htmlFor="meetingAuthor">POSTED BY</label>
                    <div className='dinp'>
                      {author}
                    </div>
                  </div>
                  <div className='drowgroup'>
                    <label className='dsubtitle' htmlFor="meetingPyTime">PLAY TIME</label>
                    <div className='dinp'>
                      {time}
                    </div>
                  </div>
                  <div className='drowgroup'>
                    <label className='dsubtitle' htmlFor="meetingPyNum">PLAYER NUMBER</label>
                    <div className='dinp'>
                      {player}
                    </div>
                  </div>
                  <div className='drowgroup'>
                    <label className='dsubtitle' htmlFor="meetingContent">CONTENT</label>
                    <div className='dinp'>
                      {content}
                    </div>
                  </div>
                  <div className='positiongroup'>
                    <div className='pygroup'>
                      <label className='pysubtitle' htmlFor="">GM</label>
                      <div className='player'>
                      </div>
                      <button className='enroll'>enroll</button>
                    </div>
                    <div className='pygroup'>
                      <label className='pysubtitle' htmlFor="">Player</label>
                      <div className='player'>
                        <p>player1</p>
                        <p>player2</p>
                      </div>
                      <button className='enroll'>enroll</button>
                    </div>
                  </div>
                  <div className='dbtngroup'>
                    <button className='dbtn' onClick={() => navigate(`/meeting/edit/${code}`)}>edit</button>
                    <button className='dbtn' type='submit'>delete</button>
                  </div>
                </div>
            </form>
          </div>
        </div>
        
    )
}