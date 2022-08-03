import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector} from '../../app/hooks';
import { request } from '../../utils/axios'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import { getMeetingDetail }  from '../../features/meeting/meetingSlice';
import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';


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
        <div>
          <h1>MeetingDetail</h1>
          <form action="" onSubmit={formik.handleSubmit}>
            <div>
              <h3>
                {title}
              </h3>
            </div>
            <div>
              {author}
            </div>
            <div>
              {content}
            </div>
            <div>
              {player}
            </div>
            <div>
              {time}
            </div>
            <div>

              <button>enroll</button>
            </div>
            <div>
              <button>enroll</button>
            </div>
            <div>
              <button onClick={() => navigate(`/meeting/edit/${code}`)}>edit</button>
              <button type='submit'>delete</button>
            </div>
            <div>
              <button onClick={() => navigate('/meeting')}>Back</button>
            </div>
          </form>
        </div>
        
    )
}