import React, { useState } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import "../style.css";
import { Button, Container, TextField, Select, MenuItem } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
// import NameAndTitleForm from "./NameAndTitleForm";
// import PersonalityForm from "./PersonalityForm";
// import PhotoUploadForm from "./PhotoUploadForm";

function PersonaBird() {
  const speciesName = "새";
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [personality1, setPersonality1] = useState("");
  const [personality2, setPersonality2] = useState("");
  const [personality3, setPersonality3] = useState("");
  const [photo, setPhoto] = useState(null);

  const handleNext = () => {
    // TODO: Implement logic to navigate to the next section
    console.log("Next button clicked");
  };

  const handlePrevious = () => {
    // TODO: Implement logic to navigate to the previous section
    console.log("Previous button clicked");
  };

  /* 컴포넌트 다 따로 선언 ver
  function MultiStepForm() {
    const [step, setStep] = useState(1);
  
    const handleNext = () => {
      setStep(step + 1);
    };
  
    const handlePrevious = () => {
      setStep(step - 1);
    };*/

  return (
    <Wrapper>
      {/*
            <div>
        {step === 1 && <NameAndTitleForm />}
        {step === 2 && <PersonalityForm />}
        {step === 3 && <PhotoUploadForm />}

        {step > 1 && <button onClick={handlePrevious}>이전</button>}
        {step < 3 && <button onClick={handleNext}>다음</button>}
      </div>      
      */}
      <Container maxWidth="sm">
        {/* Section 1: Name and Title */}
        <div>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Section 2: Personality */}
        <div>
          <Select
            label="Personality 1"
            variant="outlined"
            fullWidth
            value={personality1}
            onChange={(e) => setPersonality1(e.target.value)}
          >
            <MenuItem value="playful">Playful</MenuItem>
            <MenuItem value="curious">Curious</MenuItem>
            {/* Add more personality options */}
          </Select>
          <Select
            label="Personality 2"
            variant="outlined"
            fullWidth
            value={personality2}
            onChange={(e) => setPersonality2(e.target.value)}
          >
            {/* Personality options */}
          </Select>
          <Select
            label="Personality 3"
            variant="outlined"
            fullWidth
            value={personality3}
            onChange={(e) => setPersonality3(e.target.value)}
          >
            {/* Personality options */}
          </Select>
        </div>

        {/* Section 3: Photo Upload */}
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
          />
        </div>

        {/* Navigation Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={handlePrevious}
          >
            Previous
          </Button>
          <Button
            variant="outlined"
            endIcon={<ArrowForward />}
            onClick={handleNext}
          >
            Next
          </Button>
        </div>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: auto;
  width: 1000px;
  height: 800px;
  font-weight: medium;
  font-size: 15px;
`;

export default PersonaBird;
