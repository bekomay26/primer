import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  width: auto;
  position: relative;

  @media (max-width: 600px) {
    flex-wrap: wrap;
    justify-content: space-between;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  }
`;

export const AmountText = styled.p`
  width: 10%;
  min-width: 70px;
  text-align: right;
  margin-right: 15px;
`;

export const StatusDiv = styled.div`
  width: 15%;
  min-width: 100px;
  margin-right: 10px;
  text-align: left;
`;

export const MethodDiv = styled.div`
  width: 10%;
  min-width: 60px;
  margin-right: 10px;
`;

export const OrderText = styled.p`
  width: 20%;
  min-width: 250px;
  text-align: left;
  & > span {
    display: none;
  }
  @media (max-width: 600px) {
    width: 100%;
    margin-top: 20px;
    margin-bottom: 5px;
    color: grey;
    font-size: 14px;
    font-weight: 500;
  }
`;

export const RefundText = styled.p`
  width: 15%;
  min-width: 120px;
  @media (max-width: 600px) {
    color: orangered;
    width: 100%;
    text-align: left;
    margin-bottom: 5px;
  }
`;

export const DateText = styled.p`
  width: 20%;
  min-width: 200px;
  @media (max-width: 600px) {
    width: 100%;
    text-align: left;
  }
`;

export const OpenPageButton = styled.button`
  padding: 10px 20px;
  cursor: pointer;
  border: unset;
  background-color: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover > svg {
    stroke: deepskyblue;
  }
  @media (max-width: 600px) {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    & > svg {
      display: none;
    }
  }
`;
