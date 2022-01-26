import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: #dde2dc;
  padding: 20px;
  height: 100vh;
  overflow-y: scroll;
`;

export const Body = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;
  padding-bottom: 30px;
  & > div {
    width: 45%;
  }

  @media (max-width: 600px) {
    & > div {
      width: 100%;
      margin-bottom: 10px;
    }
  }
`;

export const InfoItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`;
