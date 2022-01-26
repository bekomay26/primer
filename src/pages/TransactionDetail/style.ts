import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: #dde2dc;
  padding: 5px;
  height: 100vh;
  overflow-y: scroll;
`;

export const Body = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;
  & > div {
    width: 45%;
  }
`;

export const InfoItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`;
