import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 5px;
  margin-right: 10px;
  text-align: left;
  @media (max-width: 600px) {
    &:nth-child(3) {
      width: 100%;
    }
  }
`;

export const Label = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: #282c34;
  margin-bottom: 5px;
`;

export const Value = styled.div`
  font-size: 16px;
  font-weight: 600;
  height: 30px;
  display: flex;
  align-items: center;

  & > p {
    word-break: break-word;
  }
`;
