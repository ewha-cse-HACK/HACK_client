import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import "./style.css";
import Fab from "@mui/material/Fab";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function MyPage() {
  const [nickname, setNickname] = useState(null);
  const [newName, setNewName] = useState(null);
  const [email, setEmail] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [objUrl, setObjUrl] = useState(null); //객체 URL 풀 버전
  const [uploadUrl, setUploadUrl] = useState(null);
  const [sendingUrl, setSendingUrl] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const imgRef = useRef(null);
  const token = localStorage.getItem("token");

  const fileInputRef = useRef(null);

  //마이페이지 정보 로드
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.rainbow-letter.com/mypage",
          {
            headers: {
              "X-ACCESS-TOKEN": `Bearer ${token}`,
            },
          }
        );

        console.log(response.data);
        setNickname(response.data.nickname);
        setEmail(response.data.email);
        setProfileImage(response.data.profileImage);
      } catch (error) {
        console.error("MyPage API 요청 실패", error);
      } finally {
      }
    };
    fetchData();
  }, [token]);

  //이미지 업로드 URL GET
  useEffect(() => {
    const fetchUploadUrl = async () => {
      try {
        const response = await axios.get(
          `https://api.rainbow-letter.com/image?dirname=profile`,
          {
            headers: {
              "X-ACCESS-TOKEN": `Bearer ${token}`,
            },
          }
        );
        setUploadUrl(response.data);
        console.log("이미지 업로드 URL 가져오기: ", response.data);
      } catch (error) {
        console.error("이미지 업로드 URL 요청 실패", error);
      }
    };
    fetchUploadUrl();
  }, [token]);

  useEffect(() => {
    if (objUrl) {
      const desiredUrl = objUrl.split("?")[0];
      console.log("추출된 URL:", desiredUrl);
      setSendingUrl(desiredUrl);
    }
  }, [objUrl]);

  /*
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // 선택한 파일
    const reader = new FileReader();
    reader.onloadend = () => {
      setPetPhoto(reader.result);
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
      .then((response) => {
        console.log("S3에 업로드 후 response: ", response);
        setObjUrl(response.config.url);
      })
      .catch((error) => console.error("S3 업로드 에러", error));
  }*/

  const handleImageChange = async () => {
    try {
      const response = await axios.put(
        "https://api.rainbow-letter.com/mypage/profile-image/modify",
        {
          profileImage: "새 이미지 URL", // 새로운 프로필 이미지 URL을 넣어주세요.
        },
        {
          headers: {
            "X-ACCESS-TOKEN": `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("이미지 변경에 성공했습니다.");
        setProfileImage(response.data.profileImage);
      }
    } catch (error) {
      console.error("이미지 변경 실패", error);
      alert("이미지 변경에 실패했습니다.");
    }
  };

  const handleImageDelete = async () => {
    try {
      const response = await axios.put(
        "https://api.rainbow-letter.com/mypage/profile-image/delete",
        {
          headers: {
            "X-ACCESS-TOKEN": `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("이미지 삭제에 성공했습니다.");
        setProfileImage("/images/pf_human.png");
      }
    } catch (error) {
      console.error("이미지 삭제 실패", error);
      alert("이미지 삭제에 실패했습니다.");
    }
  };

  const handleNicknameChange = async () => {
    try {
      const response = await axios.put(
        "https://api.rainbow-letter.com/mypage/nickname/modify",
        {
          nickname: newName,
        },
        {
          headers: {
            "X-ACCESS-TOKEN": `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("닉네임이 변경되었습니다.");
      }
    } catch (error) {
      console.error("닉네임 변경 실패", error);
      alert("닉네임 변경 실패! 다시 시도해 주세요.");
    }
  };

  const submitImage = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setSelectedFile(file);

    // 선택된 이미지 미리보기
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);

    if (e.target.files) {
      // 이미지 업로드 API 호출
      const formData = new FormData();
      formData.append("itemPicture", file);

      axios
        .put(
          `https://api.rainbow-letter.com/mypage/profile-image/modify`,
          formData,
          {
            headers: {
              "X-ACCESS-TOKEN": `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setProfileImage(res.data.data); // 업로드된 이미지 URL을 상태에 저장
          uploadImageToS3(uploadUrl, file);
        })
        .catch((err) => {
          console.log(err);
        });
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

  const handleFileInputChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log("Selected file:", selectedFile);
    // 여기에서 파일 처리 로직을 추가하세요.
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <MyWrapper>
      <BackButton>
        <Link to="../pages/Brand">
          <Fab color="gray" aria-label="back">
            <ArrowBackIcon />
          </Fab>
        </Link>
      </BackButton>
      <MyPageWrapper>
        <MyPageHeader>
          <h1>마이페이지</h1>
          <p>내 정보를 확인하고 수정할 수 있습니다.</p>
        </MyPageHeader>
        <MyPageContent>
          <RowDesign>
            <ImageStyled
              src={
                "https://hack-s3bucket.s3.ap-northeast-2.amazonaws.com/frontend/pf_human.PNG" ||
                profileImage
              }
              alt="프로필 이미지"
            />
            <UserInfo>
              <h2>{nickname}</h2>
              <p>Email: {email}</p>
            </UserInfo>
          </RowDesign>
          <ButtonContainer>
            <button onClick={handleButtonClick}>이미지 변경</button>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleFileInputChange}
            />
            <button onClick={handleImageDelete}>이미지 삭제</button>
          </ButtonContainer>
        </MyPageContent>
      </MyPageWrapper>
    </MyWrapper>
  );
}
const MyWrapper = styled.div`
  margin: 20px auto;
  margin-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 900px;
`;
const MyPageWrapper = styled.div`
  margin: 20px auto;
  margin-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 700px;
`;
const BackButton = styled.div`
  margin: 30px;
  margin-bottom: 0;
`;
const MyPageHeader = styled.div`
  margin: 20px;
  h1 {
    margin-bottom: 10px;
  }
`;
const MyPageContent = styled.div`
  margin: 20px;
`;
const RowDesign = styled.div`
  display: flex;
  flex-direction: row;
`;
const UserInfo = styled.div`
  margin: 20px 0;
  margin-top: 30px;
`;
const ImageStyled = styled.img`
  margin: 20px;
  width: 70px;
  height: auto;
`;
const ButtonContainer = styled.div`
  margin: 20px 0;
  margin-left: 10px;
  button {
    margin-right: 15px;
    width: 120px;
    height: 40px;
    border: none;
    border-radius: 25px;
    background-color: #000027;
    color: white;
  }
`;
export default MyPage;
