import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Container = styled.div`
  padding: 10px;
  display: inline-flex;
  align-items: center;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  background-color: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  & > div {
    margin-left: 10px;
    border-right: 1px solid #282c34;
  }
  & > div:last-child {
    border-right: unset;
  }
  & > input {
    border-right: 1px solid #282c34;
  }
  justify-content: flex-end;
  @media (max-width: 600px) {
    width: 100%;
    border-radius: unset;
    flex-wrap: wrap;
    & > input {
      border: 1px solid #282c34;
    }
    & > div {
      margin-left: unset;
      margin-bottom: 5px;
      border-right: unset;
      width: 100%;
    }
  }
`;

export const SearchInput = styled.input`
  padding: 5px 10px;
  font-size: 14px;
  border: unset;
  @media (max-width: 600px) {
    width: 100%;
    font-size: 16px;
    margin-bottom: 5px;
  }
`;
