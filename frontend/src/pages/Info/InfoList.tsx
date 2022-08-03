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
        url: "http://localhost:8080/api/share"
      })
        .then((res) => {
          setList(res.data)
          //dispatch(getArticleList(res.data))
          // console.log(res.data)
        })
        .catch(err => {
          console.error(err.response.data)
        }) 
  }, [])

  const navigate = useNavigate()
  // const list = useSelector((state:RootState) => state.info.shareList)
  return (
    <div>
        <p>ShareInfo</p>
        <div>
          <table>
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
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
        <div>
          <button onClick={() => navigate('/share/create')}>create</button>
        </div>
        <div>
          <button onClick={() => navigate('/')}>back</button>
        </div>
        
      </div>
      
  )
}

export default InfoList;