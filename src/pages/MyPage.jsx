import React, { useState, useEffect } from "react";
// import { Link, Routes, Route, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import "./style.css";

function MyPage() {
  const [nickname, setNickname] = useState();
  const [email, setEmail] = useState();
  const [profileImage, setProfileImage] = useState();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.rainbow-letter.com/mypage/",
          {
            headers: {
              "X-ACCESS-TOKEN": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("응답 데이터 잘 받았나요?"); // response data 체크!! 나중에 지우기
        console.log(response.data);
        setNickname(response.data.nickname);
        setEmail(response.data.email);
        setProfileImage(response.data.profileImage);
      } catch (error) {
        console.error("API 요청 실패", error);
      } finally {
      }
    };

    fetchData();
  }, []);

  return (
    <Wrapper>
      <h1>마이페이지</h1>
      <div id="imgContainer">
        <ImageStyled src="/images/myIcon.png" />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: auto;
  width: 800px;
  height: 800px;
  font-size: 15px;
  h1 {
    margin: auto;
    padding: 30px;
  }
`;
const ImageStyled = styled.img`
  width: 50px;
  height: auto;
`;

export default MyPage;
