import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 5px 10px;
`;

export const Nav = styled.div`
  padding: 5px;
  color: blue;
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 120px;
  justify-content: center;
  margin-bottom: 10px;
  border-bottom: 1px solid transparent;
  &:hover {
    border-bottom: 1px solid blue;
  }
  & > svg {
    transform: rotate(180deg);
    margin-right: 10px;
    stroke: blue;
  }
`;

export const SummaryDiv = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
`;

export const AmountText = styled.p`
  font-size: 24px;
  font-weight: 600;
  margin-right: 15px;
`;

export const RefundDetail = styled.div`
  font-size: 18px;
  color: #282c34;
  display: flex;
  align-items: center;
`;

export const RefundText = styled.div`
  margin-right: 15px;
  color: #282c34;
  & > p:first-child {
    font-size: 12px;
  }
  & > p:last-child {
    font-size: 16px;
    font-weight: 500;
  }
`;

export const RefundIcon = styled.div`
  padding: 5px 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
`;
