import React, { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import "./style.css";

function SignUp() {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true); // 비밀번호 확인 일치 여부
  const [isRegistered, setIsRegistered] = useState(false);

  // 가입하기 버튼 클릭 시 실행되는 함수
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 비밀번호와 비밀번호 확인이 일치하는지 확인
    if (password === confirmPassword) {
      try {
        const response = await axios.post(
          "http://13.209.173.241:8080/api/join",
          {
            email,
            password,
            nickname,
          }
        );

        // 회원가입 성공 시 서버 응답 출력
        console.log(response.data);

        // 회원가입 성공 메세지를 표시
        setIsRegistered(true);
      } catch (error) {
        // 서버 요청 실패 시 오류 처리
        console.error("회원가입 오류:", error);
      }
    } else {
      setPasswordsMatch(false); // 비밀번호 불일치 시 상태 업데이트
    }
  };

  return (
    <div id="SignupWrapper">
      <h1>회원가입</h1>
      <h3>무지개 편지에 오신 걸 환영합니다!</h3>
      <form onSubmit={handleSubmit}>
        <SignInput>
          <label htmlFor="nickname">닉네임:</label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
        </SignInput>
        <SignInput>
          <label htmlFor="email">이메일:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </SignInput>
        <SignInput>
          <label htmlFor="password">비밀번호:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </SignInput>
        <SignInput>
          <label htmlFor="confirmPassword">비밀번호 확인:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </SignInput>
        {!passwordsMatch && (
          <p style={{ color: "red" }}>비밀번호가 일치하지 않습니다.</p>
        )}
        <button id="SignButton" type="submit">
          가입하기
        </button>
      </form>
      <StyledLink to="/pages/Login">이미 계정이 있으신가요?</StyledLink>
    </div>
  );
}

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #343b6e;
  &:hover {
    color: black;
    font-weight: 500;
  }
`;

const SignInput = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

export default SignUp;
