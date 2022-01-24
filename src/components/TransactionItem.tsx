import styled from "styled-components";
import TransactionStatus from "../pages/TransactionStatus";
import TransactionProcessorAndMethod from "../pages/TransactionProcessorAndMethod";
import { RoutingContext } from "./Router";
import { useContext } from "react";

const Wrapper = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  //display: table-row;
  width: auto;
`;

const AmountText = styled.p`
  width: 10%;
  min-width: 70px;
  text-align: right;
  margin-right: 15px;
`;

const StatusDiv = styled.div`
  width: 15%;
  min-width: 100px;
  margin-right: 10px;
  text-align: left;
`;

const MethodDiv = styled.div`
  width: 10%;
  min-width: 60px;
  margin-right: 10px;
`;

const OrderText = styled.p`
  width: 20%;
  min-width: 250px;
  text-align: left;
`;

const RefundText = styled.p`
  width: 15%;
  min-width: 120px;
`;

const DateText = styled.p`
  width: 20%;
  min-width: 200px;
`;

const TransactionItem = ({
  id,
  currency,
  amount,
  status,
  processor,
  method,
  orderId,
  refunded,
  date,
}) => {
  const { setPage, setUrlId } = useContext(RoutingContext);

  const onClick = () => {
    setPage("detail");
    setUrlId(id);
  };
  return (
    <Wrapper>
      <AmountText>
        {amount}
        <span>{currency}</span>
      </AmountText>
      <StatusDiv>
        <TransactionStatus name={status} />
      </StatusDiv>
      <MethodDiv>
        <TransactionProcessorAndMethod
          methodName={method}
          processorName={processor}
        />
      </MethodDiv>
      <OrderText>{orderId}</OrderText>
      <RefundText>{refunded && "Refunded"}</RefundText>
      <DateText>{date}</DateText>
      <p onClick={onClick}>Click</p>
    </Wrapper>
  );
};

export default TransactionItem;
