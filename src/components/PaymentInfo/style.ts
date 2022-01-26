import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 20px 30px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
`;

export const IconText = styled.div`
  display: flex;
  align-items: center;

  & > div:first-child {
    margin-right: 5px;
  }
`;

export const Status = styled.div`
  padding: 15px 20px;
  border: 1px solid black;
`;
