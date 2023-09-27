import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
import axios from 'axios';
import styled from "styled-components";
import './App.css';
import Home from './pages/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from './pages/Login';
import SignUp from './pages/SignUp';


function App() {
  //앱 로드될 때 토큰이 있는 경우 Axios 기본 헤더에 토큰 추가, 이후 HTTP 요청에서 토큰 함께 전송 
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      // 토큰이 없을 경우에 대한 처리
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
        </Routes>
        <Footer />
    </Router>
  );
}

export default App;
