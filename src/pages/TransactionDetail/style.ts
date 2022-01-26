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

export const HiddenCardText = styled.span`
  font-size: 16px;
  font-weight: 600;
`;

export const InfoItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`;

export const ThreeDInfo = styled.div`
  text-align: left;
  & > p {
    margin-bottom: 5px;
    font-size: 12px;
  }
`;

export const ErrorPage = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  & > p {
    font-size: 24px;
    color: red;
  }
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border: unset;
  margin-top: 10px;
  border-radius: 5px;
  background-color: #282c34;
  color: white;
  cursor: pointer;

  &:hover {
    color: #282c34;
    border: 1px solid #282c34;
    background-color: white;
  }

  & > svg {
    margin-right: 10px;
    transform: rotate(180deg);
    stroke: white;
  }
`;
