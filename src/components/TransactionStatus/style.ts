import styled from "styled-components";

export const Wrapper = styled.p`
  padding: 5px;
  background-color: ${(props: { backgroundColor: string }) =>
    props.backgroundColor || "grey"};
  font-size: 14px;
  display: inline-block;
  border-radius: 5px;
`;
