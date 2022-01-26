import styled, { css } from "styled-components";

export const Wrapper = styled.p`
  padding: 5px;
  font-size: 14px;
  display: inline-block;
  border-radius: 5px;
  ${(props: { mode: string }) => {
    switch (props.mode) {
      case "FAILED":
      case "CANCELLED":
      case "DECLINED":
        return css`
          background-color: rgb(255, 242, 240);
          color: rgb(255, 77, 79);
        `;
      case "AUTHORIZED":
        return css`
          background-color: rgb(230, 247, 255);
          color: rgb(24, 144, 255);
        `;
      case "SETTLING":
        return css`
          background-color: rgb(255, 251, 230);
          color: rgb(250, 173, 20);
        `;
      case "SETTLED":
        return css`
          background-color: rgb(246, 255, 237);
          color: rgb(82, 196, 26);
        `;
      case "NEUTRAL":
        return css`
          background-color: rgb(250, 250, 250);
          color: rgba(0, 0, 0, 0.85);
          border: 1px solid #282c34;
        `;
      default:
        return css`
          background-color: rgb(250, 250, 250);
          color: rgba(0, 0, 0, 0.85);
        `;
    }
  }}
`;
