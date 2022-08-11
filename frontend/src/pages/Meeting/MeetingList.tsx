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
  
  // 검색 기능
  const [search, setSearch] = useState('')

  const onChangeSearch = (e : any) => {
    e.preventDefault();
    setSearch(e.target.value);
  }

  const onSearch = (e : any) => {
    e.preventDefault();
    if (search === null || search === '') {
      axios({
        method: 'GET',
        url: DOMAIN + 'api/meeting'
      })
      .then((res) => {
        console.log(1, res)
        setMeetList(res.data)
      })
    }
    else {
      const filterData = meetList.filter((row) => row.meetingTitle.includes(search))
      setMeetList(filterData)
    }
    setSearch('')
  }

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
              <form className='search-form' onSubmit={e => onSearch(e)}>
                <button id='search-btn' type='submit'>search</button>
                <input id='search-input' type="text" value={search} onChange={onChangeSearch} />
              </form>
              {/* <button id='search-btn'>search</button>
              <label htmlFor=""></label>
              <input id='search-input' type="text" /> */}
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
                  <tr className='article-tr' key={meet.meetingCode}>
                      <td>
                        {meet.meetingCode}
                      </td>
                      <td><Link to={"/meeting/" + `${meet.meetingCode}`}>{meet.meetingTitle}</Link></td>
                      <td>
                        {meet.meetingAuthor}
                      </td>
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