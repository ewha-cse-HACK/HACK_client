import React, { useState } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import "./style.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/login", {
        email,
        password,
      });

      if (response.data === "로그인 성공") {
        // 로그인 성공 시 JWT 토큰을 저장
        localStorage.setItem("token", response.data.token);

        // 로그인 성공 메시지 등의 작업을 수행
        console.log("로그인 성공!");

        // 홈 화면으로 리다이렉트
        navigate("/");
      } else {
        // 로그인 실패 시 에러 처리
        setLoginError("로그인 실패: 이메일 또는 비밀번호가 올바르지 않습니다.");
      }
    } catch (error) {
      // 네트워크 오류 또는 기타 오류 처리
      console.error("로그인 오류:", error);
      setLoginError("로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <div id="LoginWrapper">
      <ImageStyled src="/images/astronaut.jpg" />
      <h2>무지개 편지</h2>
      <form onSubmit={handleSubmit}>
        <LoginInput>
          <Input
            type="email"
            id="email"
            placeholder="이메일을 입력해주세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </LoginInput>
        <LoginInput>
          <Input
            type="password"
            id="password"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </LoginInput>
        {loginError && <p style={{ color: "red" }}>{loginError}</p>}
        <button id="LoginSubmit" type="submit">
          로그인
        </button>
      </form>
      <StyledLink to="/pages/SignUp">무지개 편지 회원이 아니신가요?</StyledLink>
    </div>
  );
}

const Input = styled.input`
  padding: 20px;
  width: 300px;
  height: 50px;
  font-size: 15px;
  border: 1px solid #d2d3e6;
  border-radius: 8px;
  margin-bottom: 10px;
`;
const LoginInput = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ImageStyled = styled.img`
  width: 140px;
  height: auto;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: #343b6e;
  &:hover {
    color: black;
    font-weight: 500;
  }
`;

export default Login;
