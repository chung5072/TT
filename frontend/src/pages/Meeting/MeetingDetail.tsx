import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector} from '../../app/hooks';
import { request } from '../../utils/axios'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import { getMeetingDetail }  from '../../features/meeting/meetingSlice';
import { fetchProfile } from '../../features/user/userSlice';
import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import './MeetingDetail.css'
import { Link } from 'react-router-dom';


export default function MeetingDetail() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  let articleId = useParams().articleId
  let startTime = useSelector((state:RootState) => state.meeting.meetingGameIsStart)
  let userId = useParams().userId

  const playerUser = []
  

  // 1. userId 찾는법
  // 2. 배열 형태가 {GM, [player1,2,3,...]}? {[  ]} 


  // 버튼 누르면 그 유저의 아이디를 배열에 저장
  
  const enrollGm = () => {
    const playerGm = userId  
  }

    const enrollPy = () => {
      playerUser.push(userId)
    }


    
    //서버에 post로 요청 보내기
    const roomInfoRequest: any= (method: string, url: string, data: object) => {
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
    
  // const submitRoomInfo = (data) => {
    
  // }
  
  



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
  // const userId = useSelector((state:RootState) => state.user.userId)

  //입장시간 나타내는 함수
  setTimeout(function() {
    startTime = true;
  }, 3000)

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
                      <button className='enroll' onClick={(userId) => enrollGm()}>enroll</button>
                    </div>
                    <div className='pygroup'>
                      <label className='pysubtitle' htmlFor="">Player</label>
                      <div className='player'>
                        <p>player1</p>
                        <p>player2</p>
                      </div>
                      <button className='enroll' onClick={(userId) => enrollPy()}>enroll</button>
                    </div>
                  </div>
                  <div className='dbtngroup'>
                    <button className='dbtn' onClick={() => navigate(`/meeting/edit/${code}`)}>edit</button>
                    <button className='dbtn' type='submit'>delete</button>
                  </div>
                  {startTime &&
                    <div>
                      <button>입장하기</button>
                    </div>
                  }
                </div>
            </form>
          </div>
        </div>
        
    )
}