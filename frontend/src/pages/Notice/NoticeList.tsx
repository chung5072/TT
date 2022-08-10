import React, { useEffect } from 'react';
import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import '../BoardList.css'
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';

const NoticeList = () => {
  const DOMAIN = 'http://localhost:8080/'
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
        <Navbar />
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
                      <td>
                        {notice.noticeAuthor}
                      </td>
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