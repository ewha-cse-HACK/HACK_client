import React, { useState } from "react";
import styled from "styled-components";
import { DotLoader } from "react-spinners";

const Loading = ({ loading }) => {
  return (
    <LoadingOverlay loading={loading.toString()}>
      <DotLoader color="#343B6E" size={15} />
      <h1>Now Loading . . .</h1>
    </LoadingOverlay>
  );
};

const LoadingOverlay = styled.div`
  display: ${(props) => (props.loading ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  z-index: 1000;
`;

export default Loading;
