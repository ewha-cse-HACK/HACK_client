import React, { useState, useEffect } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import "../style.css";

function CommunityPost() {
  const [uploadUrl, setUploadUrl] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photoList, setPhotoList] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const urls = [
    "https://hack-s3bucket.s3.ap-northeast-2.amazonaws.com/community/cm_back_green.PNG",
    "https://hack-s3bucket.s3.ap-northeast-2.amazonaws.com/community/cm_back_red.PNG",
    "https://hack-s3bucket.s3.ap-northeast-2.amazonaws.com/community/cm_back_purple.PNG",
    "https://hack-s3bucket.s3.ap-northeast-2.amazonaws.com/community/cm_back_pink.PNG",
    "https://hack-s3bucket.s3.ap-northeast-2.amazonaws.com/community/cm_back_blue.PNG",
    "https://hack-s3bucket.s3.ap-northeast-2.amazonaws.com/community/cm_back_yellow.PNG",
  ];
  const randomIndex = Math.floor(Math.random() * urls.length);
  const basicUrl = urls[randomIndex];
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
    const file = e.target.files;

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

  const handleComplete = async () => {
    try {
      // 각 이미지의 fileId를 추출하여 imageList에 추가
      /*let imageList = [];
      if (photoList.length > 0) {
        const imageList = await Promise.all(
          photoList.map(async (photo) => {
            const response = await axios.put(uploadUrl, photo, {
              headers: {
                "Content-Type": "image/png",
              },
            });
            return response.data.fileId;
          })
        );
      }*/

      // 포스트 요청 보내기 (JSON 형식으로 변환)
      const jsonData = JSON.stringify({
        title: title,
        content: content,
        imageList: [
          {
            imageUrl: basicUrl,
          },
        ],
      });
      const response = await axios.post(
        "http://13.209.173.241:8080/community/save-post",
        jsonData,
        {
          headers: {
            "X-ACCESS-TOKEN": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        alert("포스트가 저장되었습니다.");
        navigate("/pages/Community");
      } else {
        alert("포스트 작성에 실패했습니다.");
      }
    } catch (error) {
      console.error("포스트 작성 실패", error);
      alert("포스트 작성 오류");
    }
  };

  return (
    <ComWrapper>
      <h1>포스트 작성</h1>
      <Container>
        <PostPic>
          <img src="https://hack-s3bucket.s3.ap-northeast-2.amazonaws.com/community/camera.png" />
          <h5>사진 업로드</h5>
          <p>(10장까지 선택 가능)</p>
          <button onClick={handleImageChange}>사진 선택</button>
        </PostPic>
        <Editor>
          <input
            id="cmTitle"
            placeholder="제목을 작성해 주세요!"
            autoComplete="off"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            rows="4"
            cols="50"
            id="cmBody"
            placeholder="본문 입력"
            autoComplete="off"
            value={content}
            required
            onChange={(e) => setContent(e.target.value)}
          />
        </Editor>
      </Container>
      <Container>
        <BeforeBtn onClick={goBack}>취소</BeforeBtn>
        <DoneBtn onClick={handleComplete}>완료</DoneBtn>
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
  gap: 5px;
  img {
    width: 25px;
    margin-bottom: 15px;
  }
  h5 {
    font-weight: bold;
    font-size: 18px;
  }
  p {
    color: gray;
    font-weight: bold;
    font-size: 15px;
  }
  button {
    width: 133px;
    height: 37px;
    margin: 10px;
    justify-content: center;
    align-items: center;
    font-size: 17px;
    font-weight: bold;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    color: #fff;
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
  margin-left: 10px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px;
`;
const BeforeBtn = styled.button`
  display: flex;
  margin: 10px;
  width: 120px;
  height: 45px;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  font-weight: bold;
  gap: 8px;
  border-radius: 56px;
  border: 2px solid #0f2f36;
  color: #000;
  background: #fff;
  cursor: pointer;
  &:hover {
    background: #e0e0e2;
  }
`;
const DoneBtn = styled.button`
  display: flex;
  margin: 10px;
  width: 120px;
  height: 45px;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  font-weight: bold;
  gap: 8px;
  border-radius: 56px;
  border: none;
  color: #fff;
  background: #0f2f36;
  cursor: pointer;
  &:hover {
    background: #e0e0e2;
  }
`;

export default CommunityPost;
