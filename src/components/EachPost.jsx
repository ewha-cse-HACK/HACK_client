import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import axios from "axios";
import "../pages/style.css";

function EachPost(props) {
  const {
    postId,
    title,
    likecount,
    viewcount,
    writer,
    createddate,
    thumbnail,
  } = props;

  return (
    <Container>
      <ContentBox>
        <img src={thumbnail} alt="Post Thumbnail" />
      </ContentBox>
      <DivBottom>
        <TextContent>
          <div>
            <RowContainer>
              <h2>{title}</h2>
            </RowContainer>
            <RowContainer>
              <p>작성자 : {writer}</p>
            </RowContainer>
            <RowContainer>
              <p>{postId}. </p>
              <p>조회수 {viewcount} </p>
              <p>좋아요 {likecount} </p>
              {/*<p>작성일 {createddate}</p>*/}
            </RowContainer>
          </div>
        </TextContent>
        <LikeContent>
          <img src="https://hack-s3bucket.s3.ap-northeast-2.amazonaws.com/community/like_gray.png" />
        </LikeContent>
      </DivBottom>
    </Container>
  );
}
/*
EachPost.propTypes = {
  postId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  likecount: PropTypes.string.isRequired,
  viewcount: PropTypes.string.isRequired,
  writer: PropTypes.string.isRequired,
  createddate: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
};*/
const Container = styled.div`
  width: 250px;
  height: 247px;
`;
const ContentBox = styled.div`
  width: 100%;
  height: 180px;
  border-radius: 10px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  /*box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.25);*/
`;
const DivBottom = styled.div`
  display: flex;
`;
const TextContent = styled.div`
  margin: 5px;
  width: 200px;
  margin-top: 10px;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  h2 {
    color: black;
  }
  p {
    font-size: 14px;
    color: #574d4d;
    margin-right: 5px;
  }
`;
const RowContainer = styled.div`
  margin-top: 2px;
  display: flex;
  flex-direction: row;
`;
const LikeContent = styled.div`
  margin-top: 15px;
  img {
    width: 28px;
  }
`;

export default EachPost;
