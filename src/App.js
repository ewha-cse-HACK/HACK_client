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
import OurStory from './pages/OurStory';
import Persona from './pages/Persona';
import PersonaDog from './pages/persona/PersonaDog';
import PersonaCat from './pages/persona/PersonaCat';
import PersonaBird from './pages/persona/PersonaBird';
import PersonaHam from './pages/persona/PersonaHam';
import PersonaOthers from './pages/persona/PersonaOthers';
import PersonaSetting from './pages/persona/PersonaSetting';
import PersonaEdit from './pages/persona/PersonaEdit';
import Chat from './pages/Chat';
import Diary from './pages/Diary';
import Community from './pages/Community';
import MyPage from './pages/MyPage';
import Loading from './pages/Loading'


function App() {

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      axios.defaults.headers.common['X-ACCESS-TOKEN'] = `Bearer ${token}`;
    } else {
      console.log("로그인이 필요합니다.");
    }
  }, []);

  return (
    <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/pages/Login" element={<Login />} />
          <Route path="/pages/SignUp" element={<SignUp />} />
          <Route path="/pages/OurStory" element={<OurStory />} />
          <Route path="/pages/Persona" element={<Persona />} />
          <Route path="/pages/persona/PersonaDog" element={<PersonaDog />} />
          <Route path="/pages/persona/PersonaCat" element={<PersonaCat />} />
          <Route path="/pages/persona/PersonaBird" element={<PersonaBird />} />
          <Route path="/pages/persona/PersonaHam" element={<PersonaHam />} />
          <Route path="/pages/persona/PersonaOthers" element={<PersonaOthers />} />
          <Route path="/pages/persona/PersonaSetting" element={<PersonaSetting />} />
          <Route path="/pages/persona/PersonaEdit" element={<PersonaEdit />} />
          <Route path="/pages/Chat" element={<Chat />} />
          <Route path="/pages/Chat/:petIdString" element={<Chat />} />
          <Route path="/rainbow-letter/chat/:pet_id" component={Chat} />
          <Route path="/pages/Diary" element={<Diary />} />
          <Route path="/pages/Diary/:petIdString" element={<Diary />} />
          <Route path="/pages/Commnunity" element={<Community />} />
          <Route path="/pages/MyPage" element={<MyPage />} />
          <Route path="/pages/Loading" element={<Loading />} />
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
