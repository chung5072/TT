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
import '../ArticleDetail.css'
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
  
  



  const DOMAIN = "https://i7a809.p.ssafy.io/"

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
        <div id='detail'>
          <div  className='detail-container'>           
            <h1 className='detail-title'>{title}</h1>                  
            <form action="" onSubmit={formik.handleSubmit}>
              <div className='postedby'>
                <label className='author-tag' htmlFor="meetingAuthor">POSTED BY | </label>
                <div className='author-name'>
                  {author}
                </div>
              </div>
              <div className='detail-rows'>
                <label className='subtitle' htmlFor="meetingPyTime">PLAY TIME</label>
                <div className='dinp'>
                  {time}
                </div>
              </div>
              <div className='detail-rows'>
                <label className='subtitle' htmlFor="meetingPyNum">PLAYER NUMBER</label>
                <div className='dinp'>
                  {player}
                </div>
              </div>
              <div className='detail-rows'>
                <label className='subtitle' htmlFor="meetingContent">CONTENT</label>
                <div className='content-part'>
                  {content}
                </div>
              </div>
              <div className='positiongroup'>
                <div className='pygroup'>
                  <label className='pysubtitle' htmlFor="">GM</label>
                  <div className='player'>GM</div>
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
              {startTime &&
                <div>
                  <button>입장하기</button>
                </div>
              }
              <div className='detail-btn-group'>
                <button className='detail-btn' onClick={() => navigate(`/meeting/edit/${code}`)}>edit</button>
                <button className='detail-btn' type='submit'>delete</button>
              </div>
              <hr className='comment-hr'/>
                <div className='mini-comment-title'>
                  comment
                </div>
              <hr className='comment-hr'/>
              <div className='comment-part'>
                댓글이 없습니다.
              </div>
            </form>
          </div>
        </div>
        
    )
}