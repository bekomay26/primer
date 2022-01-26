import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 20px 30px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);

  @media (max-width: 600px) {
    flex-direction: column;
    padding: 10px 20px;
    align-items: flex-start;
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 600px) {
    flex-wrap: wrap;
  }
`;

export const IconText = styled.div`
  display: flex;
  align-items: center;

  & > div:first-child {
    margin-right: 5px;
  }
`;

export const Status = styled.div`
  height: 50px;
  width: 100px;

  & > p:first-child {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 600px) {
    height: unset;
    width: unset;
  }
`;
