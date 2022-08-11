import { ftruncateSync } from "fs"
import { useEffect } from "react"
import { useAppDispatch } from "../../app/hooks"
import { fetchProfile } from "../../features/user/userSlice"
import { useAppSelector } from "../../app/hooks"
import { RootState } from "../../app/store"
import axios from "axios"
import './Profile.css'


export default function Profile() {
  const token = useAppSelector((state: RootState) => state.login.token)
  const data = useAppSelector((state:RootState) => state.login.currentUser)
  const userId = useAppSelector((state:RootState) => state.user.userId)
  const userPw = useAppSelector((state:RootState) => state.user.userPw)
  const userEmail = useAppSelector((state:RootState) => state.user.userEmail)
  const userPhone = useAppSelector((state:RootState) => state.user.userPhone)
  const userGender = useAppSelector((state:RootState) => state.user.userGender)
  const userNickname = useAppSelector((state:RootState) => state.user.userNickname)
  const userCode = useAppSelector((state:RootState) => state.user.userCode)
  const dispatch = useAppDispatch()
  const DOMAIN = 'http://localhost:8080/'
  
  
  useEffect(() => {
    axios({
      method: "GET",
      url: DOMAIN + `/api/user/userinfo/${localStorage.getItem('current_user')}`,
      
    })
      .then((res) => {
        dispatch(fetchProfile(res.data))
      })
      .catch((err) => {
        console.error(err.response.data);
      });
  },[data])




    return (
        <div id="profile-page">
          <div className="profile-box">
            <div className="profile-nickname">{userNickname} 님, 안녕하세요!</div>
            <div className="profile-id">{userId}</div>
            <div className="profile-code">{userCode}</div>
            <div className="profile-email">{userEmail}</div>
            <div className="profile-phone">{userPhone}</div>
            <div className="profile-gender">{userGender}</div>   
          </div>                
        </div>
        
    )
}