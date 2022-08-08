import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getArticleList }  from '../../features/article/articleSlice';
import { useAppDispatch } from '../../app/hooks';
import { useSelector } from 'react-redux';
import axios from 'axios'
import { RootState } from '../../app/store';
import { listenerCancelled } from '@reduxjs/toolkit/dist/listenerMiddleware/exceptions';
import { info } from 'console';
import { isFocusable } from '@testing-library/user-event/dist/types/utils';
import { useNavigate } from 'react-router-dom';
import '../BoardList.css'


// const DOMAIN = "http://localhost:8080/"
const InfoList = () => {
  
  const dispatch = useAppDispatch()
  const [shareList, setList] = useState([{
    shareCode: '',
    shareTitle: '',
    shareContent: '',
    shareAuthor: '',
    shareLike:'',
    shareView:''
  }])
  useEffect(() => {
      axios({ 
        method: 'GET',
        url: "http://172.26.15.89:3000/api/share"
      })
        .then((res) => {
          // console.log(shareList)
          setList(res.data)
          //dispatch(getArticleList(res.data))
          // console.log(res.data)
        })
        .catch(err => {
          console.error(err.response.data)
        }) 
  }, [])


  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const offset = (page - 1) * limit



  const navigate = useNavigate()
  // const list = useSelector((state:RootState) => state.info.shareList)
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
              <tr>
                <th scope="col" id='number'>NUMBER</th>
                <th scope="col" id='title'>TITLE</th>
                <th scope="col" id='name'>NAME</th>
              </tr>
            </thead>
            <tbody>
          {shareList.map((share, idx) => {
              return (
                  <tr key={share.shareCode}>
                      <td>
                        {share.shareCode}
                      </td>
                      <td><Link to={"/share/" + `${share.shareCode}`}>{share.shareTitle}</Link></td>
                  </tr>
              )
           })}
           </tbody>
          </table>
        </div>
      </div>
      
  )
}

export default InfoList;