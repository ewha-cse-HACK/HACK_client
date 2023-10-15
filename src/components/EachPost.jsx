import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
// import PropTypes from "prop-types";
// import axios from "axios";
import "../pages/style.css";
import { getRandomColor } from "./utils";

function EachPost() {
  const randomColor = getRandomColor();

  const CmPost = {
    backgroundColor: randomColor,
    width: "250px",
    height: "180px",
    borderRadius: "10px",
  };
  // <div style={componentStyle}>내 컴포넌트</div>;

  return (
    <Container>
      <ContentBox></ContentBox>
      <TextContent>
        <h5>게시글 제목</h5>
        <p>작성자 이름</p>
        <p>조회수 - 좋아요</p>
      </TextContent>
      <LikeContent />
    </Container>
  );
}

const StyledLink = styled(Link)`
  margin: 10px;
  text-decoration: none;
  color: #0f2f36;
  border: none;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    color: black;
    font-weight: 600;
  }
`;
const Container = styled.div`
  width: 250px;
  height: 247px;
`;
const ContentBox = styled.div`
  width: 250px;
  height: 180px;
  border-radius: 10px;
  background: #c9e2d6;
  background: #e1f8f8;
  background: #fce6e3;
`;
//<ContentBoxTwo bgColor={randomColor}></ContentBoxTwo>
const ContentBoxTwo = styled.div`
  background-color: ${(props) => props.bgColor};
  width: 100px;
  height: 100px;
`;
const TextContent = styled.div`
  margin: 0;
`;
const LikeContent = styled.button`
  cursor: pointer;
`;

/*
const ImageStyled = styled.img`
  width: 180px;
  height: 190px;
  overflow: hidden;
`;
*/

export default EachPost;
