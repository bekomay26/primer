import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Paragraph = styled.p`
  margin-right: 5px;
`;

export const DropDownContainer = styled.div`
  //width: 10.5em;
  margin: 0 auto;
  position: relative;
  //padding: 200px;
`;

export const DropDownHeader = styled.button`
  //margin-bottom: 0.8em;
  border: unset;
  background-color: unset;
  padding: 5px 10px;
  //box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  font-weight: 500;
  font-size: 1rem;
  color: #3faffa;
  cursor: pointer;
`;

export const DropDownListContainer = styled.div`
  position: absolute;
  z-index: 100;
  width: 10.5em;
  right: 0;
`;

export const DropDownList = styled.ul`
  //padding: 0;
  margin: 0;
  padding-left: unset;
  background: #ffffff;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  //border: 2px solid #e5e5e5;
  box-sizing: border-box;
  color: #3faffa;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  &:first-child {
    padding-top: 0.8em;
  }
`;

export const ListItem = styled.li`
  list-style: none;
  margin-bottom: 3px;
  padding: 5px 0;
  &:hover {
    color: #ffffff;
    background: #3faffa;
  }
`;
