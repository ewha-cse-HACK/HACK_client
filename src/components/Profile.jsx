import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import axios from "axios";
import "../pages/style.css";

function Profile({ name, petProfile, petId }) {
  const token = localStorage.getItem("token");
  /* 이미지 불러오기 */

  return (
    <div id="profileCard">
      <div id="profileImage">
        <img src="/images/momo.jpeg" />
      </div>
      <div id="profileInfo">
        <h3>{name}</h3>
        <p>{petProfile}</p>
        <StyledLink to="/pages/PersonaEdit">페르소나 편집</StyledLink>
        <div id="buttonContainer">
          <Link to={`/pages/Chat/${petId}`}>
            <button id="chat" type="submit">
              chat
            </button>
          </Link>
          <Link to="/pages/Diary">
            <button id="diary" type="submit">
              diary
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

Profile.propTypes = {
  name: PropTypes.string.isRequired,
  petProfile: PropTypes.string.isRequired,
  petId: PropTypes.number.isRequired, // petId가 숫자형이라고 가정합니다.
};

export default Profile;

const StyledLink = styled(Link)`
  margin-left: 30px;
  margin-top: 0;
  text-decoration: none;
  color: #343b6e;
  border: none;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    color: black;
    font-weight: 600;
  }
`;

/*
const ImageStyled = styled.img`
  width: 180px;
  height: 190px;
  overflow: hidden;
`;
*/
