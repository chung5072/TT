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
      <div id='container'>
      <div className='navbar'>
        <p id='info'>COMMUNITY1 COMMUNITY2 COMMUNITY3 PRP</p>
      </div>
        <div id='articles'>
          <div id='search'>
            <div>
              <button id='search-btn'>search</button>
              <label htmlFor=""></label>
              <input id='search-input' type="text" />
            </div>
            <div>
              <button id='create-btn' onClick={() => navigate('/share/create')}>create</button>
            </div>
            <div>
              <button id='back-btn' onClick={() => navigate('/')}>back</button>
            </div>
          </div>
          
          <table className='board-table'>
            <thead>
                <th scope="col" id='number'>NUMBER</th>
                <th scope="col" id='title'>TITLE</th>
                <th scope="col" id='name'>NAME</th>
            </thead>
            <tbody>
              <tr className='article'>
                <td>1</td>
                <th>
                  <a href="">서울8반 9조 프론트 화이팅!</a>
                </th>
                <td>베컴</td>
              </tr>
              <tr className='article'>
                <td>2</td>
                <td>서울8반 9조 백엔드 화이팅!</td>
                <td>마이클 조던</td>
              </tr>
              <tr className='article'>
                <td>3</td>
                <td>서울8반 9조는 제가 본 팀 줄 가장 강력했어요</td>
                <td>버락 오바마</td>
              </tr>
              <tr className='article'>
                <td>4</td>
                <td>내 전 재산을 투자 할 수 있다면 바로 서울8반 9조에게 하겠다</td>
                <td>도날드 트럼프</td>
              </tr>
              <tr className='article'>
                <td>5</td>
                <td>내 전 재산을 투자 할 수 있다면 바로 서울8반 9조에게 하겠다</td>
                <td>도날드 트럼프</td>
              </tr>
              <tr className='article'>
                <td>6</td>
                <td>내 전 재산을 투자 할 수 있다면 바로 서울8반 9조에게 하겠다</td>
                <td>도날드 트럼프</td>
              </tr>
              <tr className='article'>
                <td>7</td>
                <td>내 전 재산을 투자 할 수 있다면 바로 서울8반 9조에게 하겠다</td>
                <td>도날드 트럼프</td>
              </tr>
              <tr className='article'>
                <td>8</td>
                <td>내 전 재산을 투자 할 수 있다면 바로 서울8반 9조에게 하겠다</td>
                <td>도날드 트럼프</td>
              </tr>
              <tr className='article'>
                <td>9</td>
                <td>내 전 재산을 투자 할 수 있다면 바로 서울8반 9조에게 하겠다</td>
                <td>도날드 트럼프</td>
              </tr>
              <tr className='article'>
                <td>10</td>
                <td>내 전 재산을 투자 할 수 있다면 바로 서울8반 9조에게 하겠다</td>
                <td>도날드 트럼프</td>
              </tr>
              <tr className='article'>
                <td>11</td>
                <td>다들 화이팅!!! 2주만 힘내요</td>
                <td>임완택</td>
              </tr>
          {/* {meetList.map((meet, idx) => {
              return (
                  <tr key={meet.meetingCode}>
                      <td>
                        {meet.meetingCode}
                      </td>
                      <td><Link to={"/meeting/" + `${meet.meetingCode}`}>{meet.meetingTitle}</Link></td>
                  </tr>
              )
           })} */}
           </tbody>
          </table>
        </div>
          {/* <div>
            <button onClick={() => navigate('/meeting/create')}>Create</button>
            <button onClick={() => navigate('/')}>Back</button>
          </div> */}
        </div>
        
    )
}

export default MeetingList;