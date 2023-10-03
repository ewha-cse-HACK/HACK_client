import React, { useState } from "react";
// import { Link, Routes, Route, useNavigate } from "react-router-dom";
// import styled from "styled-components";
import axios from "axios";
import "./style.css";

function Chat() {
  return (
    <ChatWrapper>
      <ChatBox>
        <div id="receiver">
          <img src="images/coco.jpeg" alt="반려동물 프로필 사진" />
          <div id="msg-box">
            <p>안녕! 잘 지내? 누나 보고 싶어!</p>
          </div>
        </div>
        <div id="sender"></div>
      </ChatBox>
      <SendBox>
        <input type="text" id="sendMsg" />
        <button id="sendBtn" type="submit">
          Send
        </button>
      </SendBox>
    </ChatWrapper>
  );
}

export default Chat;

const ChatWrapper = styled.div`
  margin: auto;
  width: 1185px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
const ChatBox = styled.div`
  width: 900px;
`;
const SendBox = styled.div`
  width: 900px;
`;
