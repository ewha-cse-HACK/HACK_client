import React, { useState, useEffect } from "react";
import { useParams, Link, Routes, Route, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import "./style.css";
import { BeatLoader } from "react-spinners";

function Chat() {
  return (
    <Wrapper>
      <Space>
        {/* 여기에 넣을 채팅창 목록 등의 공간을 미리 잡아놓았으니 업데이트할 것 */}
        <img src="/images/chatCat.jpg" />
      </Space>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;
  width: 1080px;
  height: 1000px;
`;
const Space = styled.div`
  display: flex;
  width: 400px;
  height: 600px;
  justify-content: center;
  align-items: center;
  img {
    height: 200px;
  }
`;
const ChatWrapper = styled.div`
  margin: auto;
  background-color: #e9f5ff;
`;
const ChatContainer = styled.div`
  width: 400px;
  height: 400px;
`;
const InputContainer = styled.div`
  width: 400px;
  height: 60px;
`;

export default Chat;
