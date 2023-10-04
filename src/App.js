import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Home from './pages/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Profile from './components/Profile';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Persona from './pages/Persona';
import PersonaView from './pages/PersonaView';
import PersonaSetting from './pages/PersonaSetting';
import PersonaEdit from './pages/PersonaEdit';
import Chat from './pages/Chat';
import Diary from './pages/Diary';
import Community from './pages/Community';
import MyPage from './pages/MyPage';


function App() {

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      axios.defaults.headers.common['X-ACCESS-TOKEN'] = `Bearer ${token}`;
    } else {
      // 토큰이 없을 경우에 대한 처리 - 로그인이 필요합니다 넣자 
      // 여기 입력해라 꼭 봐라 
    }
  }, []);

  return (
    <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/pages/Login" element={<Login />} />
          <Route path="/pages/SignUp" element={<SignUp />} />
          <Route path="/pages/Persona" element={<Persona />} />
          <Route path="/pages/PersonaView" element={<PersonaView />} />
          <Route path="/pages/PersonaSetting" element={<PersonaSetting />} />
          <Route path="/pages/PersonaEdit" element={<PersonaEdit />} />
          <Route path="/pages/Chat" element={<Chat />} />
          <Route path="/rainbow-letter/chat/:pet_id" component={Chat} />
          <Route path="/pages/Diary" element={<Diary />} />
          <Route path="/pages/Commnunity" element={<Community />} />
          <Route path="/pages/MyPage" element={<MyPage />} />
        </Routes>
        <Footer />
    </Router>
  );
}

export default App;

/*
로그인 로직을 바꿔야 될까????>......
export const requestLogin = async (email, pw) => {
  return await axios
    .post(
      `${serverURL}/login/`,
      {
        email: email,
        password: pw,
      },
      { withCredentials: true }
    )
    .then((response) => {
      /// token이 필요한 API 요청 시 header Authorization에 token 담아서 보내기
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.access_token}`;
      return response.data;
    })
    .catch((e) => {
      console.log(e.response.data);
      return "이메일 혹은 비밀번호를 확인하세요.";
    });
};
*/
