import React, { useState, useEffect } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import "./style.css";
import CommunityPost from "./community/CommunityPost";
import EachPost from "../components/EachPost";

function Community() {
  const [postList, setPostList] = useState([]);
  const [currentPage, setCurrentPage] = useState();
  const [totalPage, setTotalPage] = useState();
  const [page, setPage] = useState(1);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://13.209.173.241:8080/community?page=${page}",
          {
            headers: {
              "X-ACCESS-TOKEN": `Bearer ${token}`,
            },
          }
        );
        console.log("포스트 리스트 전체 띄우기 완료");
        console.log(response.data);
        setPostList(response.data.postList);
        setCurrentPage(response.data.currentpage);
        setTotalPage(response.data.totalpage);
      } catch (error) {
        console.error("커뮤니티 포스트 전체 불러오기 API 요청 실패", error);
      }
    };
    fetchData();
  }, [token]);

  return (
    <ComWrapper>
      <img
        src="https://hack-s3bucket.s3.ap-northeast-2.amazonaws.com/community/writing.PNG"
        alt="글을 적고 있는 고양이"
      />
      <h1 id="rainbowPlatform">무지개 광장</h1>
      <p>자유롭게 글을 쓰고, 사진을 올리고, 공감을 표시해주세요!</p>
      <button onClick={() => navigate("/pages/community/CommunityPost")}>
        글 쓰기
      </button>
      <EachPost />
    </ComWrapper>
  );
}

export default Community;

const ComWrapper = styled.div`
  margin: auto;
  max-width: 1000px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  text-align: center;
  align-items: center;
  img {
    width: 100px;
  }
  button {
    display: flex;
    width: 121px;
    height: 37px;
    justify-content: center;
    align-items: center;
    font-size: 17px;
    font-weight: bold;
    gap: 8px;
    border-radius: 56px;
    border: none;
    color: #fff;
    background: #8bcef4;
    cursor: pointer;
    &:hover {
      background: #bae2fa;
    }
  }
`;
