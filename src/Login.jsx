import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token; // JWT 토큰
        // 토큰을 저장하거나 다른 작업 수행
      } else {
        setError("로그인에 실패했습니다.");
      }
    } catch (error) {
      setError("서버 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      <h2>로그인</h2>
      <div>
        <label>사용자 이름:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>비밀번호:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <p className="error">{error}</p>}
      <button onClick={handleLogin}>로그인</button>
    </div>
  );
};

export default Login;
