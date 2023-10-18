import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import "../style.css";
import Fab from "@mui/material/Fab";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function CommunityView() {
  const { id } = useParams();
  const postId = parseInt(id, 10);
  const [userId, setUserId] = useState(0);
  const [writerId, setWriterId] = useState(0);
  const [nickname, setNickname] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [content, setContent] = useState("");
  const [photoList, setPhotoList] = useState([]);
  const [createdDate, setCreatedDate] = useState("");
  const [title, setTitle] = useState("");
  const [likecount, setLikecount] = useState(0);
  const [viewcount, setViewcount] = useState(0);
  const [islike, setIslike] = useState(0);
  const [commentListLength, setCommentListLength] = useState();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://13.209.173.241:8080/community/${postId}`,
          {
            headers: {
              "X-ACCESS-TOKEN": `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setTitle(response.data.title);
        setContent(response.data.content);
        setCreatedDate(response.data.createdDate);
        setUserId(response.data.userId);
        setWriterId(response.data.writerId);
        setNickname(response.data.nickname);
        setProfileImage(response.data.profileImage);
        setLikecount(response.data.likecount);
        setViewcount(response.data.viewcount);
        setIslike(response.data.islike);
        setPhotoList(response.data.imageList);
        setCommentListLength(response.data.commentList.length);
      } catch (error) {
        console.error("포스트 상세보기 오류", error);
      }
    };

    fetchData();
  }, [token]);
  return (
    <ComWrapper>
      <BackButton>
        <Link to="/pages/Community">
          <Fab color="gray" aria-label="back">
            <ArrowBackIcon />
          </Fab>
        </Link>
      </BackButton>
      <Container>
        <ContentBox>
          <Container>
            <h1 id="cmViewHead">{title}</h1>
            <LikeContent>
              {islike ? (
                <img src="https://hack-s3bucket.s3.ap-northeast-2.amazonaws.com/community/like_blue.png" />
              ) : (
                <img src="https://hack-s3bucket.s3.ap-northeast-2.amazonaws.com/community/like_gray.png" />
              )}
            </LikeContent>
          </Container>
          <MetaContent>
            <p>
              작성자: {nickname} 작성 일자: {createdDate}
            </p>
            <p>
              No.{id} 조회수 {viewcount} - 좋아요 {likecount}
            </p>
          </MetaContent>
          <PictureBox>
            <PictureBox>
              {photoList.length > 0 && photoList[0].imageUrl && (
                <img src={photoList[0].imageUrl} alt="Post Image" />
              )}
            </PictureBox>
          </PictureBox>
          <BodyContent>
            <p>{content}</p>
          </BodyContent>
          {userId === writerId && <button>수정</button>}
        </ContentBox>
        <ContentBox>
          <h1 id="cmViewHeadComment">댓글 {commentListLength}개</h1>
        </ContentBox>
      </Container>
    </ComWrapper>
  );
}

const ComWrapper = styled.div`
  display: flex;
  margin: auto;
  width: 1000px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  text-align: center;
  align-items: center;
`;
const BackButton = styled.div`
  display: flex;
  margin: 20px;
  width: 1000px;
`;
const ContentBox = styled.div`
  margin: 10px;
  padding: 20px;
  width: 383px;
  height: 484px;
  border-radius: 5px;
  background: #fff;
  box-shadow: -1px -1px 2px 0px rgba(0, 0, 0, 0.11),
    3px 3px 5px 0px rgba(0, 0, 0, 0.2);
  button {
    display: flex;
  }
`;
const PictureBox = styled.div`
  width: 280px;
  height: 168px;
  margin: 20px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  margin: 10px;
`;
const MetaContent = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  p {
    margin-right: 10px;
    color: #2e5765;
    font-size: 14px;
  }
`;
const BodyContent = styled.div`
  margin: 10px;
  width: 300px;
  display: flex;

  border: 1px solid black;
`;
const LikeContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 28px;
    height: auto;
    cursor: pointer;
  }
`;
export default CommunityView;
