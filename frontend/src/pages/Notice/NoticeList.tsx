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
  const user_authority = window.localStorage.getItem('user_authority');

  const [noticeList, setList] = useState([{
    noticeCode: '',
    noticeTitle: '',
    noticeContent: '',
    noticeAuthor: ''
  }])

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/api' + '/notice'
    })
    .then((res) => {
      setList(res.data)
    })
    .catch(err => {
      console.error(err.response.data)
    })
  }, [])

  function checkAdmin() {
    // const showCreateKey = bcrypt.hashSync('rule_admin', 12);
    // return bcrypt.compareSync(showCreateKey, user_authority);
    return user_authority === 'rule_admin';
  }

  return (
    <div>
      <div id='container'>
        <Navbar />
        <h1>NOTICE</h1>
        <div id='articles'>
          <div id='search'>
            <div>
              <button id='search-btn'>search</button>
              <label htmlFor=""></label>
              <input id='search-input' type="text" />
            </div>
            <div>
            {
              checkAdmin() ?  
              <div>
                <button id='create-btn' onClick={() => navigate('/notice/create')}>create</button>
              </div> 
              :
              null
            }
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
                        {idx + 1}
                      </td>
                      <td><Link to={"/notice/" + `${notice.noticeCode}`} style={{ textDecoration: 'none', color: '#d9aa52' }}>{notice.noticeTitle}</Link></td>
                      <td>
                        {notice.noticeAuthor}
                      </td>
                  </tr>
              )
           })}
           </tbody>
          </table>
        </div>
      </div>     
    </div>
  )
}

export default NoticeList;