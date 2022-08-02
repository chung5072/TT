import React, { useEffect } from 'react';
import './App.css';
import Home from './components/Home';
import { useAppDispatch } from './app/hooks';
import { getAccessToken } from './features/user/loginSlice';
import { useAppSelector } from './app/hooks';
import { RootState } from './app/store';


function App() {
  const token = useAppSelector((state:RootState) => state.login.token)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (token){
      dispatch(getAccessToken())
    }
   
  },[token])

  return (
    <div className="App">
      <Home/>
    </div>
  );
}

export default App;
