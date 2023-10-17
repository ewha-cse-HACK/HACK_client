import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import "../pages/style.css";

function Profile({ name, petProfile, petId }) {
  return (
    <ProfileCard>
      <ProfileBox>
        <ProfileImage>
          <img src={petProfile} alt="반려동물 프로필 사진" />
        </ProfileImage>
        <ProfileInfo>
          <h3>{name}</h3>
          <StyledLink to="/">페르소나 삭제</StyledLink>
        </ProfileInfo>
      </ProfileBox>
      <ButtonContainer>
        <Link to={`/pages/Chat/${petId}`}>
          <button id="chat" type="submit">
            <img src="/images/talkingcat.png" style={{ width: "90px" }} />
          </button>
        </Link>
        <Link to={`/pages/Diary/${petId}`}>
          <button id="diary" type="submit">
            <img src="/images/diary_paw.png" style={{ width: "70px" }} />
          </button>
        </Link>
      </ButtonContainer>
    </ProfileCard>
  );
}

Profile.propTypes = {
  name: PropTypes.string.isRequired,
  petProfile: PropTypes.string.isRequired,
  petId: PropTypes.number.isRequired,
};
const ProfileCard = styled.div`
  padding: 5px;
  width: 260px;
  height: 436px;
  display: flex;
  flex-direction: column;
`;
const ProfileBox = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 0.5px solid lightgray;
  border-radius: 20px;
  background-color: #fff;
  transition: background-color 0.3s ease;
`;
const ProfileImage = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 110px;
    height: 110px;
    border-radius: 50%;
    object-fit: cover;
  }
`;
const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  justify-content: space-between;
  h3 {
    margin: 0;
    margin-top: 30px;
    font-size: 22px;
    font-style: normal;
    color: #333;
  }
`;
const ButtonContainer = styled.div`
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  button {
    margin: 12px;
    width: 100px;
    height: 90px;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    &:hover {
      background: gray;
    }
  }
`;
const StyledLink = styled(Link)`
  margin: 20px;
  margin-bottom: 30px;
  text-decoration: none;
  color: #1f434e;
  border: none;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    color: black;
    font-weight: 600;
  }
`;

export default Profile;
