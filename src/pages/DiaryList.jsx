import React, { useState, useEffect } from "react";
import { useParams, Link, Routes, Route, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import "./style.css";
import Fab from "@mui/material/Fab";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BounceLoader } from "react-spinners";
import TutorialDiary from "../components/TutorialDiary";

function Diary() {
  return (
    <Wrapper>
      <TutorialDiary />
      <h1>책장</h1>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 1200px;
  height: 100vh;
`;
