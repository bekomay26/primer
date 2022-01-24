import styled from "styled-components";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Wrapper = styled.div`
  //height: 100vh;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(20, 20, 20, 0.2);
`;

const Spinner = styled.div`
  border: 6px solid #f3f3f3;
  border-radius: 50%;
  border-top: 6px solid #000000;
  width: 40px;
  height: 40px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;

  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const loaderRoot = document.getElementById("overlay");

const LoaderOverlay = () => {
  const elRef = useRef(null);

  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    loaderRoot.appendChild(elRef.current);
    return () => loaderRoot.removeChild(elRef.current);
  }, []);

  return createPortal(
    <Wrapper>
      <Spinner />
    </Wrapper>,
    elRef.current
  );
};

export default LoaderOverlay;
