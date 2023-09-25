import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleLogin = () => {
    // 여기서 로그인 로직을 구현합니다.
    // 로그인 요청을 보낼 엔드포인트 URL
    const loginUrl = "https://your-backend-api.com/login"; // 백엔드 API 엔드포인트
    // 이 예제에서는 간단한 더미 로그인을 시뮬레이션합니다.
    // 로그인 요청 데이터
    const data = {
      email: email,
      password: password,
    };

    // Axios를 사용하여 POST 요청을 보냅니다.
    axios
      .post(loginUrl, data)
      .then((response) => {
        // 로그인 성공 시 처리
        console.log("로그인 성공", response.data);
        // 다음 작업 수행, 예를 들어 리다이렉트 등
      })
      .catch((error) => {
        // 로그인 실패 시 처리
        console.error("로그인 실패", error);
        // 실패에 대한 사용자 피드백을 표시하거나 다른 작업 수행
      });
  };

  if (email === "user@example.com" && password === "password") {
    // 로그인이 성공하면 다음 페이지로 이동합니다.
    history.push("/dashboard"); // '/dashboard'는 로그인 후 이동할 페이지 경로입니다.
  } else {
    alert("로그인 실패. 이메일과 비밀번호를 확인하세요.");
  }
}

return (
  <div>
    <h2>로그인</h2>
    <form>
      <div>
        <label htmlFor="email">이메일:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">비밀번호:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="button" onClick={handleLogin}>
        로그인
      </button>
    </form>
  </div>
);

export default Login;

/* 폼 제출!!! 입력 넣으면서 넣으면 됨 */
import React, { useState } from 'react';

function InputExample() {
  const [username, setUsername] = useState(''); // 아이디 상태

  // 아이디 입력이 변경될 때 호출되는 이벤트 핸들러
  const handleUsernameChange = (event) => {
    setUsername(event.target.value); // 입력값을 상태에 업데이트
  };

  // 폼 제출 이벤트 핸들러
  const handleSubmit = (event) => {
    event.preventDefault(); // 기본 제출 동작 방지
    // 여기서 아이디를 사용하여 필요한 작업을 수행하십시오 (예: 서버로 보내기).
    console.log(`Submitted username: ${username}`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          아이디:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <button type="submit">제출</button>
      </form>
    </div>
  );
}

export default InputExample;
