import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Home from './pages/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Brand from './pages/Brand';
import Persona from './pages/Persona';
import PersonaDog from './pages/persona/PersonaDog';
import PersonaCat from './pages/persona/PersonaCat';
import PersonaBird from './pages/persona/PersonaBird';
import PersonaHam from './pages/persona/PersonaHam';
import PersonaOthers from './pages/persona/PersonaOthers';
import PersonaSetting from './pages/persona/PersonaSetting';
import Chat from './pages/Chat';
import Diary from './pages/Diary';
import Community from './pages/Community';
import CommunityPost from './pages/community/CommunityPost';
import CommunityEdit from './pages/community/CommunityEdit';
import CommunityView from './pages/community/CommunityView';
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
          <Route exact path="/" element={<Brand />} />
          <Route path="/pages/Home" element={<Home />} />
          <Route path="/pages/Login" element={<Login />} />
          <Route path="/pages/SignUp" element={<SignUp />} />
          <Route path="/pages/Brand" element={<Brand />} />
          <Route path="/pages/Persona" element={<Persona />} />
          <Route path="/pages/persona/PersonaDog" element={<PersonaDog />} />
          <Route path="/pages/persona/PersonaCat" element={<PersonaCat />} />
          <Route path="/pages/persona/PersonaBird" element={<PersonaBird />} />
          <Route path="/pages/persona/PersonaHam" element={<PersonaHam />} />
          <Route path="/pages/persona/PersonaOthers" element={<PersonaOthers />} />
          <Route path="/pages/persona/PersonaSetting" element={<PersonaSetting />} />
          <Route path="/pages/Chat" element={<Chat />} />
          <Route path="/pages/Chat/:petIdString" element={<Chat />} />
          <Route path="/rainbow-letter/chat/:pet_id" component={Chat} />
          <Route path="/pages/Diary" element={<Diary />} />
          <Route path="/rainbow-letter/diary/:pet_id" component={Diary} />
          <Route path="/pages/Diary/:petIdString" element={<Diary />} />
          <Route path="/pages/Community" element={<Community />} />
          <Route path="/pages/community/CommunityPost" element={<CommunityPost />} />
          <Route path="/pages/community/CommunityEdit" element={<CommunityEdit />} />
          <Route path="/pages/community/CommunityView" element={<CommunityView />} />
          <Route path="/pages/community/CommunityView/:id" element={<CommunityView />} />
          <Route path="/pages/MyPage" element={<MyPage />} />
          <Route path="/pages/Loading" element={<Loading />} />
        </Routes>
        <Footer />
    </Router>
  );
}

export default App;
