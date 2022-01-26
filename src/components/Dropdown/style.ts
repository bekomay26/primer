import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Paragraph = styled.p`
  margin-right: 5px;
  @media (max-width: 600px) {
    margin-right: 10px;
    flex: 1;
    text-align: left;
  }
`;

export const DropDownContainer = styled.div`
  margin: 0 auto;
  position: relative;

  @media (max-width: 600px) {
    text-align: right;
    width: 125px;
  }
`;

export const DropDownHeader = styled.button`
  border: unset;
  background-color: unset;
  padding: 5px 10px;
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
  margin: 0;
  padding-left: unset;
  background: #ffffff;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  box-sizing: border-box;
  color: #3faffa;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  &:first-child {
    padding-top: 0.8em;
  }
  @media (max-width: 600px) {
    box-shadow: 0 1px 7px rgba(0, 0, 0, 0.15);
  }
`;

export const ListItem = styled.li`
  list-style: none;
  margin-bottom: 3px;
  padding: 5px 0;
  text-align: center;
  &:hover {
    color: #ffffff;
    background: #3faffa;
  }
`;
