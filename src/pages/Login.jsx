import React, { useState } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import "./style.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("이메일: ", email);
    console.log("비밀번호: ", password);

    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        "https://api.rainbow-letter.com/api/login",
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("백엔드 응답:", response);

      if (response.data === "로그인 실패") {
        console.log(response.data);
        setLoginError("로그인 실패: 이메일 또는 비밀번호가 올바르지 않습니다.");
      } else {
        setToken(response.data);
        localStorage.setItem("token", response.data);
        console.log("로그인 성공!");
        console.log(response.data);
        navigate("/");
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      setLoginError("로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <LoginWrapper>
      <ImageStyled src="/images/login.png" />
      <h2>무지개 편지</h2>
      <form onSubmit={handleLogin}>
        <LoginInput>
          <Input
            type="email"
            id="email"
            placeholder="이메일을 입력해주세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
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
            autoComplete="off"
            required
          />
        </LoginInput>
        {loginError && <p style={{ color: "red" }}>{loginError}</p>}
        <button id="LoginSubmit" type="submit">
          <Link to="/pages/Home"></Link>
          로그인
        </button>
      </form>
      <StyledLink to="/pages/SignUp">무지개 편지 회원이 아니신가요?</StyledLink>
    </LoginWrapper>
  );
}
const LoginWrapper = styled.div`
  margin: auto;
  padding: 50px;
  width: 1000px;
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  h2 {
    font-family: UhBeeSe_hyun;
    font-weight: bold;
    font-size: 35px;
    margin-bottom: 30px;
  }
`;
const Input = styled.input`
  padding: 20px;
  width: 300px;
  height: 50px;
  font-size: 15px;
  border: 1px solid #dde7ef;
  border-radius: 8px;
  margin-bottom: 10px;
`;
const LoginInput = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ImageStyled = styled.img`
  margin-left: 40px;
  width: 180px;
  height: auto;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: #0f2f36;
  &:hover {
    color: black;
    font-weight: 500;
  }
`;

export default Login;
