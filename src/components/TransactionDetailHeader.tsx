import styled from "styled-components";
import { currencyToSymbol } from "../utils";
import { useEffect, useState } from "react";
import { getPaymentDetail } from "../app/paymentAPI";

const Wrapper = styled.div`
  padding: 5px 10px;
`;

const Nav = styled.p`
  padding: 5px;
`;

const SummaryDiv = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
`;

const AmountText = styled.p`
  font-size: 24px;
  font-weight: 600;
  margin-right: 15px;
`;

const RefundDetail = styled.div`
  font-size: 18px;
  color: #282c34;
  display: flex;
  align-items: center;
`;

const RefundText = styled.div`
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

const RefundIcon = styled.div`
  padding: 5px 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
`;

type AmountDetailType = {
  isRefunded: boolean;
  amount: string;
  amountRefunded: string;
  amountCaptured: string;
};

const TransactionDetailHeader = ({
  isRefunded,
  amount,
  amountRefunded,
  amountCaptured,
}: AmountDetailType) => {
  return (
    <Wrapper>
      <Nav>Transactions</Nav>
      <SummaryDiv>
        <AmountText>
          <span>{amount}</span>
        </AmountText>
        {isRefunded && (
          <RefundDetail>
            <RefundText>
              <p>Refund</p>
              <p>
                <span>{amountRefunded}</span>
              </p>
            </RefundText>
            <RefundText>
              <p>Final</p>
              <p>
                <span>{amountCaptured}</span>
              </p>
            </RefundText>
            <RefundIcon>Refunded</RefundIcon>
          </RefundDetail>
        )}
      </SummaryDiv>
    </Wrapper>
  );
};

export default TransactionDetailHeader;
