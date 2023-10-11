import React, { useState } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import "../style.css";
import PetName from "../../components/Persona/PetName";
import PetChar from "../../components/Persona/PetChar";
import PetLike from "../../components/Persona/PetLike";
import PetDate from "../../components/Persona/PetDate";
import PetLook from "../../components/Persona/PetLook";
import PetPic from "../../components/Persona/PetPic";
import Finished from "../../components/Persona/Finished";

function PersonaHam() {
  return (
    <Wrapper>
      <ImgContainer>
        <img src="/images/cat1.png" />
      </ImgContainer>
      <PetName />
      <ImgContainer>
        <img src="/images/cat2.png" />
      </ImgContainer>
      <PetChar />
      <ImgContainer>
        <img src="/images/cat3.png" />
      </ImgContainer>
      <PetLike />
      <ImgContainer>
        <img src="/images/cat1.png" />
      </ImgContainer>
      <PetDate />
      <ImgContainer>
        <img src="/images/cat2.png" />
      </ImgContainer>
      <PetLook />
      <ImgContainer>
        <img src="/images/cat3.png" />
      </ImgContainer>
      <PetPic />
      <Finished />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: auto;
  width: 1000px;
  height: 800px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const ImgContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0;
  width: 400px;
  img {
    width: 300px;
  }
`;

export default PersonaHam;
