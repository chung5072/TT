import React, { useEffect } from 'react';
import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import '../BoardList.css'
import { Link } from 'react-router-dom';


const NoticeList = () => {
  const DOMAIN = 'https://i7a809.p.ssafy.io/'
  const navigate = useNavigate()

  const [noticeList, setList] = useState([{
    noticeCode: '',
    noticeTitle: '',
    noticeContent: '',
    noticeAuthor: ''
  }])

  useEffect(() => {
    axios({
      method: 'GET',
      url: DOMAIN + 'api/notice'
    })
    .then((res) => {
      setList(res.data)
    })
    .catch(err => {
      console.error(err.response.data)
    })
  }, [])

  return (
    <div>
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
              <button id='create-btn' onClick={() => navigate('/notice/create')}>create</button>
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
          {noticeList.map((notice, idx) => {
              return (
                  <tr key={notice.noticeCode}>
                      <td>
                        {notice.noticeCode}
                      </td>
                      <td><Link to={"/notice/" + `${notice.noticeCode}`}>{notice.noticeTitle}</Link></td>
                  </tr>
              )
           })}
           </tbody>
          </table>
        </div>
        <div>
          <button onClick={() => navigate('/notice/create')}>create</button>
        </div>
        <div>
          <button onClick={() => navigate('/')}>back</button>
        </div>
        
      </div>     
    </div>
  )
}

export default NoticeList;