import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import axios from "axios";
import "../pages/style.css";
import { getRandomColor } from "./utils";

function EachPost(props) {
  const { postId, title, likecount, viewcount, writer, createddate, thumnail } =
    props;
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
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
        <div>
          <h2>{title}</h2>
          <p>Post ID: {postId}</p>
          <p>Like Count: {likecount}</p>
          <p>View Count: {viewcount}</p>
          <p>Writer: {writer}</p>
          <p>Created Date: {createddate}</p>
          <img src={thumnail} alt="Post Thumbnail" />
        </div>
      </TextContent>
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
  border: 1px solid gray;
  width: 250px;
  height: 247px;
`;
const ContentBox = styled.div`
  border: 0.5px solid red;
  width: 100%;
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
  border: 0.1px solid blue;
  margin: 0;
  font-size: 10px;
`;
const LikeContent = styled.button`
  background: url("/images/like_gray.png");
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
