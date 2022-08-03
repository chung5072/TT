import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { RootState } from '../../app/store';
import { getMeetingList } from '../../features/meeting/meetingSlice'


const MeetingList = () => {
  const navigate = useNavigate()
  const DOMAIN = "http://localhost:8080/"

  const [meetList, setMeetList] = useState([{
    meetingCode: '',
    meetingTitle: '',
    meetingContent: '',
    meetingAuthor: '',
    meetingPYNum:'',
    meetingPyTime:'',
    meetingDate:''
  }])

  useEffect(() => {
    axios({
      method: 'GET',
      url: DOMAIN + 'api/meeting'
    })
      .then((res) => {
        setMeetList(res.data)
      })
      .catch(err => {
        console.error(err.response.data)
      })
  }, [])

    return (
        <div>
          <p>MeetingList</p>
          <div>
          <table>
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
              </tr>
            </thead>
            <tbody>
          {meetList.map((meet, idx) => {
              return (
                  <tr key={meet.meetingCode}>
                      <td>
                        {meet.meetingCode}
                      </td>
                      <td><Link to={"/meeting/" + `${meet.meetingCode}`}>{meet.meetingTitle}</Link></td>
                  </tr>
              )
           })}
           </tbody>
          </table>
        </div>
          <div>
            <button onClick={() => navigate('/meeting/create')}>Create</button>
            <button onClick={() => navigate('/')}>Back</button>
          </div>
        </div>
        
    )
}

export default MeetingList;