import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import "./style.css";
import CommunityPost from "./community/CommunityPost";
import EachPost from "../components/EachPost";

function Community() {
  const [postData, setPostData] = useState([]);
  const [currentPage, setCurrentPage] = useState();
  const [totalPage, setTotalPage] = useState();
  const [page, setPage] = useState(1);
  const [formattedDate, setFormattedDate] = useState();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.rainbow-letter.com/community?page=1",
          {
            headers: {
              "X-ACCESS-TOKEN": `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        console.log("포스트 리스트 전체 띄우기 완료");
        setPostData(response.data.postList);
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
      <HeaderTitle>
        <img src="https://hack-s3bucket.s3.ap-northeast-2.amazonaws.com/community/table.png" />
        <h1 id="rainbowPlatform">무지개 광장</h1>
      </HeaderTitle>
      <ButtonArea>
        <WriteBtn onClick={() => navigate("/pages/community/CommunityPost")}>
          글 쓰기
        </WriteBtn>
      </ButtonArea>
      <PostContainer>
        {postData.map((posts) => (
          <Link
            to={`/pages/community/CommunityView/${posts.id}`}
            key={posts.id}
          >
            <EachPost
              key={posts.id}
              postId={posts.id}
              title={posts.title}
              likecount={posts.likecount}
              viewcount={posts.viewcount}
              writer={posts.nickname}
              createddate={posts.createddate}
              thumbnail={posts.thumbnail}
            />
          </Link>
        ))}
      </PostContainer>
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
`;
const HeaderTitle = styled.div`
  margin: 30px;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 90px;
  }
`;
const PostContainer = styled.div`
  display: grid;
  gap: 40px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;
const ButtonArea = styled.div`
  display: flex;
  width: 1200px;
  height: 60px;
  justify-content: flex-end;
`;
const WriteBtn = styled.button`
  display: flex;
  width: 121px;
  height: 37px;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  font-weight: bold;
  border-radius: 56px;
  border: none;
  color: #fff;
  background: #000027;
  cursor: pointer;
  &:hover {
    background: #7cbadc;
  }
`;
