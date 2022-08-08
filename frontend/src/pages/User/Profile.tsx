import { ftruncateSync } from "fs"
import { useEffect } from "react"
import { useAppDispatch } from "../../app/hooks"
import { fetchProfile } from "../../features/user/userSlice"
import { useAppSelector } from "../../app/hooks"
import { RootState } from "../../app/store"
import axios from "axios"
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
  useEffect(() => {
    axios({
      method: "GET",
      url: `http://172.26.15.89:3000/api/user/userinfo/${localStorage.getItem('current_user')}`,
      
    })
      .then((res) => {
        dispatch(fetchProfile(res.data))
      })
      .catch((err) => {
        console.error(err.response.data);
      });
  },[data])
    return (
        <div>
          <h1>Profile</h1>
          <h3>{userId}</h3>
          <h3>{userCode}</h3>
          <h3>{userPw}</h3>
          <h3>{userEmail}</h3>
          <h3>{userPhone}</h3>
          <h3>{userGender}</h3>
          <h3>{userNickname}</h3>
          
        </div>
        
    )
}