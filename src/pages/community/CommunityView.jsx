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
  const [userInput, setUserInput] = useState("");
  const [commentContent, setCommentContent] = useState();
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
          `https://api.rainbow-letter.com/community/${postId}`,
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

  const handleInputChange = (e) => {
    setUserInput(e.target.value); // 입력 값 업데이트
  };

  const handleComment = async (e) => {
    e.preventDefault();

    const inputObj = {
      comment: userInput,
    };
    const jsonData = JSON.stringify(inputObj);
    console.log(jsonData);

    try {
      const response = await axios.post(
        `https://api.rainbow-letter/community/${postId}/save-comment`,
        jsonData,
        {
          headers: {
            "X-ACCESS-TOKEN": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      console.log(response.data);
      if (response.data === 201) {
        alert("코멘트가 등록되었습니다.");
        setCommentContent(userInput);
        setUserInput("");
      } else {
        console.log("어랏 왜 안 되지");
        console.log(response);
        console.log(response.data);
      }
    } catch (error) {
      console.error("API 요청 실패:", error);
      // 오류 처리 로직 추가
    }
  };

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
            <Container>
              <p>작성자: {nickname}</p>
              <p>작성 일자: {createdDate}</p>
            </Container>
            <Container>
              <p>No.{id}</p>
              <p>
                조회수 : {viewcount} 좋아요 : {likecount}
              </p>
            </Container>
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
        </ContentBox>
        <ContentBox>
          <h1 id="cmViewHeadComment">댓글 {commentListLength}개</h1>
          <InputContainer>
            <input
              id="inputField"
              value={userInput}
              onChange={handleInputChange}
              autoComplete="off"
              placeholder="코멘트를 입력하세요"
            />
            <button id="sendBtn" onClick={handleComment}>
              Send
            </button>
          </InputContainer>
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
  margin-bottom: 50px;
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
  width: 300px;
  height: 200px;
  margin: auto;
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
  justify-content: space-between;
`;
const MetaContent = styled.div`
  width: 300px;
  margin: 10px auto;
  display: flex;
  flex-direction: column;
  p {
    color: #2e5765;
    font-size: 14px;
  }
`;

const BodyContent = styled.div`
  margin: 20px auto;
  width: 300px;
  height: 100px;
  display: flex;
  overflow-y: auto;
`;
const LikeContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  img {
    width: 28px;
    height: auto;
    cursor: pointer;
  }
`;
const InputContainer = styled.div`
  margin: 5px;
  margin-left: 10px;
  margin-top: 340px;
  width: 318px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border: 1px solid gray;
  border-radius: 10px;
  input {
    margin-right: 4px;
    padding-left: 16px;
    border: none;
    border-radius: 5px;
    width: 230px;
    height: 45px;
    font-size: 17px;
    outline: none;
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px;
    width: 80px;
    height: 43px;
    border-radius: 10px;
    border: none;
    background: #8bcef4;
    font-weight: 600;
    font-size: 15px;
    text-align: center;
    color: white;
    &:hover {
      background: #bae2fa;
    }
  }
`;
export default CommunityView;
