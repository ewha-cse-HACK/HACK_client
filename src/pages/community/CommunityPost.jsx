import React, { useState, useEffect } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import PropTypes from "prop-types";
import "../style.css";
import TextField from "@mui/material/TextField";

function CommunityPost() {
  const [uploadUrl, setUploadUrl] = useState(null);
  const [photoList, setPhotoList] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [fileId, setFileId] = useState("");
  const [rootUrl, setRootUrl] = useState(
    "https://hack-s3bucket.s3.ap-northeast-2.amazonaws.com/community/"
  );
  const [sendingUrl, setSendingUrl] = useState(null);

  useEffect(() => {
    const fetchUploadUrl = async () => {
      try {
        // 이미지 업로드를 위한 URL을 받아옴
        const response = await axios.get(
          `http://13.209.173.241:8080/rainbow-letter/image?dirname=community`,
          {
            headers: {
              "X-ACCESS-TOKEN": `Bearer ${token}`,
            },
          }
        );
        setUploadUrl(response.data);
        console.log("이미지 업로드 URL", response.data);
        console.log("백엔드에 보낼 주소(기본):", sendingUrl);
        console.log("백엔드에 보낼 주소(root): ", rootUrl);
      } catch (error) {
        console.error("이미지 업로드 URL 요청 실패", error);
      }
    };

    fetchUploadUrl();
  }, [token]);

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // 선택한 파일
    const reader = new FileReader();
    reader.onloadend = () => {
      // 파일을 읽고 이미지 URL을 상태에 저장
      setPhotoList(reader.result);
      setFileId(reader.result.substring(0, 10));
      setSendingUrl(rootUrl + fileId);
      console.log("이미지 업로드 후 root+fileId: ", sendingUrl);
    };
    if (file) {
      reader.readAsDataURL(file); // 파일을 data URL로 읽기
      uploadImageToS3(uploadUrl, file);
    }
  };

  function uploadImageToS3(uploadUrl, file) {
    axios
      .put(uploadUrl, file, {
        headers: {
          "Content-Type": "image/png",
        },
      })
      .then((response) => console.log(response))
      .catch((error) => console.error(error));
  }

  // 이전 화면으로 이동
  const goBack = () => {
    navigate(-1);
  };

  /*
          <TextField
            required
            label="새의 이름"
            variant="outlined"
            size="small"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
*/
  return (
    <ComWrapper>
      <h1>포스트 작성</h1>
      <Container>
        <PostPic>
          <img src="https://hack-s3bucket.s3.ap-northeast-2.amazonaws.com/community/camera.png" />
          <h5>사진 업로드</h5>
          <p>(10장까지 선택 가능)</p>
          <button>사진 선택</button>
        </PostPic>
        <Editor>
          <TitleEditor>
            <TextField
              label="제목을 작성해 주세요!"
              variant="outlined"
              size="small"
            />
          </TitleEditor>
          <BodyEditor>
            <TextField label="본문" variant="outlined" size="small" />
          </BodyEditor>
        </Editor>
      </Container>
      <Container>
        <button>취소</button>
        <button>완료</button>
      </Container>
    </ComWrapper>
  );
}

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
  button {
    display: flex;
    margin: 10px;
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
const PostPic = styled.div`
  width: 383px;
  height: 394px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background: var(--e-9-f-5-ff, #e9f5ff);
  img {
    width: 25px;
  }
  button {
    width: 133px;
    height: 37px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    cursor: pointer;
    background: #8bcef4;
    &:hover {
      background: #bae2fa;
    }
  }
`;
const Editor = styled.div`
  width: 383px;
  height: 394px;
  border-radius: 5px;
  margin: auto;
  border: 1px solid purple;
`;
const TitleEditor = styled.div`
  width: 383px;
  height: 41px;
  border-radius: 3px;
  border: 0.5px solid var(--4-d-7-e-95, #4d7e95);
`;
const BodyEditor = styled.div`
  width: 383px;
  height: 345px;
  border-radius: 3px;
  border: 0.5px solid var(--4-d-7-e-95, #4d7e95);
  background: #fff;
`;
const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px;
  border: 1px solid black;
`;

export default CommunityPost;
