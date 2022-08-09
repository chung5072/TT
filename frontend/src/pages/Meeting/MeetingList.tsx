import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { RootState } from '../../app/store';
import { getMeetingList } from '../../features/meeting/meetingSlice'
import '../BoardList.css'
import Navbar from '../../components/Navbar';


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
        console.log(1, res)
        setMeetList(res.data)
      })
      .catch(err => {
        console.error(err.response.data)
      })
  }, [])

    return (
      <div id='container'>
        <Navbar />
        <div id='articles'>
          <div id='search'>
            <div>
              <button id='search-btn'>search</button>
              <label htmlFor=""></label>
              <input id='search-input' type="text" />
            </div>
            <div>
              <button id='create-btn' onClick={() => navigate('/meeting/create')}>create</button>
            </div>
            <div>
              <button id='back-btn' onClick={() => navigate('/')}>back</button>
            </div>
          </div>
          
          <table className='board-table'>
            <thead>
              <tr>
                <th scope="col" id='number'>NUMBER</th>
                <th scope="col" id='title'>TITLE</th>
                <th scope="col" id='name'>NAME</th>
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
        </div>
        
    )
}

export default MeetingList;